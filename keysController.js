//se añade esta variable para que no se puedan apretar accidentalmente
//las teclas en menus, dialogos...
let tiles_delay = 30
let tile_check_keys = 0
function isPushingKeys(){
    if (frame_counter > tile_check_keys &&( keys["d"] || keys["w"]|| keys["a"] || keys["s"])){
        tile_check_keys = frame_counter+tiles_delay;
        return true;
    }
    return false; 
}
