class Proyectil {
    constructor(angle) {
        this.image = null, // Imagen del proyectil
        this.initial_x =null;
        this.initial_y =null;
        this.x = player.x+2;// Posición inicial del proyectil
        this.y = player.y-3;
        this.speed = player.bullet_speed  // Velocidad del proyectil
        this.vx = Math.cos(angle * Math.PI / 180) * this.speed; // Componente horizontal
        this.vy = Math.sin(angle * Math.PI / 180) * this.speed; // Componente vertical
        this.duration = player.rango; // Duración del proyectil
        this.angle = angle;
        this.delete = false;
        this.size_h=8;
        this.size_w=8;
        this.initiate();
    }

    initiate(){
        if (player.bullet_type == "arrow"){
            this.image = flecha;
        }
        if (player.bullet_type == 'fire'){
            this.image = fire_bullet
        }
        if (player.bullet_type == 'laser'){
            this.image = laser_bullet
        }

        if(player.up){
            this.initial_x =player.x-12;
            this.initial_y =player.y+12;
            this.x = this.initial_x
            this.y = this.initial_y
        }
        if(player.down){
            this.initial_x =player.x+6;
            this.initial_y =player.y-12;
            this.x = this.initial_x
            this.y = this.initial_y
        }
        if(player.left){
            this.initial_x =player.x-26;
            this.initial_y =player.y-6;
            this.x = this.initial_x
            this.y = this.initial_y
        }
        if(player.right){
            this.initial_x =player.x+20;
            this.initial_y =player.y-6;
            this.x = this.initial_x
            this.y = this.initial_y
        }



    }

    update_proyectil() {
        // Calcular la distancia recorrida desde la posición inicial
        const dx = this.x - this.initial_x;
        const dy = this.y - this.initial_y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance >= player.rango) {
            // Si ha recorrido la distancia máxima, detener el proyectil
            this.delete = true;
            return; // No actualizar posición si está detenido
        }

        // Actualizar posición del proyectil
        this.x += this.vx;
        this.y += this.vy;
    }


    draw() {
        ctx.save(); // Guardar el estado actual del ctxo
        
        ctx.translate(parseInt(-camera.x+this.x) + 8, parseInt(this.y) + 10); // Mover el ctxo al centro del proyectil
        ctx.rotate((Math.PI / 180) * (this.angle +90)); // Rotar el ctxo según el ángulo
        
        ctx.drawImage(this.image, -8, -10, 16, 20); // Dibujar la imagen centrada
        ctx.restore(); // Restaurar el estado del ctxo
    }
}
