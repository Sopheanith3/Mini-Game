class Player extends GameComponent {
    constructor() {
        super(70,70, "./assets/bird1.png", 700, 245, "image");
    }
    jump() {
        this.gravitySpeed = -2;
    }
    accelerate(speed) {
        this.gravity = speed;
    }
}