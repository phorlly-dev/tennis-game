const Instances = {
    game: {
        width: 1024,
        height: 600,
        max_score: 10,
        player_speed: 600,
        ball_speed: 400,
        bot_speed: 200,
        running: "GameRunning",
        paused: "GamePaused",
        you_win: "YouYin",
        bot_win: "BotWin",
    },
    scene: {
        menu: "game-menu",
        boot: "game-boot",
        preload: "game-preload",
        start: "game-start",
        over: "game-over",
    },
    control: {
        up: "up-btn",
        down: "down-btn",
        play: "play-btn",
        pause: "pause-btn",
        desktop: "desktop-btn",
        mobile: "mobile-btn",
        on: "on-btn",
        off: "off-btn",
        card: "controls-card",
        ui: "ui",
    },
    image: {
        key: {
            bg: "background",
            left: "paddle-left",
            right: "paddle-right",
            ball: "ball",
        },
        value: {
            bg: "images/bg.png",
            left: "images/left.png",
            right: "images/right.png",
            ball: "images/ball.png",
        },
    },
    audio: {
        key: {
            pong_beep: "pong-beep",
            pong_plop: "pong-plop",
            splash: "splash",
            playing: "playing",
        },
        value: {
            pong_beep: "audios/pong_beep.ogg",
            pong_plop: "audios/pong_plop.ogg",
            splash: "audios/splash.ogg",
            playing: "audios/playing.mp3",
        },
    },
};

export const { game, scene, control, image, audio } = Instances;
export const { width, height, max_score, player_speed, ball_speed, bot_speed, running, paused, you_win, bot_win } =
    game;
export const { menu, boot, preload, start, over } = scene;
export const { up, down, play, pause, desktop, mobile, on, off, card, ui } = control;
