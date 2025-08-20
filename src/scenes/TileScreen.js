import { Scene } from 'phaser';

import { press_start_2p } from '../consts/fonts';
import { key_values } from '../consts/keys';

class TileScreen extends Scene {
    constructor() {
        super(key_values.scene.tile_screen);
    }

    create() {
        this.add.image(512, 384, key_values.image.key.bg);
        const title = this.add.text(500, 250, "Old School Tennis", {
            fontSize: '48px',
            fontFamily: press_start_2p,
        });
        title.setOrigin(0.5, 0.5);
        const startText = this.add.text(500, 400, "Press Space to Start", {
            fontFamily: press_start_2p,
        });
        startText.setOrigin(0.5, 0.5);

        this.input.keyboard.once("keydown-SPACE", () => {
            this.sound.play(key_values.audio.key.pong_beep);
            this.scene.start(key_values.scene.my_game);
        });
    }
}

export default TileScreen;
