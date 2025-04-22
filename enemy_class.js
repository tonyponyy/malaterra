class Enemy{


    constructor(type_enemy, x,y,boss=false) {
        this.type_enemy = type_enemy;
        this.img = IMAGE_ENEMY[type_enemy];
        this.splat_img = SPLAT_IMAGE_ENEMY[type_enemy]
        this.x = x;
        this.y = y;
        this.hp = HP_ENEMY[type_enemy];
        this.hp_initial =HP_ENEMY[type_enemy];
        this.tile = 0;
        this.speed = SPEED_ENEMY[type_enemy]
        this.vx = 0;
        this.vy = 0;
        this.boss = boss
        this.width = this.img.height;
        this.height = this.img.height;
        this.peso = 100;
        this.size = IMAGE_ENEMY[type_enemy].width/9;
        this.size_w = IMAGE_ENEMY[type_enemy].width/9;
        this.size_h = this.size_w
        this.show_hp = this.size_w >=192 ? true:false;
        this.damaged = 0;
        //nos devuelve un numero aleatorio para que se anime en un momento
        //diferente que otro enemigo.
        this.paint_r = parseInt(Math.random()*100)
       
        //para amanejar las colisiones y antistuck
        this.frame_stuck = 0;
        this.colision_with_wall = false;
        this.colision_with_object = false;
        this.velocity_animation = random(12,8)
    }

    draw() {
        let velocidad_minima = 0.4;
        let frame = 0;
        let scaleX = 1;
    
        if (Math.abs(this.vx) > velocidad_minima || Math.abs(this.vy) > velocidad_minima) {
            // Movimiento
            let velocity_frame = parseInt(frame_counter / this.velocity_animation);
    
            // Determina el frame según la dirección del movimiento
            if (Math.abs(this.vx) > Math.abs(this.vy)) {
                frame = (velocity_frame+this.paint_r) % 3;
                if (this.vx > 0) {
                    scaleX = 1;
                } else {
                    scaleX = -1;
                }
            } else if (this.vy < 0) {
                frame = 6 + ((velocity_frame+this.paint_r) % 3);
            } else if (this.vy > 0) {
                frame = 3 + ((velocity_frame+this.paint_r) % 3);
            }
    
            const spriteX = frame * this.width;
            const spriteY = 0;
    
            ctx.save();
            
            if (this.damaged > 0 && this.size_h< 192) {
                //ponemos lo de que no se ponga en blanco si es 192 o mas grande porque el sprite es
                //muy grande y podemos morir de epilepsia
                 ctx.filter= "brightness(100)"
            }
    
            // Usamos setTransform para manejar el escalado y la posición
            if (!transition_m.isTransitioning) {
            ctx.setTransform(
                scaleX,                          // Escala X
                0,                               // Skew horizontal
                0,                               // Skew vertical
                1,                               // Escala Y
                parseInt(this.x) - camera.x + (scaleX === -1 ? this.width : 0), // Posición X
                parseInt(this.y)                 // Posición Y
            );
            }
            if (!transition_m.isTransitioning) {
            ctx.drawImage(
                this.img,
                spriteX,
                spriteY,
                this.width,
                this.height,
                0,          // Usamos 0 porque la posición ya está en setTransform
                0,          // Usamos 0 porque la posición ya está en setTransform
                this.width,
                this.height
            );
            }else{
                ctx.drawImage(
                    this.img,
                    spriteX,
                    spriteY,
                    this.width,
                    this.height,
                    this.x_to_draw,          // Usamos 0 porque la posición ya está en setTransform
                    this.y,          // Usamos 0 porque la posición ya está en setTransform
                    this.width,
                    this.height)

            }
    
            ctx.restore();
        } else {
            // Animación de idle
            ctx.drawImage(
                this.img,
                5 * this.width,
                0,
                this.width,
                this.height,
                -camera.x + parseInt(this.x),
                parseInt(this.y),
                this.width,
                this.height
            );
        }
    
        // Dibujo de la barra de vida (sin cambios)
        if (this.show_hp) {
            let life_perc = (this.hp/this.hp_initial)*100;
            let x_to_draw = parseInt((canvas.width/2)-50);
            let y_to_draw = 10;
            
            ctx.fillStyle = '#222034';
            ctx.fillRect(x_to_draw, y_to_draw, 100, 20);
            
            ctx.fillStyle = '#ac3232';
            ctx.fillRect(x_to_draw, y_to_draw, life_perc, 20);
            
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 1;        
            ctx.strokeRect(x_to_draw+0.5, y_to_draw+0.5, 100, 20);
            
            ctx.drawImage(skull_img, x_to_draw-16, y_to_draw-6);
        }
    }
    update() {
        
       
        // Limitar velocidad
        this.vx = Math.max(-this.speed, Math.min(this.vx, this.speed));
        this.vy = Math.max(-this.speed, Math.min(this.vy, this.speed));
        
        // Guardar posición anterior
    

        this.movement_blocker();
        
        // Actualizar posición
        if (!check_all_colisions(this,this.vx,this.vy)){
            this.x += this.vx;
            this.y += this.vy;
        }else{
            this.vx = -this.vx;
            this.vy = -this.vy;
        }
        
        
        // Verificar colisiones
        let collision = false;
        
        if (colision_wall({x:this.x,y:this.y,size_h:this.size_h+this.size_h/2,size_w:this.size_w+this.size_w/2})) {
            this.colision_with_wall = true;
            collision = true;
        } else {
            this.colision_with_wall = false;
        }
        
        if (this.colision_object()) {
            this.colision_with_object = true;
            collision = true;
        } else {
            this.colision_with_object = false;
        }
        
        // Manejar colisiones
        if (collision) {
            this.colision_do();
        } else {
            // Resetear contador de stuck si no hay colisión
            this.frame_stuck = 0;
            
        }
        // Manejar daño
        if (this.damaged > 0) {
            this.damaged -= 1;
        }
    }

    draw_idle(x,y){
        ctx.drawImage(
            this.img,
            5 * this.width,
            0,
            this.width,
            this.height,
            -camera.x+ parseInt(this.x)+x,
            parseInt(this.y)+y,
            this.width,
            this.height
        );
        //ctx.drawImage(this.img,-camera.x+this.x+correction_x,this.y+correction_y-size_correction)

    }

    colision_object(){
        for (let e = 0; e < level.rooms[room_actual].objects.length; e++) {
            let object = level.rooms[room_actual].objects[e]
                if (object.colision && colision_detect(object,this)){
                    this.colision_do();
                    return true;
                }
            }
            return false;
    }

    movement_slime(){
     //   this.x += this.vx;
     //   this.y += this.vy;
    }
    movement_blocker(){
        let speed = this.speed/60
        if(this.x < player.x){
            this.vx +=speed
        }
        if(this.x > player.x){
            this.vx -=speed
        }
        if(this.y < player.y){
            this.vy +=speed
        }
        if(this.y > player.y){
            this.vy -=speed
        }
    }


    colision_do(){
        this.frame_stuck++
        if (this.frame_stuck >5){
            anti_stuck(this)
            if(this.frame_stuck > 200){
                //alert("mondongo")
                this.hp = -1;
            }
        }
       
        this.vx = -this.vx
        this.vy = -this.vy
    }

    damage_distance(disparo){
        let critical = chance(player.critico)
        
        if (player.gore || critical){
            print_splat(this.splat_img,this.x+this.size_h/2,this.y+this.size_w/2)
        }
        if (!critical){
            this.hp -= player.damage_distance;
        }else{
            let billboard_scene = new Billboard(critical_img,this.x,this.y,60)
            if (player.critical_explosion){
                do_explosion(this.x-this.size_w/2,this.y-this.size_h/2)
            }
            level.rooms[room_actual].billboards.push(billboard_scene)
            this.hp -= player.damage_distance*3;
        }
        
        this.vx += disparo.vx/ this.peso
        this.vx += disparo.vx/ this.peso

    }
    damage(){
        this.hp -= player.damage;
    }
    other_damage(n){
        let critical = chance(player.critico)
        if (player.gore || critical){
            print_splat(this.splat_img,this.x+this.size_h/2,this.y+this.size_w/2)
        }
        if (!critical){
            this.hp -= n;
        }else{
            let billboard_scene = new Billboard(critical_img,this.x,this.y,60)
            if (player.critical_explosion){
                do_explosion(this.x-this.size_w/2,this.y-this.size_h/2)
            }
            level.rooms[room_actual].billboards.push(billboard_scene)
            this.hp -= n*3;
        }

    }

    death(){
        let iterations = parseInt(this.size/4)
        for (let i = 0; i < iterations; i++) {
            let vx = Math.random()*(player.bullet_speed/4);
            let vy = Math.random()*(player.bullet_speed/4);
            let image = PART_IMG[this.type_enemy];
            let splat_img = SPLAT_IMAGE_ENEMY[this.type_enemy];
            let particle = new Particle(image,splat_img,this.x+this.size_h/2,this.y+this.size_h/2,vx*3,vy*3)
            level.rooms[room_actual].particles.push(particle)
        }
    }




}