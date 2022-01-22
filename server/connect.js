const { EventEmitter } = require("events");
const buzzBuzzers = require('buzz-buzzers');

class BuzzConnector extends EventEmitter {
    constructor() {
        super();
        this.buzzers = this.connectToBuzzer();
        this.addEventListeners();
    }

    connectToBuzzer() {
        let retries = 3;
        let success = false;
        while (retries-- > 0 && !(success = this.attemptConnect())) {
            setTimeout(function() {
                console.log("Unable to connect to BUZZ device... retrying!");
            }, 1000);
        }
        return success;
    }

    attemptConnect() {
        try {
            return buzzBuzzers();
        } catch (e) {
            return false;
        }
    }

    addEventListeners() {
        // Get notified when a button is pressed
        this.buzzers.onPress((ev) => {
            // ev is an object with two attributes:
            // - controller: Number from 1 to 4
            // - button: Number from 0 to 4. 0 is the big red button.
            // console.log('Button ' + ev.button + ' on controller ' + ev.controller + ' pressed');
            this.emit('press', ev);
        });

        // Get notified when a button is released
        this.buzzers.onRelease((ev) => {
            // console.log('Button ' + ev.button + ' on controller ' + ev.controller + ' released');
        });

        // Get notified when an error happens
        this.buzzers.onError((err) => {
            // console.log('Error: ', err);
        });
    }
}

module.exports = BuzzConnector;
