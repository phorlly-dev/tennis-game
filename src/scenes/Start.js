import * as Phaser from "phaser";
import Boot from "./Boot";
import GameEngine from "./Game";
import Preloader from "./Preloader";
import Menu from "./Menu";
import { height, width } from "../consts";

//  Find out more information about the Game Config at:
//  https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig

const config = {
    type: Phaser.AUTO,
    width: width,
    height: height,
    backgroundColor: "#1a252f",
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
        default: "arcade",
        arcade: { gravity: { x: 0, y: 0 }, debug: false },
    },
    render: {
        pixelArt: false, // smooth scaling
        antialias: true, // prevent blurry text edges
    },
    scene: [Boot, Preloader, Menu, GameEngine],
};

const StartGame = (parent) => {
    return new Phaser.Game({ ...config, parent });
};

export default StartGame;
