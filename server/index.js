const BUZZ_VID = '1356';
const BUZZ_PID = '4096';
const DeviceDetector = require('./DeviceDetector');
const buzzDetector = new DeviceDetector(BUZZ_VID, BUZZ_PID);
const BuzzConnector = require('./BuzzConnector');

let buzzer = false;
buzzDetector.on('connect', function() {
    console.log("BUZZER CONNECTED!");
    buzzer = new BuzzConnector();
    buzzer.on('press', function(ev) {
        // ev is an object with two attributes:
        // - controller: Number from 1 to 4
        // - button: Number from 0 to 4. 0 is the big red button.
        console.log('Button ' + ev.button + ' on controller ' + ev.controller + ' pressed');
    });
});

buzzDetector.on('disconnect', function() {
    console.log("BUZZER DISCONNECTED!");
    buzzer.removeAllListeners();
    delete buzzer;
})
