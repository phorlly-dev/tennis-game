import Keys from "../consts";
import Fonts from "../consts/font";

class MainMenu extends Phaser.Scene {
    constructor() {
        super(Keys.scene.menu);
    }

    create() {
        this.add.image(512, 384, Keys.image.key.bg);
        const title = this.add.text(Keys.game.width / 2, Keys.game.height / 2 - 50, "Old School Tennis", {
            fontSize: "48px",
            fontFamily: Fonts.pressStart2P,
        });
        title.setOrigin(0.5, 0.5);
        const startText = this.add.text(
            Keys.game.width / 2,
            Keys.game.height / 2 + 100,
            "Press Space to Start",
            {
                fontFamily: Fonts.pressStart2P,
            }
        );
        startText.setOrigin(0.5, 0.5);

        this.input.keyboard.once("keydown-SPACE", () => {
            this.sound.play(Keys.audio.key.pongBeep);
            this.scene.start(Keys.scene.start);
        });
    }
}

export default MainMenu;
