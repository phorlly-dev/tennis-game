import Instances from "../consts";
import Handles from "../utils/handle";
import Objects from "../utils/object";
import States from "../utils/state";
import Payloads from "../utils/playload";
import Controls from "../utils/control";
import Bases from "../utils";

class MyGame extends Phaser.Scene {
    constructor() {
        super(Instances.scene.start);
    }

    init() {
        this.leftScore = 0;
        this.rightScore = 0;
        this.gameState = Instances.game.running;
        this.ballSpeed = Instances.game.ballSpeed;
        Handles.show({ id: Instances.control.ui });
    }

    create() {
        // // Create background
        this.add.image(Instances.game.width / 2, Instances.game.height / 2, Instances.image.key.bg).setAlpha(0.2);

        // Create center line
        for (let i = 0; i < Instances.game.height; i += 30) {
            this.add.rectangle(Instances.game.width / 2, i, 4, 15, 0x3498db, 0.3);
        }

        // Create paddles & ball
        this.paddleLeft = Objects.paddle(this, 50, Instances.game.height / 2, Instances.image.key.left);
        this.paddleRight = Objects.paddle(
            this,
            Instances.game.width - 50,
            Instances.game.height / 2,
            Instances.image.key.right
        );
        this.ball = Objects.ball(this, Instances.game.width / 2, Instances.game.height / 2, Instances.image.key.ball);

        // Set up paddle-ball collisions
        this.physics.add.collider(this.ball, this.paddleLeft, this.handlePaddleHit, null, this);
        this.physics.add.collider(this.ball, this.paddleRight, this.handlePaddleHit, null, this);

        // Create controls
        this.cursors = this.input.keyboard.createCursorKeys();

        // Display text
        Objects.ui(this);
        Controls.buttons(this);
        Controls.toggleMute(this);
        // const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
        Controls.toggleControls(true);

        // Delayed ball reset
        this.time.delayedCall(1500, () => Payloads.resetBall(this), [], this);
        this.sound.play(Instances.audio.key.playing, { loop: true, volume: 0.5 });
    }

    update() {
        if (this.gameState !== Instances.game.running) return;

        this.handler();
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
