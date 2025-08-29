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
    event: ({ scene, keys, callback, once = true }) => {
        // allow both array or string with "|"
        const events = Array.isArray(keys) ? keys : keys.split("|");

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
    imageButton: ({ scene, x, y, key, isVisible = true, scale = 0.1, alpha = 0.8, depth = 10 }) => {
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
    playSound: (scene, key) => {
        if (scene.sound.locked) {
            scene.sound.once(Phaser.Sound.Events.UNLOCKED, () => scene.sound.play(key));
        } else {
            scene.sound.play(key);
        }
    },
    playIfNotPlaying: (sound) => {
        if (sound && !sound.isPlaying) {
            sound.play();
        }
    },
    stopIfPlaying: (sound) => {
        if (sound && sound.isPlaying) {
            sound.stop();
        }
    },
    hide: ({ id = "", element = null }) => {
        return element ? element.classList.add("hidden") : Bases.getById(id).classList.add("hidden");
    },
    show: ({ id = "", element = null }) => {
        return element ? element.classList.remove("hidden") : Bases.getById(id).classList.remove("hidden");
    },
};

export default Handles;
