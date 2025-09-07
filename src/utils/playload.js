import Bases from ".";
import Instances from "../consts";
import Handles from "./handle";

const { width, height, ballSpeed, running, paused, youWin, botWin } = Instances.game;
const Payloads = {
    showGameOver(scene, message, color) {
        scene.ball.body.setVelocity(0, 0);
        scene.paddleLeft.body.setVelocity(0, 0);
        scene.paddleRight.body.setVelocity(0, 0);

        scene.gameOverText.setText(message);
        scene.gameOverText.setFill(color);
        scene.gameOverText.setVisible(true);
        scene.restartText.setVisible(true);

        Handles.hide({ element: scene.pauseBtn });
        Handles.show({ element: scene.playBtn });
    },
    setBotScore: (score) => (Bases.getById("bot").textContent = score),
    setPlayerScore: (score) => (Bases.getById("player").textContent = score),
    resetBall(scene) {
        // Reset position to center
        scene.ball.setPosition(width / 2, height / 2);

        // Reset speed
        scene.ballSpeed = ballSpeed;

        // Random initial direction
        const angle = (Phaser.Math.Between(-30, 30) * Math.PI) / 180;
        const direction = Math.random() > 0.5 ? 1 : -1;

        scene.ball.body.setVelocity(direction * scene.ballSpeed * Math.cos(angle), scene.ballSpeed * Math.sin(angle));
    },
    togglePauseOrRestart(scene) {
        if (scene.gameState === running) {
            Handles.hide({ element: scene.pauseBtn });
            Handles.show({ element: scene.playBtn });
            Bases.pauseGame(scene);
        } else if (scene.gameState === paused) {
            Handles.show({ element: scene.pauseBtn });
            Handles.hide({ element: scene.playBtn });
            Bases.resumeGame(scene);
        } else if (scene.gameState === youWin || scene.gameState === botWin) {
            Handles.show({ element: scene.pauseBtn });
            Handles.hide({ element: scene.playBtn });
            Bases.restartGame(scene);
        }
    },
};

export default Payloads;
