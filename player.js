class Player {
    constructor(width, height, imageSrc, x, y) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.image = new Image();
        this.image.src = imageSrc;
        this.gravity = 0.05;
        this.gravitySpeed = 0;
        this.jumpStrength = -2;
    }

    update(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    updatePosition(canvasHeight) {
        this.gravitySpeed += this.gravity;
        this.y += this.gravitySpeed;
        if (this.y < 0) this.y = 0;
        if (this.y > canvasHeight - this.height - 140) {
            this.y = canvasHeight - this.height - 140;
            this.gravitySpeed = 0;
        }
    }

    jump() {
        this.gravitySpeed = this.jumpStrength;
    }

    crashWith(other) {
        return !(
            this.y + this.height < other.y ||
            this.y > other.y + other.height ||
            this.x + this.width < other.x ||
            this.x > other.x + other.width
        );
    }
}