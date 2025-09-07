import Bases from ".";
import Instances from "../consts";
import Handles from "./handle";
import Objects from "./object";
import Payloads from "./playload";

const { up, down, play, pause, on, off, card } = Instances.control;
const Controllers = {
    buttons(scene) {
        // clear old listeners before binding new
        const elements = [
            Bases.getById(up),
            Bases.getById(down),
            Bases.getById(play),
            Bases.getById(pause),
            Bases.getById(on),
            Bases.getById(off),
        ];

        elements.forEach((el) => {
            el.replaceWith(el.cloneNode(true)); // 🔑 remove old listeners
        });

        // Re-fetch after cloning
        scene.upBtn = Bases.getById(up);
        scene.downBtn = Bases.getById(down);
        scene.playBtn = Bases.getById(play);
        scene.pauseBtn = Bases.getById(pause);
        scene.onBtn = Bases.getById(on);
        scene.offBtn = Bases.getById(off);

        // Rebind fresh listeners
        Objects.bindButtons({
            scene,
            elements: [scene.upBtn, scene.downBtn],
            keys: ["isUp", "isDown"],
        });

        Objects.bindToggleButtons({
            scene,
            elements: [scene.pauseBtn, scene.playBtn],
            callback: Payloads.togglePauseOrRestart,
        });
    },
    toggleMute(scene) {
        scene.sound.mute = false;
        scene.onBtn.addEventListener("pointerdown", () => {
            // Mute
            scene.sound.mute = true;
            Handles.hide({ element: scene.onBtn });
            Handles.show({ element: scene.offBtn });
        });

        scene.offBtn.addEventListener("pointerdown", () => {
            // Unmute
            scene.sound.mute = false;
            Handles.show({ element: scene.onBtn });
            Handles.hide({ element: scene.offBtn });
        });
    },
    toggleControls(isMobile) {
        const controls = Bases.getById(card);
        if (isMobile) {
            Handles.show({ element: controls });
        } else {
            Handles.hide({ element: controls });
        }
    },
};

export default Controllers;
