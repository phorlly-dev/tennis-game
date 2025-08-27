import Bases from ".";
import Instances from "../consts";

const Payloads = {
    showGameOver: (scene, message, color) => {
        scene.ball.body.setVelocity(0, 0);
        scene.paddleLeft.body.setVelocity(0, 0);
        scene.paddleRight.body.setVelocity(0, 0);

        scene.gameOverText.setText(message);
        scene.gameOverText.setFill(color);
        scene.gameOverText.setVisible(true);
        scene.restartText.setVisible(true);

        scene.pauseBtn.style.display = "none";
        scene.playBtn.style.display = "block";
    },
    updateScore: (scene) => {
        scene.leftScoreText.setText(`Player: ${scene.leftScore}`);
        scene.rightScoreText.setText(`AI: ${scene.rightScore}`);
    },
    resetBall: (scene) => {
        // Reset position to center
        scene.ball.setPosition(Instances.game.width / 2, Instances.game.height / 2);

        // Reset speed
        scene.ballSpeed = Instances.game.ballSpeed;

        // Random initial direction
        const angle = (Phaser.Math.Between(-30, 30) * Math.PI) / 180;
        const direction = Math.random() > 0.5 ? 1 : -1;

        scene.ball.body.setVelocity(direction * scene.ballSpeed * Math.cos(angle), scene.ballSpeed * Math.sin(angle));
    },
    togglePauseOrRestart: (scene) => {
        if (scene.gameState === Instances.game.running) {
            scene.pauseBtn.style.display = "none";
            scene.playBtn.style.display = "block";
            Bases.pauseGame(scene);
        } else if (scene.gameState === Instances.game.paused) {
            scene.pauseBtn.style.display = "block";
            scene.playBtn.style.display = "none";
            Bases.resumeGame(scene);
        } else if (scene.gameState === Instances.game.youWin || scene.gameState === Instances.game.botWin) {
            scene.pauseBtn.style.display = "block";
            scene.playBtn.style.display = "none";
            Bases.restartGame(scene);
        }
    },
};

export default Payloads;
