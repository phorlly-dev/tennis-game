import { Scene } from 'phaser';

import { key_values } from '../consts/keys';
import MyWebFont from './MyWebFont';

class Preloader extends Scene {
    constructor() {
        super(key_values.scene.preloader);
    }

    // init() {
    //     //  We loaded this image in our Boot Scene, so we can display it here
    //     this.add.image(512, 384, key_values.image.key.bg);

    //     //  A simple progress bar. This is the outline of the bar.
    //     this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

    //     //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
    //     const bar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffffff);

    //     //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
    //     this.load.on('progress', (progress) => {

    //         //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
    //         bar.width = 4 + (460 * progress);

    //     });
    // }

    preload() {
        // Load assets with error handling
        try {
            const fonts = new MyWebFont(this.load, ["Press Start 2P"]);
            this.load.addFile(fonts);

            this.load.image(key_values.image.key.bg, key_values.image.path.bg);
            this.load.image(key_values.image.key.left, key_values.image.path.left);
            this.load.image(key_values.image.key.right, key_values.image.path.right);
            this.load.image(key_values.image.key.ball, key_values.image.path.ball);

            this.load.audio(
                key_values.audio.key.pong_beep,
                key_values.audio.path.pong_beep
            );
            this.load.audio(
                key_values.audio.key.pong_plop,
                key_values.audio.path.pong_plop
            );
        } catch (error) {
            console.error("Asset loading failed:", error);
        }
    }

    create() {
        this.scene.start(key_values.scene.tile_screen);
    }
}

export default Preloader;
