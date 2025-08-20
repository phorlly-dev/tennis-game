import { Scene } from 'phaser';

import { key_values } from '../consts/keys';

class Boot extends Scene {
    constructor() {
        super(key_values.scene.boot);
    }
    create() {
        this.scene.start(key_values.scene.preloader);
    }
}

export default Boot;
