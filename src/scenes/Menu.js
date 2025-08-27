import Instances from "../consts";
import Fonts from "../consts/font";
import Bases from "../utils";
import Handles from "../utils/handle";
import States from "../utils/state";

class Menu extends Phaser.Scene {
    constructor() {
        super(Instances.scene.menu);
    }

    create() {
        States.hideShow(false);
        this.add.image(512, 384, Instances.image.key.bg);
        Bases.text({
            scene: this,
            x: Instances.game.width / 2,
            y: Instances.game.height / 2 - 50,
            title: "Old School Tennis",
            style: {
                fontSize: "48px",
                fontFamily: Fonts.pressStart2P,
            },
        });
        this.desktop = Bases.text({
            scene: this,
            x: Instances.game.width / 2,
            y: Instances.game.height / 2 + 100,
            title: "Press Space or Click to Start!",
            style: {
                fontFamily: Fonts.pressStart2P,
            },
        });
        this.mobile = Bases.text({
            scene: this,
            x: Instances.game.width / 2,
            y: Instances.game.height / 2 + 100,
            title: "▶ Tap to Start!",
            style: {
                fontFamily: Fonts.pressStart2P,
            },
        });
        Handles.event({
            scene: this,
            Instances: ["keydown-SPACE", "pointerdown"],
            callback: () => {
                // same unlock logic
                if (this.sound.locked) {
                    this.sound.once(Phaser.Sound.Events.UNLOCKED, () => {
                        this.sound.play(Instances.audio.key.pongBeep);
                        this.scene.start(Instances.scene.start);
                    });
                } else {
                    this.sound.play(Instances.audio.key.pongBeep);
                    this.scene.start(Instances.scene.start);
                }
            },
        });
    }

    update() {
        this.mobile.setVisible(Bases.isMobile());
        this.desktop.setVisible(!Bases.isMobile());
    }
}

export default Menu;
