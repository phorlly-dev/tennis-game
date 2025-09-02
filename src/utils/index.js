import Instances from "../consts";
import Fonts from "../consts/font";
import Handles from "./handle";
import Payloads from "./playload";

const Bases = {
    flashEffect(scene) {
        scene.cameras.main.flash(100, 255, 255, 255, false);
        return Handles.playSound(scene, Instances.audio.key.splash);
    },
    checkGameEnd(scene) {
        if (scene.leftScore >= Instances.game.maxScore) {
            scene.gameState = Instances.game.youWin;
            return Payloads.showGameOver(scene, "YOU WIN!", "#27ae60");
        } else if (scene.rightScore >= Instances.game.maxScore) {
            scene.gameState = Instances.game.botWin;
            return Payloads.showGameOver(scene, "AI WINS!", "#e74c3c");
        }
    },
    pauseGame(scene) {
        scene.gameState = Instances.game.paused;
        scene.physics.pause();
        scene.pauseText.setVisible(true);
        return Handles.playSound(scene, Instances.audio.key.pongBeep);
    },
    resumeGame(scene) {
        scene.gameState = Instances.game.running;
        scene.physics.resume();
        scene.pauseText.setVisible(false);
        return Handles.playSound(scene, Instances.audio.key.pongPlop);
    },
    restartGame(scene) {
        // Reset scores
        scene.leftScore = 0;
        scene.rightScore = 0;
        Payloads.setPlayerScore(scene.leftScore);
        Payloads.setBotScore(scene.rightScore);

        // Reset game state
        scene.gameState = Instances.game.running;

        // Hide UI elements
        scene.gameOverText.setVisible(false);
        scene.restartText.setVisible(false);
        scene.pauseText.setVisible(false);

        // Reset positions
        scene.paddleLeft.setPosition(50, Instances.game.height / 2);
        scene.paddleRight.setPosition(Instances.game.width - 50, Instances.game.height / 2);

        // Resume physics and reset ball
        scene.physics.resume();
        Payloads.resetBall(scene);
        return Handles.playSound(scene, Instances.audio.key.pongBeep);
    },
    text({ scene, x, y, title, style = {}, isVisible = true }) {
        const sty = { fontFamily: Fonts.courierNew, align: "center" };
        const txt = scene.add
            .text(x, y, title, { ...sty, ...style })
            .setOrigin(0.5)
            .setVisible(isVisible);

        return txt;
    },
    isMobile: () => /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || window.innerWidth < 768,
    getById: (id) => document.getElementById(id),
    moveUp: (element, vector) => element.body.setVelocityY(vector),
    moveDown: (element, vector) => element.body.setVelocityY(-vector),
    stop: (element) => element.body.setVelocityY(0),
};

export default Bases;
