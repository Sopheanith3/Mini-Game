let game;
function startGame() {
    game = new Game();
    game.start();
}

window.onload = startGame;