import Keys from "../consts";
import Bases from "../utils";
import Handles from "../utils/handle";
import Objects from "../utils/object";
import States from "../utils/state";
import Payloads from "../utils/playload";

class MyGame extends Phaser.Scene {
    constructor() {
        super(Keys.scene.start);
    }

    init() {
        this.gameState = Keys.game.running;
        this.leftScore = 0;
        this.rightScore = 0;
        this.ballSpeed = Keys.game.ballSpeed;
    }

    create() {
        // // Create background
        this.add.rectangle(Keys.game.width / 2, Keys.game.height / 2, Keys.game.width, Keys.game.height, 0x1a252f);

        // Create center line
        for (let i = 0; i < Keys.game.height; i += 30) {
            this.add.rectangle(Keys.game.width / 2, i, 4, 15, 0x3498db, 0.3);
        }

        // Create paddles & ball
        this.paddleLeft = Objects.paddle(this, 50, Keys.game.height / 2, Keys.image.key.left);
        this.paddleRight = Objects.paddle(this, Keys.game.width - 50, Keys.game.height / 2, Keys.image.key.right);
        this.ball = Objects.ball(this, Keys.game.width / 2, Keys.game.height / 2, Keys.image.key.ball);

        // Set up paddle-ball collisions
        this.physics.add.collider(this.ball, this.paddleLeft, this.handlePaddleHit, null, this);
        this.physics.add.collider(this.ball, this.paddleRight, this.handlePaddleHit, null, this);

        // Create controls
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Display text
        Objects.ui(this);

        // Delayed ball reset
        this.time.delayedCall(1500, () => Payloads.resetBall(this), [], this);
    }

    update() {
        // Handle pause/restart
        if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
            this.sound.play(Keys.audio.key.pongBeep, { volume: 0.5 });
            this.handleSpaceKey();
        }

        if (this.gameState !== Keys.game.running) return;

        this.handler();
    }

    handleSpaceKey() {
        if (this.gameState === Keys.game.running) {
            Bases.pauseGame(this);
        } else if (this.gameState === Keys.game.paused) {
            Bases.resumeGame(this);
        } else if (this.gameState === Keys.game.youWin || this.gameState === Keys.game.botWin) {
            Bases.restartGame(this);
        }
    }

    //The actions
    handler() {
        Handles.player(this);
        Handles.ai(this);
        States.score(this);
        States.ball(this);
    }

    handlePaddleHit(ball, paddle) {
        // Calculate bounce angle based on where ball hits paddle
        States.hit(this, ball, paddle);
    }
}

export default MyGame;
