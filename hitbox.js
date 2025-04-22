class Hitbox {
    constructor(x, y, size_w,size_h,duration=false) {
        this.x = x;
        this.y = y;
        this.size_w = size_w;
        this.size_h = size_h;
        this.duration = duration;
        this.framecounter =0;
        this.active=true;
    }

    run() {
        if (!this.active) return;
        if (this.duration && (this.framecounter >= this.duration)) {
            this.active = false;
        }
        this.framecounter++
    }
}

