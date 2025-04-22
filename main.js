//canvas
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
var transition_m = new LevelTransition(ctx);
var frame_counter = 0;

scene = "game"
first_init = true;



function main(){
    if (can_start_game){
        if (scene =="game"){
            //se comprueba que se inicie solo una vez
            //este script
            if (first_init){
                load_first()
                first_init = false;
            }
            animationLoop();
        }
        if (scene =="pause"){
            pauseloop();
        }
        }else{
            print_text("cargando",10,10)
    }


    requestAnimationFrame(main);
}

main();