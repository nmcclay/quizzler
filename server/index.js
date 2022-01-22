const BUZZ_VID = '1356';
const BUZZ_PID = '4096';
const DeviceDetector = require('./detect');
const buzzDetector = new DeviceDetector(BUZZ_VID, BUZZ_PID);
const BuzzConnector = require('./connect');

let buzzer = false;
buzzDetector.on('connect', function() {
    console.log("BUZZER CONNECTED!");
    buzzer = new BuzzConnector();
    buzzer.on('press', function(ev) {
        console.log('Button ' + ev.button + ' on controller ' + ev.controller + ' pressed');
    });
});

buzzDetector.on('disconnect', function() {
    console.log("BUZZER DISCONNECTED!");
    buzzer.removeAllListeners();
    delete buzzer;
})

