import { audio, bot_win, height, max_score, paused, running, width, you_win } from "../consts";
import { orange, purple } from "../consts/color";
import { arial } from "../consts/font";
import { playSound } from "./handle";
import { resetBall, setBotScore, setPlayerScore, showGameOver } from "./playload";

const Bases = {
    flashEffect(scene) {
        scene.cameras.main.flash(100, 255, 255, 255, false);
        playSound(scene, audio.key.splash);
    },
    checkGameEnd(scene) {
        if (scene.leftScore >= max_score) {
            scene.gameState = you_win;
            showGameOver(scene, "YOU WIN!", purple.css);
        } else if (scene.rightScore >= max_score) {
            scene.gameState = bot_win;
            showGameOver(scene, "AI WINS!", orange.css);
        }
    },
    pauseGame(scene) {
        scene.gameState = paused;
        scene.physics.pause();
        scene.pauseText.setVisible(true);
        playSound(scene, audio.key.pong_beep);
    },
    resumeGame(scene) {
        scene.gameState = running;
        scene.physics.resume();
        scene.pauseText.setVisible(false);
        playSound(scene, audio.key.pong_plop);
    },
    restartGame(scene) {
        // Reset scores
        scene.leftScore = 0;
        scene.rightScore = 0;
        setPlayerScore(scene.leftScore);
        setBotScore(scene.rightScore);

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
        resetBall(scene);
        playSound(scene, audio.key.pong_beep);
    },
    text({ scene, x, y, title, style = {}, isVisible = true }) {
        const config = { fontFamily: arial, align: "center", fontWeight: "bold" };
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

export const {
    flashEffect,
    checkGameEnd,
    pauseGame,
    resumeGame,
    restartGame,
    text,
    isMobile,
    getById,
    moveUp,
    moveDown,
    stop,
} = Bases;
