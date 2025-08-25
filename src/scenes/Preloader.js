import MyWebFont from "./MyWebFont";
import Keys from "../consts";
import Colors from "../consts/color";

class Preloader extends Phaser.Scene {
    constructor() {
        super(Keys.scene.preload);
    }
    preload() {
        // background
        this.add.image(Keys.game.width / 2, Keys.game.height / 2, Keys.image.key.bg).alpha = 0.8;

        // progress container (outline with rounded corners)
        const progressBox = this.add.graphics();
        progressBox.lineStyle(2, 0xffffff, 1);
        progressBox.strokeRoundedRect(Keys.game.width / 2 - 230, Keys.game.height / 2 - 14, 460, 28, 8);

        // progress bar (filled rounded rect)
        const progressBar = this.add.graphics();

        // text
        const progressText = this.add
            .text(Keys.game.width / 2, Keys.game.height / 2 + 50, "Loading: 0%", {
                fontSize: "20px",
                fill: Colors.primary,
            })
            .setOrigin(0.5);

        this.fakeProgress = 0;
        this.speed = 1500;

        // listen for loader progress
        this.load.on("progress", (progress) => {
            // tweened smooth progress
            this.tweens.add({
                targets: this,
                fakeProgress: progress,
                duration: this.speed,
                ease: "Linear",
                onUpdate: () => {
                    progressBar.clear();
                    progressBar.fillStyle(Colors.green, 1);
                    progressBar.fillRoundedRect(
                        Keys.game.width / 2 - 230,
                        Keys.game.height / 2 - 14,
                        460 * this.fakeProgress,
                        28,
                        8
                    );
                    progressText.setText(`Loading: ${Math.round(this.fakeProgress * 100)}%`);
                },
            });
        });

        // Load assets with error handling
        try {
            const fonts = new MyWebFont(this.load, ["Press Start 2P"]);
            this.load.addFile(fonts);

            this.load.image(Keys.image.key.left, Keys.image.value.left);
            this.load.image(Keys.image.key.right, Keys.image.value.right);
            this.load.image(Keys.image.key.ball, Keys.image.value.ball);

            this.load.audio(Keys.audio.key.pongBeep, Keys.audio.value.pongBeep);
            this.load.audio(Keys.audio.key.pongPlop, Keys.audio.value.pongPlop);
            this.load.audio(Keys.audio.key.splash, Keys.audio.value.splash);
        } catch (error) {
            console.error("Asset loading failed:", error);
        }
    }

    create() {
        this.time.delayedCall(this.speed, () => {
            this.scene.start(Keys.scene.menu);
        });
    }
}

export default Preloader;
