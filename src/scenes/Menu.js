import Instances from "../consts";
import Fonts from "../consts/font";
import Bases from "../utils";
import Handles from "../utils/handle";

const { menu, start } = Instances.scene;
class Menu extends Phaser.Scene {
    constructor() {
        super(menu);
    }

    create() {
        const { width, height } = Instances.game;
        const bg = this.add.image(width / 2, height / 2, Instances.image.key.bg).setAlpha(0.2);

        const title = Bases.text({
            scene: this,
            x: width / 2,
            y: height / 2 - 50,
            title: "Old School Tennis",
            style: {
                fontSize: "48px",
                fontFamily: Fonts.pressStart2P,
            },
        });

        this.label = Bases.text({
            scene: this,
            x: width / 2,
            y: height / 2 + 100,
            title: "",
            style: {
                fontSize: "24px",
            },
        });

        Handles.event({
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
                Handles.playSound(this, Instances.audio.key.pongBeep);
            },
        });
    }

    update() {
        const m = "▶ Tap on screen to start!";
        const d = "Press Space or Click on screen to start!";

        this.label.setText(Bases.isMobile() ? m : d);
    }
}

export default Menu;
