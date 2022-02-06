const DeviceDetector = require('./DeviceDetector');
const BuzzConnector = require('./BuzzConnector');
const Server = require("./Server");
const BUZZ_VID = '1356';
const BUZZ_PID = '4096';

class Quizzler {
    constructor(port, verbose = false) {
        this.verbose = verbose;
        this.detector = new DeviceDetector(BUZZ_VID, BUZZ_PID);
        const server = new Server(port);
        this.io = server.io;
        this.buzzer = false;
        this.addListeners();
    }

    addListeners() {
        this.detector.on('connect', this.buzzerConnected.bind(this));
        this.detector.on('disconnect', this.buzzerDisconnected.bind(this));
        this.io.on('connection', this.socketConnected.bind(this));
    }

    socketConnected(socket) {
        this.log("CONNECTED SOCKET!")
        this.io.emit("buzzers", { connected: Boolean(this.buzzer) });
    }

    buzzerConnected() {
        this.log("BUZZER CONNECTED!")
        this.io.emit("buzzers", { connected: true });
        this.buzzer = new BuzzConnector();
        this.buzzer.on('press', (ev) => {
            // ev is an object with two attributes:
            // - controller: Number from 1 to 4
            // - button: Number from 0 to 4. 0 is the big red button.
            this.log(`Pressed ${ev.button} on controller ${ev.controller}`)
            this.io.emit("action", ev);
        });

        this.buzzer.on('error', function(err) {
            throw new Error("Error from Buzz Controller!", err);
        });
    }

    buzzerDisconnected() {
        this.log("BUZZER DISCONNECTED!")
        this.io.emit("buzzers", { connected: false });
        this.buzzer.removeAllListeners();
        delete this.buzzer;
    }

    log(message) {
        if (this.verbose) console.log(message);
    }

}

module.exports = Quizzler;
