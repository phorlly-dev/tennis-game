import { getById } from ".";
import { card, down, off, on, pause, play, up } from "../consts";
import { hide, show } from "./handle";
import { bindButtons, bindToggleButtons } from "./object";
import { togglePauseOrRestart } from "./playload";

const Controllers = {
    makeButtons(scene) {
        // clear old listeners before binding new
        const elements = [getById(up), getById(down), getById(play), getById(pause), getById(on), getById(off)];

        elements.forEach((el) => {
            el.replaceWith(el.cloneNode(true)); // 🔑 remove old listeners
        });

        // Re-fetch after cloning
        scene.upBtn = getById(up);
        scene.downBtn = getById(down);
        scene.playBtn = getById(play);
        scene.pauseBtn = getById(pause);
        scene.onBtn = getById(on);
        scene.offBtn = getById(off);

        // Rebind fresh listeners
        bindButtons({
            scene,
            elements: [scene.upBtn, scene.downBtn],
            keys: ["isUp", "isDown"],
        });

        bindToggleButtons({
            scene,
            elements: [scene.pauseBtn, scene.playBtn],
            callback: togglePauseOrRestart,
        });
    },
    toggleMute(scene) {
        scene.sound.mute = false;
        scene.onBtn.addEventListener("pointerdown", () => {
            // Mute
            scene.sound.mute = true;
            hide({ element: scene.onBtn });
            show({ element: scene.offBtn });
        });

        scene.offBtn.addEventListener("pointerdown", () => {
            // Unmute
            scene.sound.mute = false;
            show({ element: scene.onBtn });
            hide({ element: scene.offBtn });
        });
    },
    toggleControls(isMobile) {
        const controls = getById(card);
        if (isMobile) {
            show({ element: controls });
        } else {
            hide({ element: controls });
        }
    },
};

export const { makeButtons, toggleMute, toggleControls } = Controllers;
