const BUZZ_VID = '1356';
const BUZZ_PID = '4096';
const DeviceDetector = require('./DeviceDetector');
const buzzDetector = new DeviceDetector(BUZZ_VID, BUZZ_PID);
const BuzzConnector = require('./BuzzConnector');
const Server = require("./Server");
const port = process.env.PORT || 3001;
const server = new Server(port);

let buzzer = false;
buzzDetector.on('connect', function() {
    console.log("BUZZER CONNECTED!");
    server.io.emit("buzzers", { connected: true });
    buzzer = new BuzzConnector();
    buzzer.on('press', function(ev) {
        // ev is an object with two attributes:
        // - controller: Number from 1 to 4
        // - button: Number from 0 to 4. 0 is the big red button.
        console.log(`Pressed ${ev.button} on controller ${ev.controller}`);
        io.emit("action", ev);
    })
})

buzzDetector.on('disconnect', function() {
    console.log("BUZZER DISCONNECTED!");
    server.io.emit("buzzers", { connected: false });
    buzzer.removeAllListeners();
    delete buzzer;
});

server.io.on('connection', (socket) => {
    console.log("CONNECTED SOCKET!");
    server.io.emit("buzzers", { connected: Boolean(buzzer) });
});
