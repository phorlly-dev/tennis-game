import Keys from "../consts";

class Boot extends Phaser.Scene {
    constructor() {
        super(Keys.scene.boot);
    }

    preload() {
        this.load.image(Keys.image.key.bg, Keys.image.value.bg);
    }

    create() {
        this.scene.start(Keys.scene.preload);
    }
}

export default Boot;
