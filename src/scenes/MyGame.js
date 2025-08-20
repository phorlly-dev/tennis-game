import Phaser from 'phaser'; // Import the full Phaser library

import {
  courier_new,
  press_start_2p,
} from '../consts/fonts';
import {
  AI_SPEED,
  BALL_SPEED,
  GAME_HEIGHT,
  GAME_STATE,
  GAME_WIDTH,
  key_values,
  MAX_SCORE,
  PADDLE_SPEED,
} from '../consts/keys';

class MyGame extends Phaser.Scene {
    constructor() {
        super(key_values.scene.my_game);
    }

    init() {
        this.gameState = GAME_STATE.RUNNING;
        this.leftScore = 0;
        this.rightScore = 0;
        this.ballSpeed = BALL_SPEED;
    }

    create() {
        // // Create background
        this.add.rectangle(
            GAME_WIDTH / 2,
            GAME_HEIGHT / 2,
            GAME_WIDTH,
            GAME_HEIGHT,
            0x1a252f
        );

        // Create center line
        for (let i = 0; i < GAME_HEIGHT; i += 30) {
            this.add.rectangle(GAME_WIDTH / 2, i, 4, 15, 0x3498db, 0.3);
        }

        // Create paddles with proper physics
        this.paddleLeft = this.add.sprite(
            50,
            GAME_HEIGHT / 2,
            key_values.image.key.left
        );
        this.paddleRight = this.add.sprite(
            GAME_WIDTH - 50,
            GAME_HEIGHT / 2,
            key_values.image.key.right
        );

        // Enable physics for paddles
        this.physics.add.existing(this.paddleLeft);
        this.paddleLeft.setScale(0.2, 0.4);

        this.physics.add.existing(this.paddleRight);
        this.paddleRight.setScale(0.2, 0.4);

        // Configure paddle physics
        this.paddleLeft.body.setImmovable(true);
        this.paddleRight.body.setImmovable(true);
        this.paddleLeft.body.setCollideWorldBounds(true);
        this.paddleRight.body.setCollideWorldBounds(true);

        // Create ball
        this.ball = this.add.sprite(
            GAME_WIDTH / 2,
            GAME_HEIGHT / 2,
            key_values.image.key.ball
        );
        this.physics.add.existing(this.ball);
        this.ball.setScale(0.06);

        // Configure ball physics - IMPORTANT: Don't use setCollideWorldBounds for scoring
        this.ball.body.setBounce(1, 1);
        // Only bounce on top and bottom walls, not left/right for scoring
        this.ball.body.setCollideWorldBounds(false);

        // Manual world bounds checking for top/bottom only
        this.physics.world.on("worldbounds", (event) => {
            // Only bounce on top/bottom walls
            if (event.body === this.ball.body) {
                if (event.up || event.down) {
                    // Let Phaser handle top/bottom bouncing
                    this.ball.body.velocity.y *= -1;
                }
            }
        });

        // Set up paddle-ball collisions
        this.physics.add.collider(
            this.ball,
            this.paddleLeft,
            this.handlePaddleHit,
            null,
            this
        );
        this.physics.add.collider(
            this.ball,
            this.paddleRight,
            this.handlePaddleHit,
            null,
            this
        );

        // Create controls
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spaceKey = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.SPACE
        );

        // Score display
        const scoreStyle = {
            fontSize: "32px",
            fill: "#ecf0f1",
            fontFamily: press_start_2p,
        };

        this.leftScoreText = this.add
            .text(GAME_WIDTH / 4, 50, `Player: ${this.leftScore}`, scoreStyle)
            .setOrigin(0.5);
        this.rightScoreText = this.add
            .text((3 * GAME_WIDTH) / 4, 50, `AI: ${this.rightScore}`, scoreStyle)
            .setOrigin(0.5);

        // Game over text (hidden initially)
        this.gameOverText = this.add
            .text(GAME_WIDTH / 2, GAME_HEIGHT / 2, "", {
                fontSize: "48px",
                fill: "#ecf0f1",
                fontFamily: courier_new,
                align: "center",
            })
            .setOrigin(0.5)
            .setVisible(false);

        this.restartText = this.add
            .text(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 80, "Press SPACE to restart", {
                fontSize: "24px",
                fill: "#95a5a6",
                fontFamily: courier_new,
                align: "center",
            })
            .setOrigin(0.5)
            .setVisible(false);

        // Pause text
        this.pauseText = this.add
            .text(
                GAME_WIDTH / 2,
                GAME_HEIGHT / 2,
                "PAUSED\n\nPress SPACE to continue",
                {
                    fontSize: "36px",
                    fill: "#f39c12",
                    fontFamily: courier_new,
                    align: "center",
                }
            )
            .setOrigin(0.5)
            .setVisible(false);

        // Delayed ball reset
        this.time.delayedCall(1500, () => this.resetBall(), [], this);
    }

    update() {
        // Handle pause/restart
        if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
            this.sound.play(key_values.audio.key.pong_beep);
            this.handleSpaceKey();
        }

        if (this.gameState !== GAME_STATE.RUNNING) {
            return;
        }

        this.handlePlayerMovement();
        this.handleAIMovement();
        this.checkScoring();
        this.checkBallBounds();
    }

    handleSpaceKey() {
        if (this.gameState === GAME_STATE.RUNNING) {
            this.pauseGame();
        } else if (this.gameState === GAME_STATE.PAUSED) {
            this.resumeGame();
        } else if (
            this.gameState === GAME_STATE.PLAYER_WON ||
            this.gameState === GAME_STATE.AI_WON
        ) {
            this.restartGame();
        }
    }

    handlePlayerMovement() {
        // Use physics velocity for smooth movement
        if (this.cursors.up.isDown) {
            this.paddleLeft.body.setVelocityY(-PADDLE_SPEED);
        } else if (this.cursors.down.isDown) {
            this.paddleLeft.body.setVelocityY(PADDLE_SPEED);
        } else {
            this.paddleLeft.body.setVelocityY(0);
        }
    }

    handleAIMovement() {
        // Improved AI with smooth movement
        const ballY = this.ball.y;
        const paddleY = this.paddleRight.y;
        const diff = ballY - paddleY;
        const deadZone = 10; // Prevent jittering

        if (Math.abs(diff) > deadZone) {
            if (diff > 0) {
                this.paddleRight.body.setVelocityY(AI_SPEED);
            } else {
                this.paddleRight.body.setVelocityY(-AI_SPEED);
            }
        } else {
            this.paddleRight.body.setVelocityY(0);
        }
    }

    checkBallBounds() {
        // Manual top/bottom bouncing since we disabled world bounds collision
        if (this.ball.y <= 12) {
            this.ball.y = 12;
            this.ball.body.velocity.y = Math.abs(this.ball.body.velocity.y);
            this.flashEffect();
        } else if (this.ball.y >= GAME_HEIGHT - 12) {
            this.ball.y = GAME_HEIGHT - 12;
            this.ball.body.velocity.y = -Math.abs(this.ball.body.velocity.y);
            this.flashEffect();
        }
    }

    checkScoring() {
        // FIXED: Use screen boundaries for scoring, not paddle positions
        if (this.ball.x < -20) {
            // Ball went past left side - AI scores
            this.rightScore++;
            this.updateScore();
            this.resetBall();
            this.checkGameEnd();
        } else if (this.ball.x > GAME_WIDTH + 20) {
            // Ball went past right side - Player scores
            this.leftScore++;
            this.updateScore();
            this.resetBall();
            this.checkGameEnd();
        }
    }

    handlePaddleHit(ball, paddle) {
        // Calculate bounce angle based on where ball hits paddle
        const hitPosition = (ball.y - paddle.y) / (paddle.height / 2);
        const bounceAngle = (hitPosition * Math.PI) / 4; // Max 45 degrees

        // Determine direction based on which paddle was hit
        const direction = paddle === this.paddleLeft ? 1 : -1;

        // Increase speed slightly on each hit
        this.ballSpeed = Math.min(this.ballSpeed + 10, 500);

        // Set new velocity with angle
        ball.body.setVelocity(
            direction * this.ballSpeed * Math.cos(bounceAngle),
            this.ballSpeed * Math.sin(bounceAngle)
        );

        // Visual feedback
        this.flashEffect();
    }

    resetBall() {
        // Reset position to center
        this.ball.setPosition(GAME_WIDTH / 2, GAME_HEIGHT / 2);

        // Reset speed
        this.ballSpeed = BALL_SPEED;

        // Random initial direction
        const angle = (Phaser.Math.Between(-30, 30) * Math.PI) / 180;
        const direction = Math.random() > 0.5 ? 1 : -1;

        this.ball.body.setVelocity(
            direction * this.ballSpeed * Math.cos(angle),
            this.ballSpeed * Math.sin(angle)
        );
    }

    updateScore() {
        this.leftScoreText.setText(`Player: ${this.leftScore}`);
        this.rightScoreText.setText(`AI: ${this.rightScore}`);
    }

    checkGameEnd() {
        if (this.leftScore >= MAX_SCORE) {
            this.gameState = GAME_STATE.PLAYER_WON;
            this.showGameOver("YOU WIN!", "#27ae60");
        } else if (this.rightScore >= MAX_SCORE) {
            this.gameState = GAME_STATE.AI_WON;
            this.showGameOver("AI WINS!", "#e74c3c");
        }
    }

    showGameOver(message, color) {
        this.ball.body.setVelocity(0, 0);
        this.paddleLeft.body.setVelocity(0, 0);
        this.paddleRight.body.setVelocity(0, 0);

        this.gameOverText.setText(message);
        this.gameOverText.setFill(color);
        this.gameOverText.setVisible(true);
        this.restartText.setVisible(true);
    }

    pauseGame() {
        this.gameState = GAME_STATE.PAUSED;
        this.physics.pause();
        this.pauseText.setVisible(true);
    }

    resumeGame() {
        this.gameState = GAME_STATE.RUNNING;
        this.physics.resume();
        this.pauseText.setVisible(false);
    }

    restartGame() {
        // Reset scores
        this.leftScore = 0;
        this.rightScore = 0;
        this.updateScore();

        // Reset game state
        this.gameState = GAME_STATE.RUNNING;

        // Hide UI elements
        this.gameOverText.setVisible(false);
        this.restartText.setVisible(false);
        this.pauseText.setVisible(false);

        // Reset positions
        this.paddleLeft.setPosition(50, GAME_HEIGHT / 2);
        this.paddleRight.setPosition(GAME_WIDTH - 50, GAME_HEIGHT / 2);

        // Resume physics and reset ball
        this.physics.resume();
        this.resetBall();
    }

    flashEffect() {
        this.cameras.main.flash(100, 255, 255, 255, false);
        this.sound.play(key_values.audio.key.pong_plop, { volume: 0.5 });
    }
}

export default MyGame;
