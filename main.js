class Main {
    constructor() {
        this.gameArea = new Game();
        this.player = new Player();
        this.score = new Score();
        this.gameOver = new GameOver();
        this.background = new GameComponent(1400, 660, "img/background.png", 0, 0, "background");
        this.ground = new GameComponent(400, 150, "img/land.png", 0, 650, "land");
        this.initGameLoop();
    }

    initGameLoop() {
        setInterval(() => this.updateGame(), 6);
    }

    updateGame() {
        this.gameArea.clear();
        this.background.move(-1);
        this.background.update();
        this.ground.move(-1);
        this.ground.update();
        this.player.update();
        this.score.update(`SCORE: ${Math.floor(this.gameArea.frameNo / 20)}`);
    }
}

const game = new Main();
