import Keys from "../consts";
import Payloads from "./playload";

const Bases = {
    flashEffect: (scene) => {
        scene.cameras.main.flash(100, 255, 255, 255, false);
        scene.sound.play(Keys.audio.key.splash, { volume: 0.5 });
    },
    checkGameEnd: (scene) => {
        if (scene.leftScore >= Keys.game.maxScore) {
            scene.gameState = Keys.game.youWin;
            Payloads.showGameOver(scene, "YOU WIN!", "#27ae60");
        } else if (scene.rightScore >= Keys.game.maxScore) {
            scene.gameState = Keys.game.botWin;
            Payloads.showGameOver(scene, "AI WINS!", "#e74c3c");
        }
    },
    pauseGame: (scene) => {
        scene.gameState = Keys.game.paused;
        scene.physics.pause();
        scene.pauseText.setVisible(true);
    },
    resumeGame: (scene) => {
        scene.gameState = Keys.game.running;
        scene.physics.resume();
        scene.pauseText.setVisible(false);
    },
    restartGame: (scene) => {
        // Reset scores
        scene.leftScore = 0;
        scene.rightScore = 0;
        Payloads.updateScore(scene);

        // Reset game state
        scene.gameState = Keys.game.running;

        // Hide UI elements
        scene.gameOverText.setVisible(false);
        scene.restartText.setVisible(false);
        scene.pauseText.setVisible(false);

        // Reset positions
        scene.paddleLeft.setPosition(50, Keys.game.height / 2);
        scene.paddleRight.setPosition(Keys.game.width - 50, Keys.game.height / 2);

        // Resume physics and reset ball
        scene.physics.resume();
        Payloads.resetBall(scene);
    },
};

export default Bases;
