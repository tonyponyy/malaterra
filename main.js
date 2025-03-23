debug = false;
camera = {x:0};
genex(6);
//seed ="D91DBF" 
pool_disparo = [];
//seed = "B60596" ;
const canvas = document.createElement("canvas");
const canvas_screen = document.getElementById('canvas');
canvas_screen.width = 533// real-->553;
canvas_screen.height = 300;
canvas.width = 533// real-->553;
canvas.height = 300;
const ctx = canvas.getContext('2d');
const ctx_screen = canvas_screen.getContext('2d');
ctx.imageSmoothingEnabled = false;
ctx_screen.imageSmoothingEnabled = false;
//refactorizar a saco
level_actual = 0;
room_actual = 0;
previous_room = 0;
n_tiles = 3
level = new Level(8,2)
level.title = "uwu"
set_events_in_initial(level,[generate_dialog("esto es el principio"),generate_dialog("yeah")]);
set_events_in_path(level,[generate_dialog("esto es un momento random"),generate_dialog("rakaka")]);
set_events_in_pre_boss(level,generate_dialog("esta es antes de llegar al boss"));




var transition_m = new LevelTransition(ctx);



//ancho --> 960
//alto --> 540 




//const room_test = new Room(1, 1,{id:3,type:3},{id:3,type:3},{id:3,type:3},{id:3,type:3},true);



const canvas_test = document.createElement('canvas');
const blockSize = 20;



//previsualizacion del mapa
map = level.map;
canvas_test.width = map[0].length * blockSize;
canvas_test.height = map.length * blockSize;
document.body.appendChild(canvas_test);
const context = canvas_test.getContext('2d');
//drawMap(context, map, blockSize);
//
room_actual = level.get_current_room_pos();
player.x = parseInt(canvas.width/2)
player.y = parseInt(canvas.height/2)
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
        print_text("left :"+player.left+" right :"+player.right+" up :"+player.up+" down :"+player.down,40,40)
    
        event_update();
        objects_update();
        proyectil_moves();
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
   
    
    

    requestAnimationFrame(animationLoop);
}

function update_title(){
    if (title_initiate){
        title_initiate = false;
        finish_title  = frame_counter + 400;
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

     /*
     ctx_screen.drawImage(menu_tienda,100,100)
     print_text("$300",212,157,ctx_screen)
     ctx_screen.drawImage(cursor,225,130)*/
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
    array_to_draw.sort((a, b) => a.y - b.y);

    for (let i = 0; i < array_to_draw.length; i++) {

        array_to_draw[i].draw(); 
         
    }
    for (let e = 0; e < level.rooms[room_actual].wall_objects.length; e++) {
        const element = level.rooms[room_actual].wall_objects[e];
        element.draw();
        //console.log("se dibuja")
    }

   
    boss_warning_animation()
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
animationLoop();

/*  TODO -->
- arreglar colisiones jugador con las puertas
- añadir funcionalidad objetos destruibles
- añadir particulas
- añadir modificadores estado jugador
- añadir trajes
- añadir sistema de menus


*/