import { desktop, mobile } from "./consts";
import StartGame from "./scenes/Start";
import { isMobile } from "./utils";
import { hide, show } from "./utils/handle";

const applyDevice = () => {
    if (isMobile()) {
        hide({ id: desktop });
        show({ id: mobile });
    } else {
        show({ id: desktop });
        hide({ id: mobile });
    }
};

document.addEventListener("DOMContentLoaded", () => {
    StartGame("phaser-game");
    applyDevice();
    window.addEventListener("resize", applyDevice);
});
