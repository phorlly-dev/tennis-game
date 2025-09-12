import { checkGameEnd, flashEffect } from ".";
import { height, width } from "../consts";
import { resetBall, setBotScore, setPlayerScore } from "./playload";

const States = {
    handleHit(scene, ball, paddle) {
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
        flashEffect(scene);
    },
    ballHandler(scene) {
        // Manual top/bottom bouncing since we disabled world bounds collision
        if (scene.ball.y <= 12) {
            scene.ball.y = 12;
            scene.ball.body.velocity.y = Math.abs(scene.ball.body.velocity.y);
            flashEffect(scene);
        } else if (scene.ball.y >= height - 12) {
            scene.ball.y = height - 12;
            scene.ball.body.velocity.y = -Math.abs(scene.ball.body.velocity.y);
            flashEffect(scene);
        }
    },
    scoreHandler(scene) {
        // FIXED: Use screen boundaries for scoring, not paddle positions
        if (scene.ball.x < -20) {
            // Ball went past left side - AI scores
            scene.rightScore++;
            setBotScore(scene.rightScore);
            resetBall(scene);
            checkGameEnd(scene);
        } else if (scene.ball.x > width + 20) {
            // Ball went past right side - Player scores
            scene.leftScore++;
            setPlayerScore(scene.leftScore);
            resetBall(scene);
            checkGameEnd(scene);
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

export const { handleHit, ballHandler, scoreHandler, isTouchOrTablet } = States;
