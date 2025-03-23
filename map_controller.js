function create_map(rooms_init) {
    // Crear un array bidimensional más grande
    const array = createArray2D(rooms_init * 2, rooms_init * 2);

    // Comenzamos en el centro
    let cursor_x = Math.floor(rooms_init);
    let cursor_y = Math.floor(rooms_init);
    array[cursor_x][cursor_y] = 2;

    // Generar el mapa
    let last_direction = -1;
    let direction_repeats = 0;

    for (let i = 0; i < array.length; i++) {
        let direction;

        if (direction_repeats < 5 && last_direction !== -1) {
            direction = last_direction;
            direction_repeats++;
        } else {
            direction = random(4);
            direction_repeats = 1;
            last_direction = direction;
        }

        switch (direction) {
            case 0: if (cursor_y - 1 >= 0) cursor_y--; break; // Arriba
            case 1: if (cursor_x + 1 < rooms_init * 2) cursor_x++; break; // Derecha
            case 2: if (cursor_y + 1 < rooms_init * 2) cursor_y++; break; // Abajo
            case 3: if (cursor_x - 1 >= 0) cursor_x--; break; // Izquierda
        }

        if (i === array.length - 1) {
            if (array[cursor_x][cursor_y] != 2){
                array[cursor_x][cursor_y] = 3;
            }else{
                let acomplished = false;
                for (let i = 0; i < array.length; i++) {
                    for (let e = 0; e < array[i].length; e++) {
                        if (!acomplished){
                            const element = array[e][i];
                            if (element == 1){
                                array[e][i] = 3
                                acomplished = true;
                            }

                        }
                    }
                }
            }
             
        } else {
            if (array[cursor_x][cursor_y] !=2){
                array[cursor_x][cursor_y] = 1; // Habitación normal
            }
            
        }
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