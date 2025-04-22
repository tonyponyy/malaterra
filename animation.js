class AnimationScene {
    constructor(img, x, y, w, h, speed, bucle = false) {
        this.img = img;
        this.n_frames = img.width / w;
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.speed = speed;
        this.bucle = bucle;
        this.active = true;
        this.actual_frame = 0;
        this.framecounter = 0;

        // Para contar repeticiones si bucle es un número
        this.repetitions = 0;
    }

    run() {
        if (!this.active) return;

        // Dibujar imagen
        ctx.drawImage(
            this.img,
            this.actual_frame * this.width,
            0,
            this.width,
            this.height,
            this.x - camera.x,
            this.y,
            this.width,
            this.height
        );

        this.framecounter++;

        if (this.framecounter % this.speed === 0) {
            this.actual_frame++;

            if (this.actual_frame >= this.n_frames) {
                this.actual_frame = 0;

                if (this.bucle === true) {
                } else if (typeof this.bucle === "number") {
                    this.repetitions++;
                    if (this.repetitions >= this.bucle) {
                        this.active = false;
                    }
                } else {
                    this.active = false;
                }
            }
        }
    }
}
