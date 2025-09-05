import Instances from "./consts";
import StartGame from "./scenes/Start";
import Bases from "./utils";
import Handles from "./utils/handle";

const applyDevice = () => {
    if (Bases.isMobile()) {
        Handles.hide({ id: Instances.control.desktop });
        Handles.show({ id: Instances.control.mobile });
    } else {
        Handles.show({ id: Instances.control.desktop });
        Handles.hide({ id: Instances.control.mobile });
    }

    Math.min(window.innerWidth, 1024), Math.min(window.innerHeight, 600);
};

document.addEventListener("DOMContentLoaded", () => {
    StartGame("phaser-game");
    applyDevice();
    window.addEventListener("resize", applyDevice);
});
