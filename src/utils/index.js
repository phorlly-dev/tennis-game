import Instances from "../consts";
import Colors from "../consts/color";
import Fonts from "../consts/font";
import Handles from "./handle";
import Payloads from "./playload";

const { splash, pongBeep, pongPlop } = Instances.audio.key;
const { running, maxScore, youWin, botWin, paused, width, height } = Instances.game;
const Bases = {
    flashEffect(scene) {
        scene.cameras.main.flash(100, 255, 255, 255, false);
        Handles.playSound(scene, splash);
    },
    checkGameEnd(scene) {
        if (scene.leftScore >= maxScore) {
            scene.gameState = youWin;
            Payloads.showGameOver(scene, "YOU WIN!", Colors.purple.css);
        } else if (scene.rightScore >= maxScore) {
            scene.gameState = botWin;
            Payloads.showGameOver(scene, "AI WINS!", Colors.orange.css);
        }
    },
    pauseGame(scene) {
        scene.gameState = paused;
        scene.physics.pause();
        scene.pauseText.setVisible(true);
        Handles.playSound(scene, pongBeep);
    },
    resumeGame(scene) {
        scene.gameState = running;
        scene.physics.resume();
        scene.pauseText.setVisible(false);
        Handles.playSound(scene, pongPlop);
    },
    restartGame(scene) {
        // Reset scores
        scene.leftScore = 0;
        scene.rightScore = 0;
        Payloads.setPlayerScore(scene.leftScore);
        Payloads.setBotScore(scene.rightScore);

        // Reset game state
        scene.gameState = running;

        // Hide UI elements
        scene.gameOverText.setVisible(false);
        scene.restartText.setVisible(false);
        scene.pauseText.setVisible(false);

        // Reset positions
        scene.paddleLeft.setPosition(50, height / 2);
        scene.paddleRight.setPosition(width - 50, height / 2);

        // Resume physics and reset ball
        scene.physics.resume();
        Payloads.resetBall(scene);
        Handles.playSound(scene, pongBeep);
    },
    text({ scene, x, y, title, style = {}, isVisible = true }) {
        const config = { fontFamily: Fonts.arial, align: "center", fontWeight: "bold" };
        const txt = scene.add
            .text(x, y, title, { ...config, ...style })
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
