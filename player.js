const player = {
    x: 50,
    y: 50,
    width: 32,
    height: 32,
    color: "blue",
    acceleration: 0.5, // Aceleración
    friction: 0.9,   // Fricción para simular inercia
    maxSpeed: 7,      // Velocidad máxima
    vx:0,
    vy:0, // Velocidad actual en X e Y
    size:20, //10 -> precision perfecta 0->caos
    size_w:10,
    size_h:10,
    stuck:0,
    //trajes
    traje:1,
    casco:1,
    //proyectiles
    bullet_type:'arrow',
    /* TIPOS DE PROYECTIL
    arrow--> flecha
    laser--> bala azul
    fire--> fuego
    */

    triatack:true,
    travesable_bullets: false,
    bullet_speed:5,
    cadencia:1,
    rango:150,
    damage_distance:10,
    damage:50,
    precision:1,
    armado:true,
    gore:false,
    //direcciones
    left:false,
    right:false,
    up:false,
    down:false,
    draw() {
        // rectificamos la posición de dibujado para que el dibujo coincida
        // con las colisiones
        var rect_x =-10;
        let rect_y = -15;
        let velocidad_minima = 0.4;
        let frame = 0;
        let scaleX = 1; // Valor por defecto para no voltear el sprite
        console.log("left :"+player.left+" right :"+player.right+" up :"+player.up+" down :"+player.down)
        
        if ( player.left || player.right || player.down || player.up ) {
           
            // Movimiento
            if (Math.abs(player.vx) > velocidad_minima || Math.abs(player.vy) > velocidad_minima){
                velocity_frame = parseInt(frame_counter / 10);
            }else{
                velocity_frame = 0
            }
            
            // Math.abs(player.vx) > Math.abs(player.vy
            // Determina el frame según la dirección del movimiento
            if (player.left || player.right) {
                // Movimiento lateral
                frame = velocity_frame % 3; // Desplazamiento lateral (frames 0, 1, 2)
                // Si el jugador se mueve hacia la derecha, volteamos el sprite
                if (player.right) {
                    scaleX = 1; // No voltear
                } else {
                    scaleX = -1; // Volteamos horizontalmente
                }
            } else if (player.down) {
                // Movimiento hacia arriba
                frame = 6 + (velocity_frame % 3); // Frames 6, 7, 8
            } else if (player.up) {
                // Movimiento hacia abajo
                frame = 3 + (velocity_frame % 3); // Frames 3, 4, 5
            }
    
            const spriteX = frame * player.width;
            const spriteY = 0; // Asumiendo que las filas están en una sola línea horizontal
            let rect = scaleX == -1 ? -32:0;
            // Dibuja el frame actual del jugador con la escala aplicada
            ctx.save();  // Guardamos el contexto actual
            ctx.scale(scaleX, 1); // Aplicamos el volteo horizontal si es necesario

            if (this.armado && player.left && !player.down){
                sprite_x = player.left || player.right ? 0:32;
                ctx.drawImage(
                    rifle_viejo,      // Spritesheet
                    sprite_x,         // Coordenada X del frame en el spritesheet
                    spriteY,         // Coordenada Y del frame en el spritesheet
                    player.width,    // Ancho del frame
                    player.height,   // Alto del frame
                    parseInt(player.x-camera.x) * (scaleX) +rect+rect_x*scaleX,        // Posición X en el canvas
                    parseInt(player.y)+rect_y,        // Posición Y en el canvas
                    player.width,    // Ancho del jugador en el canvas
                    player.height    // Alto del jugador en el canvas
                );
            }
           
            //dibujamos personaje
            ctx.drawImage(
                player_img,      // Spritesheet
                spriteX,         // Coordenada X del frame en el spritesheet
                spriteY,         // Coordenada Y del frame en el spritesheet
                player.width,    // Ancho del frame
                player.height,   // Alto del frame
                parseInt(player.x-camera.x) * (scaleX) +rect+rect_x*scaleX,        // Posición X en el canvas
                parseInt(player.y)+rect_y,        // Posición Y en el canvas
                player.width,    // Ancho del jugador en el canvas
                player.height    // Alto del jugador en el canvas
            );
            //dibujamos traje
            if (this.traje){
                ctx.drawImage(
                    IMG_TRAJE[this.traje],      // Spritesheet
                    spriteX,         // Coordenada X del frame en el spritesheet
                    spriteY,         // Coordenada Y del frame en el spritesheet
                    player.width,    // Ancho del frame
                    player.height,   // Alto del frame
                    parseInt(player.x-camera.x) * (scaleX) +rect+rect_x*scaleX,        // Posición X en el canvas
                    parseInt(player.y)+rect_y,        // Posición Y en el canvas
                    player.width,    // Ancho del jugador en el canvas
                    player.height    // Alto del jugador en el canvas
                );
            }
            //dibujamos casco
            if (this.casco){
                ctx.drawImage(
                    IMG_CASCO[this.casco],      // Spritesheet
                    spriteX,         // Coordenada X del frame en el spritesheet
                    spriteY,         // Coordenada Y del frame en el spritesheet
                    player.width,    // Ancho del frame
                    player.height,   // Alto del frame
                    parseInt(player.x-camera.x) * (scaleX) +rect+rect_x*scaleX,        // Posición X en el canvas
                    parseInt(player.y)+rect_y,        // Posición Y en el canvas
                    player.width,    // Ancho del jugador en el canvas
                    player.height    // Alto del jugador en el canvas
                );
            }
            //dibujamos arma
            if (this.armado && !player.left &&!player.down){
                sprite_x = player.left || player.right ? 0:32;
                ctx.drawImage(
                    rifle_viejo,      // Spritesheet
                    sprite_x,         // Coordenada X del frame en el spritesheet
                    spriteY,         // Coordenada Y del frame en el spritesheet
                    player.width,    // Ancho del frame
                    player.height,   // Alto del frame
                    parseInt(player.x-camera.x) * (scaleX) +rect+rect_x*scaleX,        // Posición X en el canvas
                    parseInt(player.y)+rect_y,        // Posición Y en el canvas
                    player.width,    // Ancho del jugador en el canvas
                    player.height    // Alto del jugador en el canvas
                );
            }


            ctx.restore();  // Restauramos el contexto original
        } else {
            // Animación de idle (cuando el personaje está parado)
            ctx.drawImage(
                player_img,      // Spritesheet
                3 * player.width,         // Coordenada X del frame en el spritesheet
                0,         // Coordenada Y del frame en el spritesheet
                player.width,    // Ancho del frame
                player.height,   // Alto del frame
                parseInt(player.x-camera.x)+rect_x*scaleX,        // Posición X en el canvas
                parseInt(player.y)+rect_y,        // Posición Y en el canvas
                player.width,    // Ancho del jugador en el canvas
                player.height    // Alto del jugador en el canvas
            );
            //dibujamos traje
            if (this.traje){
                ctx.drawImage(
                    IMG_TRAJE[this.traje],      // Spritesheet
                    3 * player.width,         // Coordenada X del frame en el spritesheet
                    0,         // Coordenada Y del frame en el spritesheet
                    player.width,    // Ancho del frame
                    player.height,   // Alto del frame
                    parseInt(player.x-camera.x)+rect_x*scaleX,        // Posición X en el canvas
                    parseInt(player.y)+rect_y,        // Posición Y en el canvas
                    player.width,    // Ancho del jugador en el canvas
                    player.height    // Alto del jugador en el canvas
                );
            }
            //dibujamos casco
            if (this.casco){
                ctx.drawImage(
                    IMG_CASCO[this.casco],      // Spritesheet
                    3 * player.width,         // Coordenada X del frame en el spritesheet
                    0,         // Coordenada Y del frame en el spritesheet
                    player.width,    // Ancho del frame
                    player.height,   // Alto del frame
                    parseInt(player.x-camera.x)+rect_x*scaleX,        // Posición X en el canvas
                    parseInt(player.y)+rect_y,        // Posición Y en el canvas
                    player.width,    // Ancho del jugador en el canvas
                    player.height    // Alto del jugador en el canvas
                );
            }
            //dibujamos arma
            if (this.armado){
                //sprite_x = player.left || player.right ? 0:32;
                ctx.drawImage(
                    rifle_viejo,      // Spritesheet
                    32,         // Coordenada X del frame en el spritesheet
                    0,         // Coordenada Y del frame en el spritesheet
                    player.width,    // Ancho del frame
                    player.height,   // Alto del frame
                    parseInt(player.x-camera.x)+rect_x*scaleX,        // Posición X en el canvas
                    parseInt(player.y)+rect_y,        // Posición Y en el canvas                    player.width,    // Ancho del jugador en el canvas
                    player.width,    // Ancho del jugador en el canvas
                    player.height    // Alto del jugador en el canvas
                );
            }
        }

        
    },

};




function paint_auras(){
    if (player.triatack) {
        ctx.save(); // Guardar el estado actual del contexto
        
       ctx.globalCompositeOperation = "color-dodge";

    
        // Calcular la posición del centro de la imagen
        const centerX = -camera.x+player.x+6;
        const centerY = player.y+16;
    
        // Trasladar el contexto al centro del aura
        ctx.translate(centerX, centerY);
    
        // Rotar el contexto usando frameCounter para que gire continuamente
        const rotationSpeed = 0.05; // Ajusta este valor para cambiar la velocidad de rotación
        ctx.rotate(frame_counter * rotationSpeed);
    
        // Dibujar la imagen centrada, aplicando la rotación
        ctx.drawImage(triaura, -triaura.width / 2, -triaura.height / 2);
    
        ctx.restore(); // Restaurar el estado original del contexto
    }
}

function this_room_exists(id){
    try{
        x = level.get_room_pos(id)
        return true;
    }catch{
        return false;
    }
}

function check_doors(room_test){
    rect_door = level.rooms[room_actual].double ? 533:0;    
    const doors = [
        { x: 250, y: 20, width: 50, height: 10, direction: "arriba" },
        { x: 250, y: 270, width: 50, height: 5, direction: "abajo" },
        { x: (250)+533, y: 20, width: 50, height: 10, direction: "arriba2" },
        { x: (250)+533, y: 270, width: 50, height: 5, direction: "abajo2" },
        { x: 20, y: 307/2, width: 10, height: 50, direction: "izquierda" },
        { x: 505+rect_door, y: 307/2, width: 10, height: 50, direction: "derecha" },
    ];
    for (const door of doors) {
        if (
            player.x < door.x + door.width && // Rango de colisión en X
            player.x + player.width > door.x &&
            player.y < door.y + door.height && // Rango de colisión en Y
            player.y + player.height > door.y
        ) {
            x = room_test.array_x;
            y = room_test.array_y;
            if (door.direction == "arriba" && room_test.door_up && room_test.clear ){
                previous_room = room_actual
                //render_without_player()
                id_to_test = room_test.door_up.id
                if(this_room_exists(id_to_test)){
                   //down
                    update_current_room(id_to_test)
                    handleDoorEntry('down')
                    player.x = 268;
                    player.y = 235;
                }else{
                    //down2
                    update_current_room(id_to_test-level.size)
                    handleDoorEntry('down2')
                    player.x = 533+268;
                    player.y = 235;
                }

               
            }
            if (door.direction == "arriba2" && room_test.door_up2 && room_test.clear ){
                previous_room = room_actual
                //render_without_player()
                id_to_test = room_test.door_up2.id
                if(this_room_exists(id_to_test)){
                   //down
                    update_current_room(id_to_test)
                    handleDoorEntry('down2')
                    player.x = 268;
                    player.y = 235;
                }else{
                    //down2
                    update_current_room(id_to_test-level.size)
                    handleDoorEntry('down2')
                    player.x = 533+268;
                    player.y = 235;
                }

               
            }
            if (door.direction == "abajo" && room_test.door_down && room_test.clear){
                previous_room = room_actual
                //render_without_player()
                id_to_test = room_test.door_down.id
                if(this_room_exists(id_to_test)){
                   // console.warn("down normall")
                    update_current_room(id_to_test)
                    handleDoorEntry('up')
                    player.x = 268;
                    player.y = 30;
                }else{
                  //  console.warn("down2 anormal")
                    update_current_room(id_to_test-level.size)
                    handleDoorEntry('up2')
                    player.x = 533+268;
                    player.y = 30;
                }
               
                //fadeOut();
               
            }
            if (door.direction == "abajo2" && room_test.door_down2 && room_test.clear){
                previous_room = room_actual
                //render_without_player()
                id_to_test = room_test.door_down2.id
                if(this_room_exists(id_to_test)){
                   // console.warn("down normall")
                    update_current_room(id_to_test)
                    handleDoorEntry('up2')
                    player.x = 268;
                    player.y = 30;
                }else{
                  //  console.warn("down2 anormal")
                    update_current_room(id_to_test-level.size)
                    handleDoorEntry('up2')
                    player.x = 533+268;
                    player.y = 30;
                }
               
                //fadeOut();
               
            }
            if (door.direction == "izquierda" && room_test.door_left && room_test.clear){
                
                previous_room = room_actual
                //render_without_player()
                update_current_room(room_test.door_left.id)
                handleDoorEntry('right')
               console.warn("vamos a la izquierda")
               let rect=0
               if (level.rooms[room_actual].double){
                rect = 533;
               }
                player.x = 460+rect;
                player.y = 154;
            }
            if (door.direction == "derecha"  && room_test.door_right && room_test.clear){
                previous_room = room_actual
                //render_without_player()
                update_current_room(room_test.door_right.id)
                handleDoorEntry('left')
               
                //fadeOut();
               
                player.x = 35;
                player.y = 154;
            }
            
            // Opcional: regresar al punto previo si deseas bloquear al jugador en caso de colisión
           
        }
    }
}

function update_current_room(id){
    room_actual = level.get_room_pos(id)
    if (level.rooms[room_actual].clear == false){
        if (level.rooms[room_actual].type == 3){
            boss_warning_animation_activate();
        }
       close_gates();
    }
    player.vx,player.vy=0;

}

function print_splat(image,x,y){
    room = level.rooms[room_actual]
    if (x > 40 && y > 40 && y < room.canvas.height -60 && x < room.canvas.width -60){
        context_room =room.context;
        let scaleX = Math.random() > 0.5 ? -1:1;
        let scaleY = Math.random() > 0.5 ? -1:1;
        let rect_x = scaleX == -1 ? -32:0;
        let rect_y = scaleY == -1 ? -32:0;
        context_room.save();  // Guardamos el contexto actual
        context_room.scale(scaleX, scaleY); // Aplicamos el volteo horizontal si es necesari
        context_room.drawImage(image,parseInt(x*scaleX +rect_x),parseInt(y*scaleY+rect_y))
        context_room.restore();
    }
}
const keys = {}; // Objeto para rastrear teclas activas
function updatePlayerPosition() {
    player.left = false;
    player.right = false;
    player.up = false;
    player.down = false;
    // Acelerar según las teclas activas
    
    
    room = level.rooms[room_actual] 
    let prov_vx =0;
    let prov_vy =0;
    if (Math.abs(player.vx) > Math.abs(player.vy)){
        if(player.vx > 0.2){
            player.right = true
        }else{
            if (player.vx < -0.2){
                player.left = true
            }
        }
    }else{
        if (player.vy > 0.2){
            player.up = true;
        }else{
            if (player.vy< -0.2){
                player.down = true;
            }
        }
    }

    if (keys["ArrowUp"]) prov_vy -= player.acceleration;
    if (keys["ArrowDown"]) prov_vy += player.acceleration;
    if (keys["ArrowLeft"]) prov_vx -= player.acceleration;
    if (keys["ArrowRight"]) prov_vx += player.acceleration;


    if (keys["d"]){
       
        player.left = false;
        player.up = false;
        player.down = false;
        player.right = true
        shoot_disparo(0);
    }   
    if (keys["w"]){
        player.left = false;
        player.right = false;
        player.up = false;
        player.down = false;
        player.down = true;
        shoot_disparo(270); 
    } 
    if (keys["a"]){
        player.left = false;
        player.right = false;
        player.up = false;
        player.down = false;
        player.left = true;
        shoot_disparo(180);
    } 
    if (keys["s"]){
        player.left = false;
        player.right = false;
        player.up = false;
        player.down = false;
        player.up = true;
        shoot_disparo(90); 
    } 
    if (keys["f"]){
        if (canvas_screen.requestFullscreen) {
            canvas_screen.requestFullscreen();
          }
    }
   
    //object_to_check = {x: player.x+prov_vx,y:player.y+prov_vy,size_h:player.size_h,size_w:player.size_w}
    //console.warn(object_to_check)
    player_colision = check_all_colisions(player,prov_vx,prov_vy);
    if (prov_vx == 0 && prov_vy == 0 &&player.stuck > 5){
        //funcion antistuck
        anti_stuck(player)
        player.stuck = 0
    }
    

    if (player_colision) {
        player.stuck +=1;
        if(player.stuck < 5){
            player.vx = -player.vx;
            player.vy = -player.vy;
        }
    }else{
        player.stuck=0;
        player.vx +=prov_vx
        player.vy +=prov_vy
    }


    player.vx *= player.friction;
    player.vy *= player.friction;

    // Limitar la velocidad máxima
    player.vx = Math.max(
        -player.maxSpeed,
        Math.min(player.vx, player.maxSpeed)
    );
    player.vy = Math.max(
        -player.maxSpeed,
        Math.min(player.vy, player.maxSpeed)
    );

    //limitar las salidas del mapa
            let up =  15
            let down = room.canvas.height - 60 
            let left =30 
            let right = room.canvas.width - 60 
            player.x =clamp(left,right,player.x);
            player.y =clamp(up,down,player.y);

    
    // Actualizar la posición
    player.x += player.vx;
    player.y += player.vy;

    // Detectar colisiones y puertas
    const room_test = level.rooms[room_actual];
    check_doors(room_test);

    // Dibujar el jugador
    //drawPlayer();
    
}




// Manejar el evento de presión de teclas
document.addEventListener("keydown", (event) => {
    keys[event.key] = true; // Marca la tecla como activa
});

// Manejar el evento de liberación de teclas
document.addEventListener("keyup", (event) => {
    keys[event.key] = false; // Marca la tecla como inactiva
});


