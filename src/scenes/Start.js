import * as Phaser from "phaser";
import Boot from "./Boot";
import MyGame from "./MyGame";
import Preloader from "./Preloader";
import Menu from "./Menu";
import Instances from "../consts";

//  Find out more information about the Game Config at:
//  https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config = {
    type: Phaser.AUTO,
    width: Instances.game.width,
    height: Instances.game.height,
    backgroundColor: "#1a252f",
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: Instances.game.width,
        height: Instances.game.height,
    },
    physics: {
        default: "arcade",
        arcade: { gravity: { y: 0 }, debug: false },
    },
    render: {
        pixelArt: false, // smooth scaling
        antialias: true, // prevent blurry text edges
    },
    scene: [Boot, Preloader, Menu, MyGame],
};

const StartGame = (parent) => {
    return new Phaser.Game({ ...config, parent });
};

export default StartGame;
