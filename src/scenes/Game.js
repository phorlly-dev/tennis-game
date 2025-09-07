import Instances from "../consts";
import Handles from "../utils/handle";
import Objects from "../utils/object";
import States from "../utils/state";
import Payloads from "../utils/playload";
import Controllers from "../utils/controller";

const { width, height, running, ballSpeed } = Instances.game;
class GameEngine extends Phaser.Scene {
    constructor() {
        super(Instances.scene.start);

        // Declare scene-level variables
        this.leftScore = 0;
        this.rightScore = 0;
        this.gameState = running;
        this.ballSpeed = ballSpeed;

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
        this.ballSpeed = ballSpeed;

        Handles.show({ id: Instances.control.ui });
    }

    create() {
        const { bg, left, right, ball } = Instances.image.key;
        // --- Background ---
        this.add.image(width / 2, height / 2, bg).setAlpha(0.2);

        // --- Center line ---
        const lineColor = 0x3498db;
        const lineStep = 30;
        for (let y = 0; y < height; y += lineStep) {
            this.add.rectangle(width / 2, y, 4, 15, lineColor, 0.3);
        }

        // --- Paddles & ball ---
        this.paddleLeft = Objects.paddle(this, 50, height / 2, left);
        this.paddleRight = Objects.paddle(this, width - 50, height / 2, right);
        this.ball = Objects.ball(this, width / 2, height / 2, ball);

        // --- Physics collisions ---
        this.physics.add.collider(this.ball, this.paddleLeft, this.handlePaddleHit, null, this);
        this.physics.add.collider(this.ball, this.paddleRight, this.handlePaddleHit, null, this);

        // --- Controls ---
        this.cursors = this.input.keyboard.createCursorKeys();

        // --- UI & controllers ---
        Objects.ui(this);
        Controllers.buttons(this);
        Controllers.toggleMute(this);
        Controllers.toggleControls(States.isTouchOrTablet(this));

        // --- Ball delay reset ---
        this.time.delayedCall(1600, () => Payloads.resetBall(this));

        // --- Background music ---
        this.sound.play(Instances.audio.key.playing, { loop: true, volume: 0.5 });
    }

    update() {
        if (this.gameState !== running) return;

        this.handleFrame();
    }

    // Frame handler: keep update() clean
    handleFrame() {
        Handles.player(this);
        Handles.ai(this);
        States.score(this);
        States.ball(this);
    }

    // Paddle-ball collision
    handlePaddleHit(ball, paddle) {
        States.hit(this, ball, paddle);
    }
}

export default GameEngine;
