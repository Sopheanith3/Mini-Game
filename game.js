class Game {
    constructor() {
        this.canvas = document.createElement("canvas");
        this.canvas.width = 1400;
        this.canvas.height = 800;
        this.context = this.canvas.getContext("2d");
        this.frameNo = 0;
        this.obstacles = [];
        this.score = new TextComponent("30px", "Consolas", "black", 1200, 50);
        this.background = new BackgroundComponent(1400, 660, "assets/background2.jpg", 0, 0);
        this.land = new BackgroundComponent(1400, 150, "assets/land.png", 0, 650);
        this.gameOverImage = new ImageComponent(140, 140, "assets/gameover2.png", 600, 300);
        this.player = new Player(70, 70, "assets/bird1.png", 700, 245);
        this.isGameOver = false;
        this.gameStarted = false;
        
        // Add welcome text component
        this.welcomeText = new TextComponent("35px", "Consolas", "white", 410, 390);
        this.welcomeText.text = "WELCOME TO FLAPPY ANGRY BIRD";
        
        // Move start text down a bit to make room for welcome text
        this.startText = new TextComponent("30px", "Consolas", "white", 500, 450);
        this.startText.text = "PRESS ANY KEY TO START";
    }

    start() {
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.setupEventListeners();
        this.showStartScreen();
    }

    setupEventListeners() {
        const startGameHandler = (e) => {
            if (!this.gameStarted) {
                this.gameStarted = true;
                this.interval = setInterval(() => this.updateGameArea(), 6);
                window.removeEventListener('keydown', startGameHandler);
                window.removeEventListener('mousedown', startGameHandler);
            }
        };

        const gameplayHandler = (e) => {
            if (this.gameStarted && !this.isGameOver) {
                this.player.jump();
            }
        };

        window.addEventListener('keydown', (e) => {
            startGameHandler(e);
            gameplayHandler(e);
        });
        window.addEventListener('mousedown', (e) => {
            startGameHandler(e);
            gameplayHandler(e);
        });
    }

    showStartScreen() {
        this.clear();
        this.background.update(this.context);
        this.land.update(this.context);
        this.player.update(this.context);
        
        // Add semi-transparent overlay
        this.context.fillStyle = "rgba(0, 0, 0, 0.5)";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw both welcome and start texts
        this.welcomeText.update(this.context);
        this.startText.update(this.context);
    }

    stop() {
        clearInterval(this.interval);
        this.isGameOver = true;
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    updateGameArea() {
        if (this.checkCollision()) {
            this.gameOverImage.update(this.context);
            this.stop();
            return;
        }

        this.clear();
        this.updateBackground();
        this.frameNo++;
        this.createObstacles();
        this.updateObstacles();
        this.player.updatePosition(this.canvas.height);
        this.player.update(this.context);
        this.score.text = "SCORE: " + Math.floor(this.frameNo / 20);
        this.score.update(this.context);
    }

    checkCollision() {
        return this.obstacles.some(obstacle => this.player.crashWith(obstacle));
    }

    updateBackground() {
        this.background.speedX = -1;
        this.background.updatePosition();
        this.background.update(this.context);
    
        this.land.speedX = -1;
        this.land.updatePosition();
        this.land.update(this.context);
    }

    createObstacles() {
        if (this.frameNo === 2 || this.everyInterval(300)) {
            const x = this.canvas.width;
            const height = Math.floor(Math.random() * (300 - 40 + 1) + 40);
            const gap = Math.floor(Math.random() * (300 - 170 + 1) + 170);

            this.obstacles.push(new ImageComponent(60, height, "assets/pp.png", x, 0));
            this.obstacles.push(new ImageComponent(70, 25, "assets/head.png", x - 5, height));
            this.obstacles.push(new ImageComponent(70, 25, "assets/head.png", x - 5, height + gap));
            this.obstacles.push(new ImageComponent(60, this.canvas.height - height - gap - 150 - 25, "assets/pp.png", x, height + gap + 25));
        }
    }

    updateObstacles() {
        this.obstacles.forEach(obstacle => {
            obstacle.x -= 1;
            obstacle.update(this.context);
        });
    }

    everyInterval(n) {
        return (this.frameNo / n) % 1 === 0;
    }
}

class TextComponent {
    constructor(fontSize, font, color, x, y) {
        this.fontSize = fontSize;
        this.font = font;
        this.color = color;
        this.x = x;
        this.y = y;
        this.text = "";
    }

    update(ctx) {
        ctx.font = `${this.fontSize} ${this.font}`;
        ctx.fillStyle = this.color;
        ctx.fillText(this.text, this.x, this.y);
    }
}

class ImageComponent {
    constructor(width, height, imageSrc, x, y) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.image = new Image();
        this.image.src = imageSrc;
    }

    update(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

class BackgroundComponent extends ImageComponent {
    constructor(width, height, imageSrc, x, y) {
        super(width, height, imageSrc, x, y);
        this.speedX = 0;
        this.initialX = x;  // Store initial X position
    }

    updatePosition() {
        this.x += this.speedX;
        
        // Reset position when it moves out by the image width
        if (this.x <= -this.width) {
            this.x = 0;
        }
    }

    update(ctx) {
        // Draw the current image
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        
        // Draw the second image right after the first one
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }
}