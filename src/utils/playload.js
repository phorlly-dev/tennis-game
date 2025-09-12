import { getById, pauseGame, restartGame, resumeGame } from ".";
import { ball_speed, bot_win, height, paused, running, width, you_win } from "../consts";
import { hide, show } from "./handle";

const Payloads = {
    showGameOver(scene, message, color) {
        scene.ball.body.setVelocity(0, 0);
        scene.paddleLeft.body.setVelocity(0, 0);
        scene.paddleRight.body.setVelocity(0, 0);

        scene.gameOverText.setText(message);
        scene.gameOverText.setFill(color);
        scene.gameOverText.setVisible(true);
        scene.restartText.setVisible(true);

        hide({ element: scene.pauseBtn });
        show({ element: scene.playBtn });
    },
    setBotScore: (score) => (getById("bot").textContent = score),
    setPlayerScore: (score) => (getById("player").textContent = score),
    resetBall(scene) {
        // Reset position to center
        scene.ball.setPosition(width / 2, height / 2);

        // Reset speed
        scene.ballSpeed = ball_speed;

        // Random initial direction
        const angle = (Phaser.Math.Between(-30, 30) * Math.PI) / 180;
        const direction = Math.random() > 0.5 ? 1 : -1;

        scene.ball.body.setVelocity(direction * scene.ballSpeed * Math.cos(angle), scene.ballSpeed * Math.sin(angle));
    },
    togglePauseOrRestart(scene) {
        if (scene.gameState === running) {
            hide({ element: scene.pauseBtn });
            show({ element: scene.playBtn });
            pauseGame(scene);
        } else if (scene.gameState === paused) {
            show({ element: scene.pauseBtn });
            hide({ element: scene.playBtn });
            resumeGame(scene);
        } else if (scene.gameState === you_win || scene.gameState === bot_win) {
            show({ element: scene.pauseBtn });
            hide({ element: scene.playBtn });
            restartGame(scene);
        }
    },
};

export const { showGameOver, setBotScore, setPlayerScore, resetBall, togglePauseOrRestart } = Payloads;
