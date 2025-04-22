debug = false;
camera = {x:0};
SOMBRA = "rgba(34, 32, 52)"
genex(6);
pool_disparo = [];
let level;
level_actual = 0;
room_actual = 0;
previous_room = 0;
n_tiles = 3
room_actual =0;
const canvas_test = document.createElement('canvas');
const blockSize = 20;
document.body.appendChild(canvas_test);
const context = canvas_test.getContext('2d');
//seed ="D91DBF" 

//seed = "B60596" ;

function load_first(){
    //refactorizar a saco
    level = new Level(8,1)
    level.title = "uwu"
    set_events_in_initial(level,[generate_dialog("esto es el principio"),generate_dialog("yeah")]);
    set_events_in_path(level,[generate_dialog("esto es un momento random"),generate_dialog("rakaka")]);
    set_events_in_pre_boss(level,generate_dialog("esta es antes de llegar al boss"));
    map = level.map;
    canvas_test.width = map[0].length * blockSize;
    canvas_test.height = map.length * blockSize;
    room_actual = level.get_current_room_pos();
    player.x = parseInt(canvas.width/2)
    player.y = parseInt(canvas.height/2)
    set_equipo()
}


function animationLoop() {
    if (transition_m.isTransitioning) {
        clear_canvas();
        
        transition_m.draw(() => {
          
        });
        
        const transitionComplete = transition_m.update();
        if (transitionComplete) {
            
        }
        
        draw_gui();
    } else {
        update_camera();
        
        updateScene();
        clear_canvas();
        updatePlayerPosition();
        render();
        //if (debug){
        print_text("frame counter :"+frame_counter,40,40)
        print_text("enemies :"+level.rooms[room_actual].enemys.length,40,50)
        print_text("particles :"+level.rooms[room_actual].particles.length,40,60)

       // }
        hitboxes_update();
        event_update();
        objects_update();
        proyectil_moves();
        spike_damage()
        enemy_lives();
        draw_gui();
        //camera.x = -player.x
    }
    //ctx_screen.drawImage(panel_iz,400,0)
    ctx_screen.drawImage(canvas,0,0)
    //drawMinimap(ctx_screen,50,20)
    if(level.rooms[room_actual].clear){
        drawMap(ctx_screen, 10,50,50,461,241);
    }
    
    
    update_title()
    update_dialog()
    if(dialog_active){
        ctx_screen.drawImage(dialogo,15,230)
        print_text_dialog(text_dialog,65,240,ctx_screen)
    }
   
}

function update_title(){
    if (title_initiate){
        title_initiate = false;
        finish_title  = frame_counter + 200;
    }
    if (finish_title > frame_counter){
        print_title(level.title,10,100,30,ctx_screen)
    }
    


}


function update_camera() {
    let room = level.rooms[room_actual];
    let room_width = room.canvas.width;
    // Centrar la cámara en el jugador
    if (!transition_m.isTransitioning){
        camera.x = Math.max(0, Math.min(player.x - 533 / 2, room_width - 533));
    }else{
        camera.x = 0
    }
   
}

// Función para manejar la entrada en la puerta
function handleDoorEntry(direction = 'up') {
    play_sound(door_sound);
    if (!transition_m.isTransitioning) {
        transition_m.startTransition(direction);
        // Aquí deberías actualizar room_actual y hacer otros cambios necesarios
        // dependiendo de qué puerta se usó
        console.warn("animation direction-->"+direction)
    }
}

function hitboxes_update(){
    let damage_explosion = 50;
            //hitboxes
    for (let i = 0; i < level.rooms[room_actual].hitboxes.length; i++) {
        const hitbox = level.rooms[room_actual].hitboxes[i];
        hitbox.run()
            for (let e = 0; e < level.rooms[room_actual].enemys.length; e++) {
                const enemy = level.rooms[room_actual].enemys[e];
                if(colision_detect(hitbox,enemy)){
                    if (enemy.damaged <= 0){
                    enemy.other_damage(damage_explosion)
                    enemy.damaged = 32;
                    }
                }
            }
            for (let j = 0; j < level.rooms[room_actual].objects.length; j++) {
                const object_room = level.rooms[room_actual].objects[j];
                if (object_room.destructible){
                        if(colision_detect(object_room,hitbox)){
                            
                            if (object_room.damaged <= 0){
                                object_room.hp -= damage_explosion;
                                object_room.damaged = 32;
                            }
                         }
                }
                
            }
            if(colision_detect(hitbox,player)){
                console.warn("colision player explosion")
            }
        
        if (!hitbox.active){
            level.rooms[room_actual].hitboxes.splice(i,1)
        }
        
    }
}


function objects_update(){

    for (let i = 0; i < level.rooms[room_actual].objects.length; i++) {
        let object = level.rooms[room_actual].objects[i]
        object.update();
        
        //object.draw();
        
        if (object.destructible){
            for (let f = 0; f < pool_disparo.length; f++) {
                disparo = pool_disparo[f]
                if(colision_detect(object,disparo)){
                    
                    if (object.damaged <= 0){
                        object.hp -= player.damage_distance;
                        object.damaged = 6;
                    }
                    disparo.delete = true;
                    
                 }
            }

        }
        if (object.delete){
            level.rooms[room_actual].objects.splice(i,1)
        }

    }
     //particulas

     //se limitan a 600 particulas para que no se vaya de madre
     let limit_n_particles = 600;
     if (level.rooms[room_actual].particles.length > limit_n_particles){
        level.rooms[room_actual].particles  = level.rooms[room_actual].particles.splice(0, limit_n_particles);
     }
   
    for (let e = 0; e < level.rooms[room_actual].particles.length; e++) {
        const element = level.rooms[room_actual].particles[e];

        if (!element.active) {
            level.rooms[room_actual].particles.splice(e, 1);
        }
        //const particle = level.rooms[room_actual].particles[e];
        element.update();
    }
}

function updateScene(){
    if (level.rooms[room_actual].clear == false && level.rooms[room_actual].enemys.length == 0){
            level.rooms[room_actual].clear = true;
            open_gates();
    }
    if (level.rooms[room_actual].clear == true && level.rooms[room_actual].enemys.length > 0){
        level.rooms[room_actual].clear = false;
        close_gates();
}

}

function draw_gui(){
    transition();
    //print_title(level.title,10,100,30,ctx_screen)

     
     
}

function clear_canvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function proyectil_moves(){
    for (let i = 0; i < pool_disparo.length; i++) {
        
        pool_disparo[i].update_proyectil();
       // pool_disparo[i].draw
        if (pool_disparo[i].delete){
            pool_disparo.splice(i,1)
        }
    }

}


function enemy_lives(){
    for (let i = 0; i < level.rooms[room_actual].enemys.length; i++) {
        enemy = level.rooms[room_actual].enemys[i]
        enemy.update();
        //enemy.draw();
        for (let e = 0; e < pool_disparo.length; e++) {
            disparo =  pool_disparo[e]
            
            if(colision_detect(enemy,disparo)){
            if (!player.travesable_bullets){
                disparo.delete = true;
            }
            
              if (enemy.damaged <= 0){
               enemy.damage_distance(disparo); 
               enemy.damaged = 6;
              }
            }
            
        }
        if (enemy.hp < 0){
            enemy.death()
            level.rooms[room_actual].enemys.splice(i,1)
        }

    }
}

function spike_damage() {
    if (player.spikers <=0){
        return
    }
    delete_spikes = 0;
    const numSpikes = player.numSpikes;
    const radius = player.radius;
  
    for (let i = 0; i < numSpikes; i++) {
      const angle = player.angleOffset + (i * (2 * Math.PI / numSpikes));
      const spikeX = player.x + Math.cos(angle) * radius;
      const spikeY = player.y + Math.sin(angle) * radius;
  
      for (let j = 0; j < level.rooms[room_actual].enemys.length; j++) {
        const enemy = level.rooms[room_actual].enemys[j];
  
        // Crea un objeto ficticio para usar con colision_detect
        const spike_hitbox = {
          x: spikeX - 8,
          y: spikeY - 8,
          size_w: 16,
          size_h: 16,
        };
  
        if (colision_detect(enemy, spike_hitbox)) {
          if (enemy.damaged <= 0) {
            delete_spikes++
            enemy.other_damage(player.damage_distance/5); // puedes pasar el player o una referencia
            enemy.damaged = 6; // cooldown de daño
          }
        }
      }
    }
    player.spikers -= delete_spikes/2;
    player.numSpikes = parseInt((player.spikers*7)/100)
  }

function render_without_player(){
    //dibujamos el fondo
    clear_canvas();
    room = level.rooms[room_actual]
    ctx.drawImage(room.canvas, 0, 0);
    if(gates.draw_gates){
        set_gates(room)
    }
    //drawPlayer()
    frame_counter++
    //paint_auras()
    //guardamos todos los dibujables en una array
    let array_to_draw = [
        ...pool_disparo, 
        ...level.rooms[room_actual].objects, 
        ...level.rooms[room_actual].enemys,
    ];
    
    array_to_draw.sort((a, b) => a.y - b.y);

    for (let i = 0; i < array_to_draw.length; i++) {

        array_to_draw[i].draw(); 
         
    }
}



function render(){
    //dibujamos el fondo
    room = level.rooms[room_actual]
    ctx.drawImage(room.canvas, -camera.x, 0);
    if(gates.draw_gates){
        set_gates(room)
    }
    //drawPlayer()
    frame_counter++
    //imprimos las sombras
    let shadow_to_draw = [
        ...level.rooms[room_actual].enemys,
    ];
    false_player = {x:player.x-10,y:player.y-16,size_h:32,size_w:32}
    shadow_to_draw.push(false_player)
    paint_shadows(shadow_to_draw);
    paint_auras()
    //guardamos todos los dibujables en una array
    let array_to_draw = [
        ...pool_disparo, 
        ...level.rooms[room_actual].objects, 
        ...level.rooms[room_actual].enemys,
        ...level.rooms[room_actual].particles
    ];
    //añadimos al player
    array_to_draw.push(player)
    //ordenamos de menor a mayor
   // array_to_draw.sort((a, b) => a.y - b.y);
    array_to_draw.sort((a, b) => (a.y + (a.size_h || 0)) - (b.y + (b.size_h || 0)));

    for (let i = 0; i < array_to_draw.length; i++) {

        array_to_draw[i].draw(); 
         
    }
    for (let e = 0; e < level.rooms[room_actual].wall_objects.length; e++) {
        const element = level.rooms[room_actual].wall_objects[e];
        element.draw();
        //console.log("se dibuja")
    }
    drawSpikes()
    //animaciones
    for (let i = 0; i < level.rooms[room_actual].animations.length; i++) {
        const element = level.rooms[room_actual].animations[i];
        element.run()
        if (!element.active){
            level.rooms[room_actual].animations.splice(i,1)
        }
        
    }
        //billboards
    for (let i = 0; i < level.rooms[room_actual].billboards.length; i++) {
        const element = level.rooms[room_actual].billboards[i];
        element.run()
        if (!element.active){
            level.rooms[room_actual].billboards.splice(i,1)
        }
        
    }

    update_shop();

   
    boss_warning_animation()
}

function paint_shadows(array_to_draw) {

    ctx.fillStyle = SOMBRA;
    for (let i = 0; i < array_to_draw.length; i++) {
        const element = array_to_draw[i];
        let x_object = element.x;
        let y_object = element.y;
        let width_object = element.size_w;
        let height_object = element.size_h;
        let shadowX = x_object + width_object / 2 - camera.x;
        let shadowY = y_object + height_object;

        
        ctx.beginPath();
        ctx.ellipse(
            shadowX,
            shadowY,
            width_object * 0.3,
            height_object * 0.15,
            0,
            0,
            Math.PI * 2
        );
        ctx.fill();
       
    }
}


function set_gates(room){
    //hay animacion
    diff = parseInt((frame_counter - gates.frame_init)/10)
    if ( gates.down && gates.animation && gates.frame<=4){
        gates.frame = diff;
        //console.log("masframes")
    }
    if ( !gates.down && gates.animation){
        console.log("menosframes")
        gates.frame = 5 - diff;
    }
    if (gates.frame < 0){
        gates.draw_gates = false;
    }


    draw_gates(room)
}

function event_update(){
    for (let i = 0; i < level.rooms[room_actual].events.length; i++) {
        const element = level.rooms[room_actual].events[i];
        element.update();
        
    }
}


// Iniciar el bucle de animación


/*  TODO -->
- arreglar colisiones jugador con las puertas
- añadir funcionalidad objetos destruibles
- añadir particulas
- añadir modificadores estado jugador
- añadir trajes
- añadir sistema de menus


*/