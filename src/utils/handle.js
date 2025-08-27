import Bases from ".";
import Instances from "../consts";

const Handles = {
    player(scene) {
        // Use physics velocity for smooth movement
        if (scene.cursors.up.isDown || scene.isUp) {
            Bases.moveDown(scene.paddleLeft, Instances.game.playerSpeed);
        } else if (scene.cursors.down.isDown || scene.isDown) {
            Bases.moveUp(scene.paddleLeft, Instances.game.playerSpeed);
        } else {
            Bases.stop(scene.paddleLeft);
        }
    },
    ai: (scene) => {
        // Improved AI with smooth movement
        const ballY = scene.ball.y;
        const paddleY = scene.paddleRight.y;
        const diff = ballY - paddleY;
        const deadZone = 10; // Prevent jittering

        if (Math.abs(diff) > deadZone) {
            if (diff > 0) {
                Bases.moveUp(scene.paddleRight, Instances.game.botSpeed);
            } else {
                Bases.moveDown(scene.paddleRight, Instances.game.botSpeed);
            }
        } else {
            Bases.stop(scene.paddleRight);
        }
    },
    event: ({ scene, Instances, callback, once = true }) => {
        // allow both array or string with "|"
        const events = Array.isArray(Instances) ? Instances : Instances.split("|");

        events.forEach((key) => {
            const isKeyboard = key.startsWith("keydown-") || key.startsWith("keyup-");
            const { input } = scene;
            const { keyboard } = scene.input;
            if (isKeyboard) {
                once ? keyboard.once(key, callback) : keyboard.on(key, callback);
            } else {
                once ? input.once(key, callback) : input.on(key, callback);
            }
        });
    },
    button: ({ scene, x, y, key, isVisible = true, scale = 0.1, alpha = 0.8, depth = 10 }) => {
        const button = scene.add
            .image(x, y, key)
            .setInteractive()
            .setScrollFactor(0)
            .setAlpha(alpha) // transparent feel
            .setScale(scale)
            .setDepth(depth)
            .setVisible(isVisible);

        return button;
    },
    sound: ({ scene, key, config = {} }) => {
        const sound = scene.sound.add(key, config);
        if (config?.loop) {
            sound.isPlaying ? sound.stop() : sound.play();
        } else {
            sound.play();
        }

        return sound;
    },
    justOnce: ({ scene, Instances, callback }) => {
        const events = Array.isArray(Instances) ? Instances : Instances.split("|");

        events.forEach((key) => {
            if (key.startsWith("keydown-")) {
                const code = key.split("-")[1];
                const keyObj = scene.input.keyboard.addKey(code);
                scene.input.keyboard.on("keydown", (ev) => {
                    if (ev.code === `Space` && Phaser.Input.Keyboard.JustDown(keyObj)) {
                        callback(ev);
                    }
                });
            } else if (key === "pointerdown") {
                scene.input.once("pointerdown", callback);
            }
        });
    },
};

export default Handles;
