
function play_splat_sound(x,y){
    sounds = [splat1_sound,splat2_sound,splat3_sound];
    selected_sound = parseInt(Math.random()*(sounds.length)) 
    play_sound(sounds[selected_sound]);
}

function play_sound(sound_to_play){
    sound_to_play.cloneNode(); 
    sound_to_play.play();
}