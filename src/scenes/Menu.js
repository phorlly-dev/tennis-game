import Instances from "../consts";
import Colors from "../consts/color";
import Fonts from "../consts/font";
import Bases from "../utils";
import Controls from "../utils/control";
import Handles from "../utils/handle";

class Menu extends Phaser.Scene {
    constructor() {
        super(Instances.scene.menu);
    }

    init() {
        Handles.hide({ id: Instances.control.ui });
    }

    create() {
        const bg = this.add
            .image(Instances.game.width / 2, Instances.game.height / 2, Instances.image.key.bg)
            .setAlpha(0.7);

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
