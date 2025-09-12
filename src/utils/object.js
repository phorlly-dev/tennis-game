import { text } from ".";
import { height, width } from "../consts";
import { orange, secondary } from "../consts/color";

const Objects = {
    makePaddle(scene, x, y, key) {
        const paddle = scene.add.sprite(x, y, key);
        scene.add.existing(paddle);
        scene.physics.add.existing(paddle);

        paddle.setScale(0.25, 0.5);
        paddle.body.setImmovable(true);
        paddle.body.setCollideWorldBounds(true);

        return paddle;
    },
    makeBall(scene, x, y, key) {
        const ball = scene.add.sprite(x, y, key);
        scene.add.existing(ball);
        scene.physics.add.existing(ball);

        ball.setScale(0.07);
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
    makePauseText(scene) {
        // Game over text (hidden initially)
        scene.gameOverText = text({
            scene: scene,
            x: width / 2,
            y: height / 2,
            title: "",
            style: {
                fontSize: "48px",
            },
            isVisible: false,
        });
        scene.restartText = text({
            scene: scene,
            x: width / 2,
            y: height / 2 + 80,
            title: "Click ▶ to replay",
            style: {
                fill: secondary.css,
                fontSize: "24px",
            },
            isVisible: false,
        });
        scene.pauseText = text({
            scene: scene,
            x: width / 2,
            y: height / 2,
            title: "PAUSED\n\nClick ▶ to continue",
            style: {
                fontSize: "36px",
                fill: orange.css,
                textAlign: "center",
            },
            isVisible: false,
        });
    },
    bindButtons({ scene, elements, keys }) {
        elements.forEach((el, i) => {
            const key = keys[i]; // match button to key by index
            ["pointerdown", "pointerup", "pointerout"].forEach((ev) => {
                el.addEventListener(ev, () => (scene[key] = ev === "pointerdown"));
            });
        });
    },
    bindToggleButtons({ scene, elements, callback }) {
        elements.forEach((el) => el.addEventListener("pointerdown", () => callback(scene)));
    },
};

export const { makePaddle, makeBall, makePauseText, bindButtons, bindToggleButtons } = Objects;
