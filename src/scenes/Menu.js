import { audio, game, image, menu, on, start } from "../consts";
import { start_2p } from "../consts/font";
import { isMobile, text } from "../utils";
import { onClick, playSound } from "../utils/handle";

class Menu extends Phaser.Scene {
    constructor() {
        super(menu);
    }

    create() {
        const { width, height } = game;
        const bg = this.add.image(width / 2, height / 2, image.key.bg).setAlpha(0.2);

        const title = text({
            scene: this,
            x: width / 2,
            y: height / 2 - 50,
            title: "Old School Tennis",
            style: {
                fontSize: "48px",
                fontFamily: start_2p,
            },
        });

        this.label = text({
            scene: this,
            x: width / 2,
            y: height / 2 + 100,
            title: "",
            style: {
                fontSize: "24px",
            },
        });

        onClick({
            scene: this,
            keys: ["keydown-SPACE", "pointerdown"],
            callback: () => {
                // ✅ unlock audio context (important for mobile)
                if (this.sound.context.state === "suspended") {
                    this.sound.context.resume();
                }

                bg.destroy();
                title.destroy();
                this.label.destroy();

                // stop menu and start game
                this.scene.stop(menu);
                this.scene.start(start);

                // play start sound (now safe after tap)
                playSound(this, audio.key.pong_beep);
            },
        });
    }

    update() {
        const m = "▶ Tap on screen to start!";
        const d = "Press Space or Click on screen to start!";

        this.label.setText(isMobile() ? m : d);
    }
}

export default Menu;
