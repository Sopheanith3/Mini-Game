class Game {
    constructor() {
        this.canvas = document.createElement("canvas");
        this.canvas.width = 1400;
        this.canvas.height = 800;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(this.update.bind(this),6);
        this.obstacles = [];
        this.initEventListiners();
    }
    initEventListiners() {
        window.addEventListener('keydown', this.handleKeyDown.bind(this));
        window.addEventListener('keyup', this.handleKeyUp.bind(this));
        window.addEventListener('mousedown', this.handleKeyDown.bind(this));
        window.addEventListener('mouseup', this.handleMouseUp.bind(this));
    }
    handleKeyDown() {
        player.jump();
        player.accelerate(0.05);
    }
    handleKeyUp() {
        player.accelerate(0.05);
    }
    handleMouseDown() {
        player.jump();
        player.accelerate(0.05);
    }
    handleMouseUp() {
        player.accelerate(0.05);
    }
    clear() {
        this.context.clearReact(0,0, this.canvas.width, this.canvas.height);
    }
    stop() {
        clearInterval(this.interval);
    }
}