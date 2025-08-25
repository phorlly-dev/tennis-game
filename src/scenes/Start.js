import * as Phaser from "phaser";
import Boot from "./Boot";
import MyGame from "./MyGame";
import Preloader from "./Preloader";
import MainMenu from "./Menu";
import Keys from "../consts";

//  Find out more information about the Game Config at:
//  https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config = {
    type: Phaser.AUTO,
    width: Keys.game.width,
    height: Keys.game.height,
    backgroundColor: "#1a252f",
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: Keys.game.width,
        height: Keys.game.height,
    },
    physics: {
        default: "arcade",
        arcade: { gravity: { y: 0 }, debug: false },
    },
    scene: [Boot, Preloader, MainMenu, MyGame],
};

const StartGame = (parent) => {
    return new Phaser.Game({ ...config, parent });
};

export default StartGame;
