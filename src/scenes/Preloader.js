import MyWebFont from "./MyWebFont";
import Instances from "../consts";
import Colors from "../consts/color";

class Preloader extends Phaser.Scene {
    constructor() {
        super(Instances.scene.preload);
    }
    preload() {
        // background
        this.add.image(Instances.game.width / 2, Instances.game.height / 2, Instances.image.key.bg).setAlpha(0.6);

        // sizes
        const barWidth = 460;
        const barHeight = 28;
        const radius = 12;
        const barX = Instances.game.width / 2 - barWidth / 2;
        const barY = Instances.game.height / 2;

        // progress container (outline with rounded corners)
        const progressBox = this.add.graphics();
        progressBox.lineStyle(2, 0xffffff, 1);
        progressBox.strokeRoundedRect(barX, barY, barWidth, barHeight, radius);

        // progress bar (filled rounded rect)
        const progressBar = this.add.graphics();

        // text
        const progressText = this.add
            .text(Instances.game.width / 2, Instances.game.height / 2 + 50, "Loading: 0%", {
                fontSize: "20px",
                fill: Colors.primary,
            })
            .setOrigin(0.5);

        this.fakeProgress = 0;
        this.speed = 800;

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
                    progressBar.fillStyle(Colors.success, 1);
                    progressBar.fillRoundedRect(barX, barY, barWidth * this.fakeProgress, barHeight, radius);
                    progressText.setText(`Loading: ${Math.round(this.fakeProgress * 100)}%`);
                },
            });
        });

        // Load assets with error handling
        try {
            const fonts = new MyWebFont(this.load, ["Press Start 2P"]);
            this.load.addFile(fonts);

            this.load.setPath("assets");
            this.load.image(Instances.image.key.left, Instances.image.value.left);
            this.load.image(Instances.image.key.right, Instances.image.value.right);
            this.load.image(Instances.image.key.ball, Instances.image.value.ball);

            this.load.audio(Instances.audio.key.pongBeep, Instances.audio.value.pongBeep);
            this.load.audio(Instances.audio.key.pongPlop, Instances.audio.value.pongPlop);
            this.load.audio(Instances.audio.key.splash, Instances.audio.value.splash);
            this.load.audio(Instances.audio.key.playing, Instances.audio.value.playing);
        } catch (error) {
            console.error("Asset loading failed:", error);
        }
    }

    create() {
        // When complete → ensure progress bar finishes
        this.load.once("complete", () => {
            this.time.delayedCall(this.speed, () => {
                this.scene.start(Instances.scene.menu);
            });
        });

        this.load.start();
    }
}

export default Preloader;
