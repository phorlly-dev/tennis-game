import { audio, image, menu, preload } from "../consts";
import { orange, white } from "../consts/color";
import MyWebFont from "./MyWebFont";

class Preloader extends Phaser.Scene {
    constructor() {
        super(preload);

        // class-level variables
        this.fakeProgress = 0; // what we draw
        this.targetProgress = 0; // what loader reports
        this.startRequested = false;
    }

    preload() {
        const cx = this.cameras.main.centerX;
        const cy = this.cameras.main.centerY;
        const W = this.scale.width;
        const H = this.scale.height;

        // background
        this.add.image(W / 2, H / 2, image.key.bg).setAlpha(0.4);

        // sizes
        const barWidth = 460;
        const barHeight = 28;
        const radius = 12;
        const x = cx - barWidth / 2;
        const y = cy - barHeight / 2; // truly centered

        // outline
        this.progressBox = this.add.graphics();
        this.progressBox.lineStyle(2, 0xffffff, 1);
        this.progressBox.strokeRoundedRect(x, y, barWidth, barHeight, radius);

        // bar + text
        this.progressBar = this.add.graphics();
        this.progressText = this.add
            .text(cx, y + barHeight + 22, "Loading: 0%", {
                fontSize: "20px",
                color: white.css,
            })
            .setOrigin(0.5);

        // smooth update
        this.events.on("update", () => {
            this.fakeProgress = Phaser.Math.Linear(this.fakeProgress, this.targetProgress, 0.2);

            this.progressBar.clear();
            this.progressBar.fillStyle(orange.hex, 1);
            this.progressBar.fillRoundedRect(x, y, barWidth * this.fakeProgress, barHeight, radius);

            this.progressText.setText(`Loading: ${Math.round(this.fakeProgress * 100)}%`);

            if (this.startRequested && this.fakeProgress > 0.999) {
                this.scene.start(menu);
            }
        });

        // update target from loader
        this.load.on("progress", (p) => {
            this.targetProgress = p;
        });

        // finished loading
        this.load.once("complete", () => {
            this.targetProgress = 1;
            this.startRequested = true;
        });

        // load assets
        try {
            const { key: imgKey, value: imgValue } = image;
            const { key: soundKey, value: soundValue } = audio;
            const fonts = new MyWebFont(this.load, ["Press Start 2P"]);
            this.load.addFile(fonts);

            this.load.setPath("assets");
            this.load.image(imgKey.left, imgValue.left);
            this.load.image(imgKey.right, imgValue.right);
            this.load.image(imgKey.ball, imgValue.ball);

            this.load.audio(soundKey.pong_beep, soundValue.pong_beep);
            this.load.audio(soundKey.pong_plop, soundValue.pong_plop);
            this.load.audio(soundKey.splash, soundValue.splash);
            this.load.audio(soundKey.playing, soundValue.playing);
        } catch (err) {
            console.error("Asset loading failed:", err);
        }
    }

    shutdown() {
        this.load.removeAllListeners();
        this.events.removeListener("update");
    }
}

export default Preloader;
