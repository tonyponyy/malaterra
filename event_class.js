class Event{


    constructor(x,y,size,type,onpress = false) {
        this.x = x;
        this.y = y;
        this.size_w = size;
        this.size_h = size;
        this.type = type;
        this.onpress = onpress;
        this.done = false;
    }

    update(){
        if (!this.done){
            // si onpress está puesto a true, significa que se ejecutará 
            // cuando se pulse una tecla, de otra manera, se ejecutara al iniciar
            if(!dialog_active && (!this.onpress || (isPushingKeys() && colision_detect(this,player)))){
              if (this.type.type == "dialog"){
                dialog(this.type.text)
                this.done = true;
              }
            }

        }

    }

}

function generate_dialog(text){
  type = {type:"dialog",text:text}
  return new Event( 0,0,0,type)

}