import Bases from ".";
import Keys from "../consts";
import Payloads from "./playload";

const States = {
    hit: (scene, ball, paddle) => {
        const hitPosition = (ball.y - paddle.y) / (paddle.height / 2);
        const bounceAngle = (hitPosition * Math.PI) / 4; // Max 45 degrees

        // Determine direction based on which paddle was hit
        const direction = paddle === scene.paddleLeft ? 1 : -1;

        // Increase speed slightly on each hit
        scene.ballSpeed = Math.min(scene.ballSpeed + 10, 500);

        // Set new velocity with angle
        ball.body.setVelocity(
            direction * scene.ballSpeed * Math.cos(bounceAngle),
            scene.ballSpeed * Math.sin(bounceAngle)
        );

        // Visual feedback
        Bases.flashEffect(scene);
    },
    ball: (scene) => {
        // Manual top/bottom bouncing since we disabled world bounds collision
        if (scene.ball.y <= 12) {
            scene.ball.y = 12;
            scene.ball.body.velocity.y = Math.abs(scene.ball.body.velocity.y);
            Bases.flashEffect(scene);
        } else if (scene.ball.y >= Keys.game.height - 12) {
            scene.ball.y = Keys.game.height - 12;
            scene.ball.body.velocity.y = -Math.abs(scene.ball.body.velocity.y);
            Bases.flashEffect(scene);
        }
    },
    score: (scene) => {
        // FIXED: Use screen boundaries for scoring, not paddle positions
        if (scene.ball.x < -20) {
            // Ball went past left side - AI scores
            scene.rightScore++;
            Payloads.updateScore(scene);
            Payloads.resetBall(scene);
            Bases.checkGameEnd(scene);
        } else if (scene.ball.x > Keys.game.width + 20) {
            // Ball went past right side - Player scores
            scene.leftScore++;
            Payloads.updateScore(scene);
            Payloads.resetBall(scene);
            Bases.checkGameEnd(scene);
        }
    },
};

export default States;
