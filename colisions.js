function colision_detect(element1, element2) {
    const col =
        element1.x < element2.x + element2.size_w &&
        element1.x + element1.size_w > element2.x &&
        element1.y < element2.y + element2.size_h &&
        element1.y + element1.size_h > element2.y;

    // Si el modo debug está activado, dibujamos las máscaras de colisión
    if (debug) {
        // Guardamos el estado actual del contexto
        ctx.save();
        
        // Configuración para la primera máscara (element1)
        ctx.strokeStyle = col ? 'pink' : 'cyan';  // Rojo si hay colisión, verde si no
        ctx.lineWidth = 2;
        ctx.strokeRect(
            element1.x - camera.x,  // Ajustamos por la posición de la cámara
            element1.y,
            element1.size_w,
            element1.size_h
        );

        // Configuración para la segunda máscara (element2)
        ctx.strokeStyle = col ? 'red' : 'blue';   // Rojo si hay colisión, azul si no
        ctx.strokeRect(
            element2.x - camera.x,  // Ajustamos por la posición de la cámara
            element2.y,
            element2.size_w,
            element2.size_h
        );

        // Restauramos el estado del contexto
        ctx.restore();
    }

    return col;
}

function colision_wall(obj) {
    const room = level.rooms[room_actual];
    
    const up = { y: 20 };
    const down = { y: room.canvas.height - 30 - obj.size_h };
    const left = { x: 0 };
    const right = { x: room.canvas.width - 30 - obj.size_w };

    if (obj.y < up.y){
        return true
    }
    if (obj.y > down.y){
        return true
    }
    if (obj.x < left.x){
        return true
    }
    if (obj.x > right.x){
        return true
    }

    return false;
}

function check_all_colisions(obj, vx = 0, vy = 0,enemy = true) {
    // Prevent direct mutation of original object
    const testObj = { ...obj };

    // Correct y-coordinate movement (was incorrectly using vx twice)
    if (vx !== 0 || vy !== 0) {
        testObj.x += vx;
        testObj.y += vy;
    }
    // Perform collision checks
    const wallCollision = colision_wall(testObj);
    const objectCollision = colision_with_array(testObj, level.rooms[room_actual].objects.filter(obj => obj.colision));
   
    //const enemysCollision = colision_with_array(testObj, level.rooms[room_actual].enemys);
    
    return wallCollision || objectCollision //|| enemysCollision
}

  


function anti_stuck(obj) {
    // Primera fase - búsqueda direccional
    const directions = [
        { dx: -1, dy: -1 },  // Diagonal arriba-izquierda
        { dx: 1, dy: -1 },   // Diagonal arriba-derecha
        { dx: -1, dy: 0 },  // Izquierda
        { dx: 0, dy: -1 },  // Arriba

        { dx: 1, dy: 0 },   // Derecha
        { dx: 0, dy: 1 },   // Abajo
        { dx: 1, dy: 1 },   // Diagonal abajo-derecha
        { dx: -1, dy: 1 },  // Diagonal abajo-izquierda
        { dx: 0, dy: 1 },   // Abajo


        
       
        
       
    ];
    
    const STEP_SIZE = 1;        
    const MAX_DISTANCE = 300;    
    let iterations = 0;          
    
    // Primera fase - búsqueda por direcciones
    for (let distance = STEP_SIZE; distance <= MAX_DISTANCE; distance += STEP_SIZE) {
        for (const direction of directions) {
            let obj_test = { ...obj };
            obj_test.x = obj.x + (direction.dx * distance);
            obj_test.y = obj.y + (direction.dy * distance);
            
            iterations++;
            
            if (!check_all_colisions(obj_test)) {
                obj.x = obj_test.x;
                obj.y = obj_test.y;
                obj.frame_stuck = 0;
                return;
            }
        }
    }
    
    // Segunda fase - búsqueda en área
    const AREA_STEP = 20;      // Saltos de 20 píxeles
    const AREA_SIZE = 800;     // Área de búsqueda (400 píxeles en cada dirección)
    let closest_distance = Infinity;
    let best_position = null;
    
    // Recorremos el área
    for (let dx = -AREA_SIZE/2; dx <= AREA_SIZE/2; dx += AREA_STEP) {
        for (let dy = -AREA_SIZE/2; dy <= AREA_SIZE/2; dy += AREA_STEP) {
            let obj_test = { ...obj };
            obj_test.x = obj.x + dx;
            obj_test.y = obj.y + dy;
            
            iterations++;
            
            if (!check_all_colisions(obj_test)) {
                // Calculamos la distancia al punto original
                let distance = Math.sqrt(dx*dx + dy*dy);
                
                // Si es la posición más cercana hasta ahora, la guardamos
                if (distance < closest_distance) {
                    closest_distance = distance;
                    best_position = { x: obj_test.x, y: obj_test.y };
                }
            }
        }
    }
    
    // Si encontramos alguna posición válida, usamos la más cercana
    if (best_position) {
        obj.x = best_position.x;
        obj.y = best_position.y;
        obj.frame_stuck = 0;
        return;
    }
    
}



function clamp(min, max, num) {
    return Math.min(Math.max(num, min), max);
}



function colision_with_array(obj,array){
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        detected = colision_detect(obj,element)
        if (detected){
            return true
        }
        
    }
    return false


}