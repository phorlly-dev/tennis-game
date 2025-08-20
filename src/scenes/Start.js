import {
  AUTO,
  Game,
  Scale,
} from 'phaser';

import {
  GAME_HEIGHT,
  GAME_WIDTH,
} from '../consts/keys';
import Boot from './Boot';
import MyGame from './MyGame';
import Preloader from './Preloader';
import TileScreen from './TileScreen';

//  Find out more information about the Game Config at:
//  https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config = {
    type: AUTO,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    parent: "game-container",
    backgroundColor: '#1a252f',
    scale: {
        mode: Scale.FIT,
        autoCenter: Scale.CENTER_BOTH,
        width: GAME_WIDTH,
        height: GAME_HEIGHT
    },
    physics: {
        default: 'arcade',
        arcade: { gravity: { y: 0 }, debug: false }
    },
    scene: [Boot, Preloader, TileScreen, MyGame],
};

const StartGame = (parent) => {
    return new Game({ ...config, parent });
};

export default StartGame;
