const Instances = {
    game: {
        width: 1024,
        height: 600,
        maxScore: 10,
        ballSpeed: 400,
        playerSpeed: 500,
        botSpeed: 300,
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
            play: "play",
        },
        value: {
            bg: "assets/images/bg.png",
            left: "assets/images/left.png",
            right: "assets/images/right.png",
            ball: "assets/images/ball.png",
            play: "assets/images/play.png",
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
            pongBeep: "assets/audios/pong_beep.ogg",
            pongPlop: "assets/audios/pong_plop.ogg",
            splash: "assets/audios/splash.ogg",
            playing: "assets/audios/playing.mp3",
        },
    },
};

export default Instances;
