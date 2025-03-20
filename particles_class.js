class Particle{

    constructor(img,splat_img,x,y,vx,vy) {
        this.type = type
        this.img = img;
        this.splat_img = splat_img;
        this.x= x;
        this.y = y;
        this.vx = vx ;
        this.vy = vy;
        this.initial_vx = vx;
        this.initial_vy = vy;
        this.rotation =Math.atan2(vy,vx)
        this.size = this.img.width
        this.size_w =  this.size
        this.size_h =  this.size
        this.height =  this.size
        this.active = true;
        this.colision_frames = 0;
    }

    update(){
        if (!this.active){return};
        if (check_all_colisions(this,this.vx,this.vy)){
           this.colision_frames ++ 
           if (this.colision_frames > 5){
            anti_stuck(this)
           }
           if (this.colision_frames > 6){
            // si es mayor de 6 es que el stuck no ha hecho efecto, es mejor deshabilitar la particula
            // antes de que se vaya de madre haciendo demasiados calculos con el antistuck
            this.end();
           }
           this.vx = -this.vx
           this.vy = -this.vy
           this.rotation =Math.atan2(this.vy,this.vx)
        }else{
            this.colision_frames = 0;
        }
        //aplicar friccion
        let air_friction = 0.044;
        let min_vel_range = 0.1;
        if (this.vx > 0){
            this.vx -=air_friction;
        }
        if (this.vx < 0){
            this.vx +=air_friction;
        }
        if (this.vy > 0){
            this.vy -=air_friction;
        }
        if (this.vy < 0){
            this.vy +=air_friction;
        }
        if (this.vx > -min_vel_range && this.vx< min_vel_range &&
            this.vy > -min_vel_range && this.vx< min_vel_range
        ){
            this.end()
        }

        this.x +=this.vx;
        this.y +=this.vy
    }

    end(){
        if (chance(20)){
            print_splat(this.splat_img,this.x,this.y)
        }
       
        this.active = false;
    }

    draw(correction_x = 0, correction_y = 0) {
        if (this.active) {
            // Calculamos la velocidad actual y la proporción respecto a la velocidad inicial
            const currentSpeed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
            const initialSpeed = Math.sqrt(this.initial_vx * this.initial_vx + this.initial_vy * this.initial_vy);
            const speedRatio = currentSpeed / initialSpeed;
            
            // Calculamos la elevación basada en la velocidad (máximo 30 píxeles)
            const maxElevation = 30;
            const elevation = Math.round(speedRatio * maxElevation);
            
            // Dibujamos la sombra
            ctx.save();
            ctx.translate(parseInt(-camera.x + this.x) + 8, parseInt(this.y) + 10);
            
            // Configuramos la sombra (más pequeña cuanto más elevado esté)
            const shadowScale = 1 - (elevation / (maxElevation * 2));
            ctx.fillStyle = 'rgba(0, 0, 0, 1)';
            ctx.beginPath();
            ctx.ellipse(0, 0, this.img.width/2 * shadowScale, this.img.height/4 * shadowScale, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
            
            // Dibujamos el objeto elevado
            ctx.save();
            ctx.translate(parseInt(-camera.x + this.x) + 8, parseInt(this.y) + 10 - elevation);
            ctx.rotate(this.rotation);
            
            ctx.drawImage(
                this.img,
                parseInt(-this.img.width / 2),
                parseInt(-this.img.height / 2),
                this.img.width,
                this.img.height
            );
            ctx.restore();
        }
    }
}