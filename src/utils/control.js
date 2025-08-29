import Bases from ".";
import Instances from "../consts";
import Handles from "./handle";
import Objects from "./object";
import Payloads from "./playload";

const Controls = {
    buttons: (scene) => {
        scene.upBtn = Bases.getById(Instances.control.up);
        scene.downBtn = Bases.getById(Instances.control.down);
        scene.playBtn = Bases.getById(Instances.control.play);
        scene.pauseBtn = Bases.getById(Instances.control.pause);

        // Events
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
    toggleMute: (scene) => {
        // In your scene create/init
        const onBtn = Bases.getById(Instances.control.on);
        const offBtn = Bases.getById(Instances.control.off);

        scene.sound.mute = false;
        onBtn.addEventListener("pointerdown", () => {
            // Mute
            scene.sound.mute = true;
            Handles.hide({ element: onBtn });
            Handles.show({ element: offBtn });
        });

        offBtn.addEventListener("pointerdown", () => {
            // Unmute
            scene.sound.mute = false;
            Handles.show({ element: onBtn });
            Handles.hide({ element: offBtn });
        });
    },
    toggleControls: (isMobile) => {
        const controls = Bases.getById(Instances.control.card);
        if (isMobile) {
            Handles.show({ element: controls });
        } else {
            Handles.hide({ element: controls });
        }
    },
};

export default Controls;
