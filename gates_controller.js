let gates ={
    draw_gates:false,
    frame:0,
    down:false,
    animation:false,
    frame_init: 0
}

function open_gates(){
    play_sound(open_gate_sound);
    gates.draw_gates = true
    gates.down = false;
    gates.animation = true;
    gates.frame_init = frame_counter
}

function close_gates(){
    play_sound(close_gate_sound);
    gates.frame = 0;
    gates.draw_gates = true
    gates.down = true;
    gates.animation = true;
    gates.frame_init =frame_counter
}

