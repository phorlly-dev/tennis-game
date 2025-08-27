import Instances from "../consts";
import Handles from "../utils/handle";
import Objects from "../utils/object";
import States from "../utils/state";
import Payloads from "../utils/playload";

class MyGame extends Phaser.Scene {
    constructor() {
        super(Instances.scene.start);
    }

    init() {
        this.gameState = Instances.game.running;
        this.leftScore = 0;
        this.rightScore = 0;
        this.ballSpeed = Instances.game.ballSpeed;
        States.hideShow(true);
    }

    create() {
        // // Create background
        this.add.rectangle(
            Instances.game.width / 2,
            Instances.game.height / 2,
            Instances.game.width,
            Instances.game.height,
            0x1a252f
        );

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
        Objects.buttons(this);

        // Delayed ball reset
        this.time.delayedCall(1500, () => Payloads.resetBall(this), [], this);
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
