class ObjectRoom{


    constructor(type,x,y,colision,destructible,hp,size=20,light = false,orientation = false) {
        console.log(type)
        this.type = type
        this.img = IMAGE_OBJECT[type];
        this.x= x;
        this.y = y;
        this.colision = TRABESABLE_OBJECT.indexOf(type) == -1 ?true :false;
        this.destructible = DESTRUCTIBLE_OBJECT.indexOf(type) == -1 ? false:true;
        this.hp = hp;
        this.size = size;
        this.size_w = IMAGE_OBJECT[type].width
        this.size_h = 32
        this.damaged = 0;
        this.light = light;
        this.drop =[];
        this.orientation = orientation;
        this.height = this.img.height
        this.delete = false;
    }

    update(){
        if (this.damaged > 0){
            this.damaged -= 1;
        }
        if (this.hp < 0){
            this.destroy();
        }
    }

    destroy(){
        this.delete = true;
        if (this.destructible){
            let iterations = parseInt(this.size/4)
            for (let i = 0; i < iterations; i++) {
                let vx = Math.random()*(player.bullet_speed/8);
                let vy = Math.random()*(player.bullet_speed/8);
                let image;
                let splat_img;
                if ( this.type == 1){
                let  img_pos = parseInt(Math.random()*jarron_parts.length)
                    image = jarron_parts[img_pos]
                    splat_img= jarron_splats[img_pos];
                }
                if (this.type ==21){
                    let  img_pos = parseInt(Math.random()*bidon_parts.length)
                    image = bidon_parts[img_pos]
                    splat_img= bidon_splats[img_pos];
                    do_explosion(this.x-this.size_w,this.y-this.size_h)
                    vx = Math.random()*(1)+0.5;
                    vy = Math.random()*(1)+0.5;
                }
                let particle = new Particle(image,splat_img,this.x+this.size_h/2,this.y+this.size_h/2,vx*3,vy*3)
                level.rooms[room_actual].particles.push(particle)
                
            }
        }
        //dropea items si tiene 
        for (let e = 0; e < this.drop.length; e++) {
            const drop_object = this.drop[e];
            drop_object.x = this.x;
            drop_object.y = this.y;
            level.rooms[room_actual].objects.push(drop_object);
        }
    }

    

    draw(correction_x = 0,correction_y = 0){

        ctx.save();   
        if (this.orientation){
            let rotation ;
            if (this.orientation == "down"){
                rotation = Math.PI
            }
            ctx.translate(this.x + this.img.width / 2, this.y + this.img.height / 2); // Centro de la puerta
            ctx.rotate(rotation); // Rotamos el canvas
           
            
        }

        if (this.light){
            console.warn(this.img.src)
             ctx.globalCompositeOperation = "color-dodge"; 
             ctx.drawImage(this.img,-camera.x+this.x+correction_x,this.y+correction_y)
             ctx.restore();   
            return
        }

            if (this.damaged > 0) {
             //ctx.globalCompositeOperation = "color-burn"; 
             ctx.filter= "brightness(100)"
            }
            let size_correction = this.height > 32 ? this.height-32:0
            ctx.drawImage(this.img,-camera.x+this.x+correction_x,this.y+correction_y-size_correction)
            ctx.restore();


    }
        


}