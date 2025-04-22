dialog_pool =[];
let dialog_active = false;
let text_to_show_dialog = ""
let text_dialog = ""
let text_speed = 5;
let dialog_iterations = 0;
let dialog_size = 43
let frames_time = 20;
let frames_ocurred = 0;


function dialog(text){
    if (!dialog_active && (finish_title < frame_counter ) && level.rooms[room_actual].enemys.length ==0){
     dialog_iterations = 0
     dialog_active = true;
     text_dialog = ""
     frames_ocurred = frame_counter + frames_time;
     text_to_show_dialog = text;
     player.can_move = false;
    }else{
        dialog_pool.push(text);
    }
}

function close_dialog(){
        dialog_active = false;
        player.can_move = true;
}

function update_dialog() {
    if (!dialog_active && dialog_pool.length > 0 && level.rooms[room_actual].enemys.length ==0 ){
        dialog(dialog_pool.shift());
    }
    
    //miramos que no se haya completado las letras
    if (text_to_show_dialog.length !== text_dialog.length && isPushingKeys()){
        text_dialog = text_to_show_dialog;
    }

    if (frame_counter % text_speed === 0 && text_to_show_dialog.length !== text_dialog.length) {
        let sound = bla_sound.cloneNode();  // Clona el sonido para evitar que se sobreescriba
        sound.volume = 0.5;  // Ajusta el volumen si es necesario
        play_sound(sound)

        dialog_iterations++;
        text_dialog = text_to_show_dialog.slice(0, dialog_iterations);
    }

    if(dialog_active && text_to_show_dialog.length == text_dialog.length){
        //poner aquí imagen para avanzar o algo así
        console.log(frames_ocurred);
        if (isPushingKeys() && frames_ocurred < frame_counter){
           close_dialog();
        }
       
    }



}