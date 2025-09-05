const Instances = {
    game: {
        width: 1024,
        height: 600,
        maxScore: 10,
        playerSpeed: 600,
        ballSpeed: 400,
        botSpeed: 200,
        running: "GameRunning",
        paused: "GamePaused",
        youWin: "YouYin",
        botWin: "BotWin",
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
            pongBeep: "pong-beep",
            pongPlop: "pong-plop",
            splash: "splash",
            playing: "playing",
        },
        value: {
            pongBeep: "audios/pong_beep.ogg",
            pongPlop: "audios/pong_plop.ogg",
            splash: "audios/splash.ogg",
            playing: "audios/playing.mp3",
        },
    },
};

export default Instances;
