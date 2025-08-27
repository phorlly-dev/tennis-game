import Bases from ".";
import Instances from "../consts";
import Fonts from "../consts/font";
import Handles from "./handle";
import Payloads from "./playload";

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
    buttons: (scene, isMobile) => {
        scene.upBtn = Bases.getBy(".up");
        scene.downBtn = Bases.getBy(".down");
        scene.playBtn = Bases.getBy(".play");
        scene.pauseBtn = Bases.getBy(".pause");

        scene.isDown = false;
        scene.isUp = false;

        scene.upBtn.addEventListener("pointerdown", () => (scene.isUp = true));
        scene.upBtn.addEventListener("pointerup", () => (scene.isUp = false));
        scene.upBtn.addEventListener("pointerout", () => (scene.isUp = false));

        scene.downBtn.addEventListener("pointerdown", () => (scene.isDown = true));
        scene.downBtn.addEventListener("pointerup", () => (scene.isDown = false));
        scene.downBtn.addEventListener("pointerout", () => (scene.isDown = false));

        scene.pauseBtn.addEventListener("pointerdown", () => Payloads.togglePauseOrRestart(scene));
        scene.playBtn.addEventListener("pointerdown", () => Payloads.togglePauseOrRestart(scene));
    },
    ui: (scene) => {
        const scoreStyle = {
            fontSize: "32px",
            fill: "#ecf0f1",
            fontFamily: Fonts.pressStart2P,
        };

        scene.leftScoreText = Bases.text({
            scene: scene,
            x: Instances.game.width / 4,
            y: 50,
            title: `Player: ${scene.leftScore}`,
            style: scoreStyle,
        });
        scene.rightScoreText = Bases.text({
            scene: scene,
            x: (3 * Instances.game.width) / 4,
            y: 50,
            title: `AI: ${scene.rightScore}`,
            style: scoreStyle,
        });

        // Game over text (hidden initially)
        scene.gameOverText = Bases.text({
            scene: scene,
            x: Instances.game.width / 2,
            y: Instances.game.height / 2,
            title: "",
            style: {
                fontSize: "48px",
                fill: "#ecf0f1",
            },
            isVisible: false,
        });
        scene.restartText = Bases.text({
            scene: scene,
            x: Instances.game.width / 2,
            y: Instances.game.height / 2 + 80,
            title: "Click ▶ to replay",
            style: { fill: "#95a5a6" },
            isVisible: false,
        });
        scene.pauseText = Bases.text({
            scene: scene,
            x: Instances.game.width / 2,
            y: Instances.game.height / 2,
            title: "PAUSED\n\n\nClick ▶ to continue",
            style: { fontSize: "36px", fill: "#f39c12" },
            isVisible: false,
        });

        scene.iconPlay = Handles.button({
            scene: scene,
            x: Instances.game.width / 2,
            y: Instances.game.height / 2,
            key: Instances.image.key.play,
            isVisible: false,
        });
    },
};

export default Objects;
