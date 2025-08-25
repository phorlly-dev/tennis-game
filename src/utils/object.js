import Keys from "../consts";
import Fonts from "../consts/font";

const Objects = {
    paddle: (scene, x, y, key) => {
        const paddle = scene.add.sprite(x, y, key);
        scene.add.existing(paddle);
        scene.physics.add.existing(paddle);

        paddle.setScale(0.2, 0.4);
        paddle.body.setImmovable(true);
        paddle.body.setCollideWorldBounds(true);

        return paddle;
    },
    ball: (scene, x, y, key) => {
        const ball = scene.add.sprite(x, y, key);
        scene.add.existing(ball);
        scene.physics.add.existing(ball);

        ball.setScale(0.06);
        ball.body.setBounce(1, 1);
        ball.body.setCollideWorldBounds(false);

        scene.physics.world.on("worldbounds", (event) => {
            // Only bounce on top/bottom walls
            if (event.body === ball.body) {
                if (event.up || event.down) {
                    // Let Phaser handle top/bottom bouncing
                    ball.body.velocity.y *= -1;
                }
            }
        });

        return ball;
    },
    ui: (scene) => {
        const scoreStyle = {
            fontSize: "32px",
            fill: "#ecf0f1",
            fontFamily: Fonts.pressStart2P,
        };

        scene.leftScoreText = scene.add
            .text(Keys.game.width / 4, 50, `Player: ${scene.leftScore}`, scoreStyle)
            .setOrigin(0.5);
        scene.rightScoreText = scene.add
            .text((3 * Keys.game.width) / 4, 50, `AI: ${scene.rightScore}`, scoreStyle)
            .setOrigin(0.5);

        // Game over text (hidden initially)
        scene.gameOverText = scene.add
            .text(Keys.game.width / 2, Keys.game.height / 2, "", {
                fontSize: "48px",
                fill: "#ecf0f1",
                fontFamily: Fonts.courierNew,
                align: "center",
            })
            .setOrigin(0.5)
            .setVisible(false);

        scene.restartText = scene.add
            .text(Keys.game.width / 2, Keys.game.height / 2 + 80, "Press SPACE to restart", {
                fontSize: "24px",
                fill: "#95a5a6",
                fontFamily: Fonts.courierNew,
                align: "center",
            })
            .setOrigin(0.5)
            .setVisible(false);

        // Pause text
        scene.pauseText = scene.add
            .text(Keys.game.width / 2, Keys.game.height / 2, "PAUSED\n\nPress SPACE to continue", {
                fontSize: "36px",
                fill: "#f39c12",
                fontFamily: Fonts.courierNew,
                align: "center",
            })
            .setOrigin(0.5)
            .setVisible(false);
    },
};

export default Objects;
