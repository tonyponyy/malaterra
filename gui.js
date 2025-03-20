let transtion_settings = {
    frame_end: 0,
    fade_in: true
};
// Para hacer aparecer la pantalla gradualmente
function fadeIn() {
    transtion_settings.fade_in = true;
    transtion_settings.frame_end = frame_counter + 50;
}

// Para hacer desaparecer la pantalla gradualmente
function fadeOut() {
    transtion_settings.fade_in = false;
    transtion_settings.frame_end = frame_counter + 50;
}
//
function transition() {
    if (transtion_settings.frame_end > frame_counter) {
      diferencial_frame = transtion_settings.frame_end - frame_counter;
      frame_trans = 50 - diferencial_frame;
      if (transtion_settings.fade_in == true) {
        frame_trans = parseInt((50 - diferencial_frame) / 5);
      } else {
        frame_trans = 4 - parseInt((50 - diferencial_frame) / 5);
      }

      for (let i = 0; i < parseInt(canvas.width / 31) + 1; i++) {
        for (let e = 0; e < canvas.height / 31 + 1; e++) {
          ctx.drawImage(
            transition_img,
            frame_trans * 31,
            0,
            31,
            31,
            i * 31,
            e * 31,
            31,
            31
          );
        }
      }

      if (frame_trans == 4 && transtion_settings.fade_in == true) {
        return true;
      }
      if (frame_trans == 0 && transtion_settings.fade_in == false) {
        return true;
      }
    }
  }



  // funciona bien!!
  class LevelTransition {
    constructor(ctx) {
        this.ctx = ctx;
        this.snapshot = null;
        this.transitionProgress = 0;
        this.isTransitioning = false;
        this.transitionSpeed = 10;
        this.direction = 'right';
        this.VIEWPORT_WIDTH = 400;
        this.VIEWPORT_HEIGHT = 300;
        this.previousRoom;
    }

    takeSnapshot() {
        this.previousRoom = level.rooms[previous_room];
        
        this.snapshot = document.createElement('canvas');
        this.snapshot.width = this.VIEWPORT_WIDTH;
        this.snapshot.height = this.VIEWPORT_HEIGHT;
        const snapshotCtx = this.snapshot.getContext('2d');
        
        let sourceX = 0 

        //rectificación de la x
        if(this.previousRoom.canvas.width >400 && (this.direction == 'left' || this.direction == 'up2' || this.directiom == 'down2')){
            sourceX = 400;
        }
        //cutre pero funciona.
        if ((this.direction =='down2' || this.direction =='up2') && this.previousRoom.canvas.width > level.rooms[room_actual].canvas.width  ){
            sourceX = 400;
        }
        
            
        snapshotCtx.drawImage(
            this.previousRoom.canvas,
            sourceX,                          
            0,                          
            this.VIEWPORT_WIDTH,        
            this.VIEWPORT_HEIGHT,       
            0,                          
            0,                          
            this.VIEWPORT_WIDTH,        
            this.VIEWPORT_HEIGHT        
        );
        
        this.objects = this.previousRoom.objects;
        this.wall_objects = this.previousRoom.wall_objects;
        this.enemys = this.previousRoom.enemys;
    }

    startTransition(direction = 'right') {
        this.isTransitioning = true;
        this.transitionProgress = 0;
        this.direction = direction;
        this.takeSnapshot();
        
        // Guardar la habitación actual para el renderizado limitado
        const currentRoom = level.rooms[room_actual];
        this.currentRoomSnapshot = document.createElement('canvas');
        this.currentRoomSnapshot.width = this.VIEWPORT_WIDTH;
        this.currentRoomSnapshot.height = this.VIEWPORT_HEIGHT;
        const ctx = this.currentRoomSnapshot.getContext('2d');
        
        // Capturar la parte relevante de la nueva habitación
        if (this.direction === 'left') {
            // Para transiciones hacia la izquierda, tomamos los primeros 400px
            //const sourceX = Math.max(0, currentRoom.canvas.width - this.VIEWPORT_WIDTH);
            ctx.drawImage(
                currentRoom.canvas,
                0,
                0,
                this.VIEWPORT_WIDTH,
                this.VIEWPORT_HEIGHT,
                0,
                0,
                this.VIEWPORT_WIDTH,
                this.VIEWPORT_HEIGHT
            );
        } else if (this.direction === 'right') {
            // Para transiciones hacia la derecha, tomamos los últimos 400px
            const sourceX = Math.max(0, currentRoom.canvas.width - this.VIEWPORT_WIDTH);
            ctx.drawImage(
                currentRoom.canvas,
                sourceX,
                0,
                this.VIEWPORT_WIDTH,
                this.VIEWPORT_HEIGHT,
                0,
                0,
                this.VIEWPORT_WIDTH,
                this.VIEWPORT_HEIGHT
            );
        } else if (this.direction === 'up2') {
            // Para transiciones hacia la derecha, tomamos los últimos 400px
            const sourceX = Math.max(0, currentRoom.canvas.width - this.VIEWPORT_WIDTH);
            ctx.drawImage(
                currentRoom.canvas,
                sourceX,
                0,
                this.VIEWPORT_WIDTH,
                this.VIEWPORT_HEIGHT,
                0,
                0,
                this.VIEWPORT_WIDTH,
                this.VIEWPORT_HEIGHT
            );
        } else if (this.direction === 'down2') {
            // Para transiciones hacia la derecha, tomamos los últimos 400px
            const sourceX = Math.max(0, currentRoom.canvas.width - this.VIEWPORT_WIDTH);
            //alert(sourceX)
            ctx.drawImage(
                currentRoom.canvas,
                sourceX,
                0,
                this.VIEWPORT_WIDTH,
                this.VIEWPORT_HEIGHT,
                0,
                0,
                this.VIEWPORT_WIDTH,
                this.VIEWPORT_HEIGHT
            );
        } else if (this.direction === 'up') {
            // Para transiciones hacia arriba, tomamos los primeros 300px de altura
            ctx.drawImage(
                currentRoom.canvas,
                0,
                0,
                this.VIEWPORT_WIDTH,
                this.VIEWPORT_HEIGHT,
                0,
                0,
                this.VIEWPORT_WIDTH,
                this.VIEWPORT_HEIGHT
            );
        } else if (this.direction === 'down') {
            // Para transiciones hacia abajo, tomamos los últimos 300px de altura
            const sourceY = Math.max(0, currentRoom.canvas.height - this.VIEWPORT_HEIGHT);
            ctx.drawImage(
                currentRoom.canvas,
                0,
                sourceY,
                this.VIEWPORT_WIDTH,
                this.VIEWPORT_HEIGHT,
                0,
                0,
                this.VIEWPORT_WIDTH,
                this.VIEWPORT_HEIGHT
            );
        }
    }

    update() {
        if (this.isTransitioning) {
            this.transitionProgress += this.transitionSpeed;
            
            const maxProgress = (this.direction === 'left' || this.direction === 'right') 
                ? this.VIEWPORT_WIDTH 
                : this.VIEWPORT_HEIGHT;
            
            if (this.transitionProgress >= maxProgress) {
                this.isTransitioning = false;
                this.snapshot = null;
                this.currentRoomSnapshot = null;
                return true;
            }
        }
        return false;
    }

    draw() {
        if (!this.isTransitioning || !this.snapshot || !this.currentRoomSnapshot) return;

        // 1. Dibujar el snapshot de la habitación anterior
        this.ctx.save();
        let snapshotX = 0;
        let snapshotY = 0;
       
        switch (this.direction) {
            case 'right':
                snapshotX = this.transitionProgress;
                break;
            case 'left':
                snapshotX = -this.transitionProgress;
                break;
            case 'down':
                snapshotY = this.transitionProgress;
                break;
            case 'down2':
                //rect_x = 400;
                snapshotY = this.transitionProgress;
                break;
            case 'up':
                snapshotY = -this.transitionProgress;
                break;
            case 'up2':
                snapshotY = -this.transitionProgress;
                break;
        }

        this.ctx.drawImage(this.snapshot, snapshotX, snapshotY);
        
        //if (this.objects) {
        console.error("direction -->"+this.direction)
            draw_objects_trans(this.objects, snapshotX, snapshotY);
            draw_objects_trans(this.wall_objects, snapshotX, snapshotY)
            draw_objects_trans(this.enemys, snapshotX, snapshotY)

        //}
        
        this.ctx.restore();

        // 2. Dibujar la nueva habitación usando el snapshot limitado
        this.ctx.save();
        let translateX = 0;
        let translateY = 0;

        let rectx = 0;
        switch (this.direction) {
            case 'right':
                translateX = -this.VIEWPORT_WIDTH + this.transitionProgress;
                break;
            case 'left':
                rectx = 0;
                translateX = this.VIEWPORT_WIDTH - this.transitionProgress ;
                break;
            case 'down':
                translateY = -this.VIEWPORT_HEIGHT + this.transitionProgress;
                break;
            case 'up':
                translateY = this.VIEWPORT_HEIGHT - this.transitionProgress;
                break;
                case 'down2':
                    translateY = -this.VIEWPORT_HEIGHT + this.transitionProgress;
                    break;
                case 'up2':
                    translateY = this.VIEWPORT_HEIGHT - this.transitionProgress;
                    break;
        }
        
        this.ctx.translate(translateX, translateY);
        this.ctx.drawImage(this.currentRoomSnapshot, 0-rectx, 0);
        //todo, arreglar cuando las rooms son de diferentes tamaños
        let sourceX = 0 
        if(this.previousRoom.canvas.width > this.currentRoomSnapshot.width){
            if (this.direction =='left' || this.direction =='up2' ||this.direction =='down2' ){
                sourceX = 400;
                //console.error("caso1")
               
            }
            if (this.direction =='right'){
                sourceX = 0;
                //console.error("caso2")
            }
        }

        //cutre pero funciona.
        if ((this.direction =='right' || this.direction =='up2' || this.direction =='down2') && level.rooms[room_actual].double ){
            
            sourceX = -400
            //console.error("caso3")
        }
        //console.error(sourceX)


        draw_objects_trans(level.rooms[room_actual].objects, sourceX, 0)
        draw_objects_trans(level.rooms[room_actual].wall_objects, sourceX, 0)
        draw_objects_trans(level.rooms[room_actual].enemys, sourceX, 0,false)
        
        this.ctx.restore();
    }
}
  
  function draw_objects_trans(objects, x, y,move=true) {
      for (let i = 0; i < objects.length; i++) {
        if (move){
            objects[i].draw(x, y);
        }else{
            try{
                objects[i].draw_idle(x,y)
            }catch{
                //ignoramos el fallo
                alert("fallo")
            } 
        }
          
      }
  }

