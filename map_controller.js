function create_map(rooms_init) {
    const gridSize = rooms_init * 2;

    // Comenzamos en el centro
    const startX = Math.floor(rooms_init);
    const startY = Math.floor(rooms_init);

    // offsets ortogonales: eje x = arriba/abajo, eje y = izquierda/derecha
    // (misma convención que generate_room.js: door_up = map[x-1][y], door_right = map[x][y+1])
    const directions = [
        { dx: -1, dy: 0 },
        { dx: 1, dy: 0 },
        { dx: 0, dy: -1 },
        { dx: 0, dy: 1 },
    ];

    const targetRooms = Math.max(6, rooms_init * 2);
    const minAcceptableRooms = Math.ceil(targetRooms * 0.7);
    const minBossDistance = Math.max(3, Math.floor(targetRooms / 3));
    const maxGrowthAttempts = targetRooms * 40;
    const maxFullRetries = 30;
    const desiredShops = Math.max(1, Math.round(targetRooms / 5));

    function inBounds(x, y) {
        return x >= 0 && x < gridSize && y >= 0 && y < gridSize;
    }

    // random(n) de random_functions.js está 1-indexado (rango [1,n]) para
    // n>1, pero tiene un caso especial para n==1 que devuelve [0,1]. Este
    // helper evita ese caso especial para elegir índices de array de forma
    // segura sea cual sea el tamaño de la lista.
    function pickIndex(length) {
        if (length <= 1) return 0;
        return random(length) - 1;
    }

    function occupiedNeighbors(grid, x, y) {
        let count = 0;
        for (const { dx, dy } of directions) {
            if (inBounds(x + dx, y + dy) && grid[x + dx][y + dy] !== 0) count++;
        }
        return count;
    }

    function bfsDistances(grid, fromX, fromY) {
        const dist = new Map();
        dist.set(`${fromX},${fromY}`, 0);
        const queue = [[fromX, fromY]];
        while (queue.length > 0) {
            const [x, y] = queue.shift();
            const d = dist.get(`${x},${y}`);
            for (const { dx, dy } of directions) {
                const nx = x + dx;
                const ny = y + dy;
                const key = `${nx},${ny}`;
                if (inBounds(nx, ny) && grid[nx][ny] !== 0 && !dist.has(key)) {
                    dist.set(key, d + 1);
                    queue.push([nx, ny]);
                }
            }
        }
        return dist;
    }

    // Crece un "esqueleto" de rooms desde el inicio: en cada paso se elige una
    // room YA colocada al azar (no solo la última), así el árbol se ramifica en
    // vez de ser un único pasillo. Se limita a 1 vecino ocupado por celda nueva
    // para que quede un árbol sin bucles ni bloques 2x2.
    function growSkeleton() {
        const grid = createArray2D(gridSize, gridSize);
        grid[startX][startY] = 2;
        const roomList = [{ x: startX, y: startY }];

        let attempts = 0;
        while (roomList.length < targetRooms && attempts < maxGrowthAttempts) {
            attempts++;
            const base = roomList[pickIndex(roomList.length)];
            const dir = directions[random(4) - 1];
            const nx = base.x + dir.dx;
            const ny = base.y + dir.dy;

            if (!inBounds(nx, ny) || grid[nx][ny] !== 0) continue;
            if (occupiedNeighbors(grid, nx, ny) > 1) continue;

            // cuanto más lejos del centro, menos probable seguir creciendo ahí
            // (evita que el dungeon se estire en línea recta hasta el borde)
            const distFromCenter = Math.abs(nx - startX) + Math.abs(ny - startY);
            const acceptChance = Math.max(15, 100 - Math.floor((distFromCenter / gridSize) * 100));
            if (!chance(acceptChance)) continue;

            grid[nx][ny] = 1;
            roomList.push({ x: nx, y: ny });
        }

        return { grid, roomList };
    }

    // El boss va en la room alcanzable más lejana por BFS real (en vez del
    // fallback anterior, que cogía la primera room en orden de lectura).
    function pickBossRoom(grid, roomList) {
        const dist = bfsDistances(grid, startX, startY);
        let maxDist = -1;
        for (const room of roomList) {
            if (room.x === startX && room.y === startY) continue;
            const d = dist.get(`${room.x},${room.y}`);
            if (d > maxDist) maxDist = d;
        }
        if (maxDist < 0) return null;
        const candidates = roomList.filter(
            (room) => !(room.x === startX && room.y === startY) && dist.get(`${room.x},${room.y}`) === maxDist
        );
        return { room: candidates[pickIndex(candidates.length)], distance: maxDist };
    }

    let grid, roomList, bossPick;
    let fullRetries = 0;
    do {
        ({ grid, roomList } = growSkeleton());
        bossPick = pickBossRoom(grid, roomList);
        fullRetries++;
    } while (
        fullRetries < maxFullRetries &&
        (roomList.length < minAcceptableRooms || !bossPick || bossPick.distance < minBossDistance)
    );

    let array = grid;

    // válvula de seguridad: en el caso degenerado de que ni una sola room haya
    // podido crecer (grid demasiado pequeña / muy mala suerte), forzamos una
    // vecina del inicio para garantizar que exista boss.
    if (!bossPick) {
        for (const dir of directions) {
            const nx = startX + dir.dx;
            const ny = startY + dir.dy;
            if (inBounds(nx, ny)) {
                array[nx][ny] = 1;
                roomList.push({ x: nx, y: ny });
                bossPick = { room: { x: nx, y: ny }, distance: 1 };
                break;
            }
        }
    }

    if (bossPick) {
        array[bossPick.room.x][bossPick.room.y] = 3;
    }

    // Rooms shop/especiales como callejones sin salida reales: se añade una
    // room NUEVA colgando de una hoja (grado 1), en vez de convertir una celda
    // ya conectada al camino (que podría acabar con 2-3 puertas y ser un cruce
    // más en vez de una sala secundaria aislada).
    const leaves = roomList.filter((room) => {
        if (room.x === startX && room.y === startY) return false;
        if (bossPick && room.x === bossPick.room.x && room.y === bossPick.room.y) return false;
        return occupiedNeighbors(array, room.x, room.y) === 1;
    });
    const shuffledLeaves = leaves.slice().sort(() => Math.random() - 0.5);

    let shopsPlaced = 0;
    for (const leaf of shuffledLeaves) {
        if (shopsPlaced >= desiredShops) break;
        const freeCells = directions
            .map((dir) => ({ x: leaf.x + dir.dx, y: leaf.y + dir.dy }))
            .filter(
                (cell) =>
                    inBounds(cell.x, cell.y) &&
                    array[cell.x][cell.y] === 0 &&
                    occupiedNeighbors(array, cell.x, cell.y) === 1
            );
        if (freeCells.length === 0) continue;
        const chosen = freeCells[pickIndex(freeCells.length)];
        array[chosen.x][chosen.y] = 5;
        shopsPlaced++;
    }

    function findPath(startX, startY, bossX, bossY) {
        const queue = [[startX, startY, []]];
        const visited = new Set();
        visited.add(`${startX},${startY}`);

        const directions = [
            [0, -1], // Arriba
            [1, 0],  // Derecha
            [0, 1],  // Abajo
            [-1, 0]  // Izquierda
        ];

        while (queue.length > 0) {
            const [x, y, path] = queue.shift();

            if (x === bossX && y === bossY) {
                return path.concat([[x, y]]);
            }

            for (const [dx, dy] of directions) {
                const nx = x + dx;
                const ny = y + dy;
                if (
                    nx >= 0 && nx < rooms_init * 2 &&
                    ny >= 0 && ny < rooms_init * 2 &&
                    array[nx][ny] !== 0 && // No paredes
                    !visited.has(`${nx},${ny}`)
                ) {
                    visited.add(`${nx},${ny}`);
                    queue.push([nx, ny, path.concat([[x, y]])]);
                }
            }
        }
        return [];
    }

    // Encontrar coordenadas de inicio y jefe
    let start_x = -1, start_y = -1, boss_x = -1, boss_y = -1;

    for (let x = 0; x < rooms_init * 2; x++) {
        for (let y = 0; y < rooms_init * 2; y++) {
            if (array[x][y] === 2) {
                start_x = x;
                start_y = y;
            }
            if (array[x][y] === 3) {
                boss_x = x;
                boss_y = y;
            }
        }
    }

    const requiredPath = findPath(start_x, start_y, boss_x, boss_y);

    return { map: array, path: requiredPath };
}



function find_initial(map){
        for(let i = 0; i < map.length; i++) {
            for(let j = 0; j < map[i].length; j++) {
                if(map[i][j] === 2) {
                    return {x:i,y:j}
                }
            }
        }
      
    
}

function drawMinimap(context, posX, posY) {
    if (!context || !level || !level.rooms || !level.rooms[room_actual]) return;
   
    const mapSize = 100;
    const roomSize = 20;
    const centerX = posX + mapSize / 2;
    const centerY = posY + mapSize / 2;
   
    context.clearRect(posX, posY, mapSize, mapSize);
    context.fillStyle = "#000";
    context.fillRect(posX, posY, mapSize, mapSize);
   
    let visited = new Map();
    let drawnRooms = new Set();
    let roomPositions = new Map();
   
    const queue = [{ room: level.rooms[room_actual], x: 0, y: 0 }];
   
    const isPositionAvailable = (x, y, width) => {
        for (let dx = 0; dx < width; dx++) {
            if (visited.has(`${x + dx},${y}`)) return false;
        }
        return true;
    };
   
    const findRoomById = (id) => level.rooms.find(r => r.id === id);
   
    const correctRoomId = (baseRoom, doorKey) => {
        if (!baseRoom.double) return baseRoom[doorKey]?.id;
        
        const doorId = baseRoom[doorKey]?.id;
        if (!doorId) return false;

        // Específicamente para manejar conexiones entre puertas up2/down
        if (doorKey === 'door_down') {
            const targetRoom = findRoomById(doorId);
            if (targetRoom && targetRoom.door_up2) {
                return targetRoom.door_up2.id;
            }
        }
        
        return doorId;
    };
   
    const drawRoom = (room, x, y) => {
        if (drawnRooms.has(room.id)) return;
       
        const width = room.double ? roomSize * 2 : roomSize;
        const drawX = centerX + x * roomSize - (mapSize / 4);
        const drawY = centerY + y * roomSize - (mapSize / 4);
       
        context.fillStyle = room.id === level.rooms[room_actual].id ? "red" : "white";
        context.fillRect(drawX, drawY, width, roomSize);
        context.strokeStyle = "black";
        context.strokeRect(drawX, drawY, width, roomSize);
       
        drawnRooms.add(room.id);
        roomPositions.set(room.id, { x, y });
        
        for (let dx = 0; dx < (room.double ? 2 : 1); dx++) {
            visited.set(`${x + dx},${y}`, room.id);
        }
    };
   
    while (queue.length > 0) {
        const { room, x, y } = queue.shift();
        drawRoom(room, x, y);
       
        const doors = {
            door_up: { dx: 0, dy: -1 },
            door_down: { dx: 0, dy: 1 },
            door_left: { dx: -1, dy: 0 },
            door_right: { dx: room.double ? 2 : 1, dy: 0 },
            ...(room.double && {
                door_up2: { dx: 1, dy: -1 },
                door_down2: { dx: 1, dy: 1 }
            })
        };
       
        for (const [doorKey, { dx, dy }] of Object.entries(doors)) {
            const correctedId = correctRoomId(room, doorKey);
            if (!correctedId || visited.has(correctedId)) continue;
           
            const nextRoom = findRoomById(correctedId);
            if (!nextRoom) continue;
           
            const newX = x + dx;
            const newY = y + dy;
            
            const width = nextRoom.double ? 2 : 1;
            if (isPositionAvailable(newX, newY, width)) {
                queue.push({ room: nextRoom, x: newX, y: newY });
            }
        }
    }
}







function createArray2D(rows, cols) {
    let array = new Array(rows);
    for (let i = 0; i < rows; i++) {
        array[i] = new Array(cols).fill(0);
    }
    return array;
}

function change_object_ambientation(map,ambient){
//esta función cambia las piedras del nivel por
//objetos propios de la ambientación, buscará en el mapa 1 y lo cambiara
//por cualquier valor aleatorio que esté en la array

var array_obj = [8,9,10,17,18,19];
var statues = [];
switch (ambient) {
    case 1:
        //1 mazmorra
        array_obj = [8,9,10,17,18,19];
        statues = []
        break;
    case 2:
        //2 selva
        array_obj = [15,16];
        statues = [11,12,13]
        break;
    case 3:
        //3 castillo
         array_obj = [8,9,10,17,18,19];
        statues = []
        break;
    case 4:
        //4 alien
         array_obj = [8,9,10,17,18,19];
        statues = []
        break;
    case 5:
        //5 desierto
         array_obj = [8,9,10,17,18,19];
        statues = []
        break;
    case 6:
        //6 hielo
         array_obj = [8,9,10,17,18,19];
        statues = []
        break;
    case 7:
        //7 ruinas
        array_obj = [8,9,10,17,18,19];
        statues = []
        break;
    case 9:
        //9 mas_del_angel
        array_obj = [8,9,10,17,18,19];
        statues = []
}

changed_map = map;
    for (let i = 0; i < changed_map.length; i++) {
        if (changed_map[i] == 2){
            changed_map[i] = array_obj[parseInt(Math.random()*array_obj.length)];
        }
        if (changed_map[i] == 3){
            if (statues.length > 0){
                changed_map[i] = statues[parseInt(Math.random()*statues.length)];
            }else{
                changed_map[i] = 0;  
            }
        }
       
        
    }



return changed_map;


}