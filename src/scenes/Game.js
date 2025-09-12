import { audio, ball_speed, height, image, running, start, ui, width } from "../consts";
import { makeButtons, toggleControls, toggleMute } from "../utils/controller";
import { botMove, playerMove, show } from "../utils/handle";
import { makeBall, makePaddle, makePauseText } from "../utils/object";
import { resetBall } from "../utils/playload";
import { ballHandler, handleHit, isTouchOrTablet, scoreHandler } from "../utils/state";

class GameEngine extends Phaser.Scene {
    constructor() {
        super(start);

        // Declare scene-level variables
        this.leftScore = 0;
        this.rightScore = 0;
        this.gameState = running;
        this.ballSpeed = ball_speed;

        this.paddleLeft = null;
        this.paddleRight = null;
        this.ball = null;
        this.cursors = null;
        this.upBtn = null;
        this.downBtn = null;
        this.playBtn = null;
        this.pauseBtn = null;
        this.gameOverText = null;
        this.restartText = null;
        this.pauseText = null;
        this.onBtn = null;
        this.offBtn = null;
        this.isUp = false;
        this.isDown = false;
    }

    init() {
        // Reset state every time the scene starts
        this.leftScore = 0;
        this.rightScore = 0;
        this.gameState = running;
        this.ballSpeed = ball_speed;

        show({ id: ui });
    }

    create() {
        const { bg, left, right, ball } = image.key;
        // --- Background ---
        this.add.image(width / 2, height / 2, bg).setAlpha(0.2);

        // --- Center line ---
        const lineColor = 0x3498db;
        const lineStep = 30;
        for (let y = 0; y < height; y += lineStep) {
            this.add.rectangle(width / 2, y, 4, 15, lineColor, 0.3);
        }

        // --- Paddles & ball ---
        this.paddleLeft = makePaddle(this, 50, height / 2, left);
        this.paddleRight = makePaddle(this, width - 50, height / 2, right);
        this.ball = makeBall(this, width / 2, height / 2, ball);

        // --- Physics collisions ---
        this.physics.add.collider(this.ball, this.paddleLeft, this.handlePaddleHit, null, this);
        this.physics.add.collider(this.ball, this.paddleRight, this.handlePaddleHit, null, this);

        // --- Controls ---
        this.cursors = this.input.keyboard.createCursorKeys();

        // --- UI & controllers ---
        makePauseText(this);
        makeButtons(this);
        toggleMute(this);
        toggleControls(isTouchOrTablet(this));

        // --- Ball delay reset ---
        this.time.delayedCall(1600, () => resetBall(this));

        // --- Background music ---
        this.sound.play(audio.key.playing, { loop: true, volume: 0.5 });
    }

    update() {
        if (this.gameState !== running) return;

        this.handleFrame();
    }

    // Frame handler: keep update() clean
    handleFrame() {
        playerMove(this);
        botMove(this);
        scoreHandler(this);
        ballHandler(this);
    }

    // Paddle-ball collision
    handlePaddleHit(ball, paddle) {
        handleHit(this, ball, paddle);
    }
}

export default GameEngine;
