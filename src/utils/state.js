import Bases from ".";
import Instances from "../consts";
import Payloads from "./playload";

const { width, height } = Instances.game;
const States = {
    hit(scene, ball, paddle) {
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
    ball(scene) {
        // Manual top/bottom bouncing since we disabled world bounds collision
        if (scene.ball.y <= 12) {
            scene.ball.y = 12;
            scene.ball.body.velocity.y = Math.abs(scene.ball.body.velocity.y);
            Bases.flashEffect(scene);
        } else if (scene.ball.y >= height - 12) {
            scene.ball.y = height - 12;
            scene.ball.body.velocity.y = -Math.abs(scene.ball.body.velocity.y);
            Bases.flashEffect(scene);
        }
    },
    score(scene) {
        // FIXED: Use screen boundaries for scoring, not paddle positions
        if (scene.ball.x < -20) {
            // Ball went past left side - AI scores
            scene.rightScore++;
            Payloads.setBotScore(scene.rightScore);
            Payloads.resetBall(scene);
            Bases.checkGameEnd(scene);
        } else if (scene.ball.x > width + 20) {
            // Ball went past right side - Player scores
            scene.leftScore++;
            Payloads.setPlayerScore(scene.leftScore);
            Payloads.resetBall(scene);
            Bases.checkGameEnd(scene);
        }
    },
    isTouchOrTablet(scene) {
        const ua = navigator.userAgent.toLowerCase();

        const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;

        const isTabletUA = /ipad|android(?!.*mobile)|tablet/.test(ua);

        const isSmallScreen = window.innerWidth <= 1280; // treat tablets as touch devices

        const android = scene.sys.game.device.os.android;
        const iOS = scene.sys.game.device.os.iOS;
        const iPad = scene.sys.game.device.os.iPad;
        const iPhone = scene.sys.game.device.os.iPhone;

        return hasTouch && (isTabletUA || isSmallScreen) && (android || iOS || iPad || iPhone);
    },
};

export default States;
