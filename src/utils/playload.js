import Keys from "../consts";

const Payloads = {
    showGameOver: (scene, message, color) => {
        scene.ball.body.setVelocity(0, 0);
        scene.paddleLeft.body.setVelocity(0, 0);
        scene.paddleRight.body.setVelocity(0, 0);

        scene.gameOverText.setText(message);
        scene.gameOverText.setFill(color);
        scene.gameOverText.setVisible(true);
        scene.restartText.setVisible(true);
    },
    updateScore: (scene) => {
        scene.leftScoreText.setText(`Player: ${scene.leftScore}`);
        scene.rightScoreText.setText(`AI: ${scene.rightScore}`);
    },
    resetBall: (scene) => {
        // Reset position to center
        scene.ball.setPosition(Keys.game.width / 2, Keys.game.height / 2);

        // Reset speed
        scene.ballSpeed = Keys.game.ballSpeed;

        // Random initial direction
        const angle = (Phaser.Math.Between(-30, 30) * Math.PI) / 180;
        const direction = Math.random() > 0.5 ? 1 : -1;

        scene.ball.body.setVelocity(direction * scene.ballSpeed * Math.cos(angle), scene.ballSpeed * Math.sin(angle));
    },
};

export default Payloads;
