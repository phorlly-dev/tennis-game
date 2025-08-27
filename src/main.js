import StartGame from "./scenes/Start";
import Bases from "./utils";

const applyDevice = () => {
    const desktop = Bases.getBy("#btn-guide-desktop").style;
    const mobile = Bases.getBy("#btn-guide-mobile").style;

    if (Bases.isMobile()) {
        desktop.display = "none";
        mobile.display = "block";
    } else {
        desktop.display = "block";
        mobile.display = "none";
    }
};

document.addEventListener("DOMContentLoaded", () => {
    StartGame("phaser-game");
    applyDevice();
    window.addEventListener("resize", applyDevice);
});
