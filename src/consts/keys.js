const key_values = {
  scene: {
    preloader: 'preloader',
    tile_screen: 'tile-screen',
    main_menu: 'main-menu',
    my_game: 'my-game',
    game_over: 'game-over',
    background: 'background',
    boot: 'boot',
  },
  image: {
    key: {
      bg: 'background',
      left: 'paddle-left',
      right: 'paddle-right',
      ball: 'ball',
    },
    path: {
      bg: 'assets/images/bg.png',
      left: 'assets/images/left.png',
      right: 'assets/images/right.png',
      ball: 'assets/images/ball.png',
    }
  },
  audio: {
    key: {
      pong_beep: 'pong-beep',
      pong_plop: 'pong-plop',
    },
    path: {
      pong_beep: 'assets/audios/pong_beep.ogg',
      pong_plop: 'assets/audios/pong_plop.ogg',
    }
  },

}

// Game states
const GAME_STATE = {
  RUNNING: "running",
  PAUSED: "paused",
  PLAYER_WON: "player_won",
  AI_WON: "ai_won",
};

// Game constants
const GAME_WIDTH = 1024;
const GAME_HEIGHT = 600;
const PADDLE_SPEED = 500;
const BALL_SPEED = 400;
const AI_SPEED = BALL_SPEED / 4;
const MAX_SCORE = 10;

export {
  AI_SPEED,
  BALL_SPEED,
  GAME_HEIGHT,
  GAME_STATE,
  GAME_WIDTH,
  key_values,
  MAX_SCORE,
  PADDLE_SPEED,
};