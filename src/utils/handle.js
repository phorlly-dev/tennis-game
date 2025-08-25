import Keys from "../consts";

const Handles = {
    player: (scene) => {
        // Use physics velocity for smooth movement
        if (scene.cursors.up.isDown) {
            scene.paddleLeft.body.setVelocityY(-Keys.game.playerSpeed);
        } else if (scene.cursors.down.isDown) {
            scene.paddleLeft.body.setVelocityY(Keys.game.playerSpeed);
        } else {
            scene.paddleLeft.body.setVelocityY(0);
        }
    },
    ai: (scene) => {
        // Improved AI with smooth movement
        const ballY = scene.ball.y;
        const paddleY = scene.paddleRight.y;
        const diff = ballY - paddleY;
        const deadZone = 10; // Prevent jittering

        if (Math.abs(diff) > deadZone) {
            if (diff > 0) {
                scene.paddleRight.body.setVelocityY(Keys.game.botSpeed);
            } else {
                scene.paddleRight.body.setVelocityY(-Keys.game.botSpeed);
            }
        } else {
            scene.paddleRight.body.setVelocityY(0);
        }
    },
};

export default Handles;
