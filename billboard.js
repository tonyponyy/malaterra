class Billboard {
    constructor(img, x, y, duration, flicker = false, speed = 12) {
        this.img = img;
        this.x = x;
        this.y = y;
        this.duration = duration;
        this.flicker = flicker;
        this.speed = speed;
        this.active = true;
        this.framecounter = 0;
    }

    run() {
        if (!this.active) return;
        const visible = !this.flicker || Math.floor(this.framecounter / this.speed) % 2 === 0;

        if (visible) {
            ctx.drawImage(
                this.img,
                this.x - camera.x,
                this.y
            );
        }
        this.framecounter++;

        if (this.framecounter >= this.duration) {
            this.active = false;
        }
    }
}

