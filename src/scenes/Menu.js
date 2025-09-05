import Instances from "../consts";
import Fonts from "../consts/font";
import Bases from "../utils";
import Handles from "../utils/handle";

class Menu extends Phaser.Scene {
    constructor() {
        super(Instances.scene.menu);
    }

    create() {
        const bg = this.add
            .image(Instances.game.width / 2, Instances.game.height / 2, Instances.image.key.bg)
            .setAlpha(0.6);

        const title = Bases.text({
            scene: this,
            x: Instances.game.width / 2,
            y: Instances.game.height / 2 - 50,
            title: "Old School Tennis",
            style: {
                fontSize: "48px",
                fontFamily: Fonts.pressStart2P,
            },
        });

        this.label = Bases.text({
            scene: this,
            x: Instances.game.width / 2,
            y: Instances.game.height / 2 + 100,
            title: "",
            style: {
                fontFamily: Fonts.pressStart2P,
                fontSize: "24px",
            },
        });

        Handles.event({
            scene: this,
            keys: ["keydown-SPACE", "pointerdown"],
            callback: () => {
                bg.destroy();
                title.destroy();
                this.label.destroy();
                this.scene.start(Instances.scene.start);
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
