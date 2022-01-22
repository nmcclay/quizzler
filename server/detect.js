const { EventEmitter } = require("events");
const usbDetect = require('usb-detection');

class DeviceDetector extends EventEmitter {
    constructor(vid, pid) {
        super();
        this.connected = false;
        this.detect(vid, pid);
    }

    detect(vid, pid) {
        usbDetect.startMonitoring();

        // Detect initial state
        usbDetect.find(vid, pid, (err, devices) => {
            if (!err && devices.length) {
                const device = devices.find(d => d.vendorId == vid && d.productId == pid);
                if (device) this.connect();
            }
        });

        // Detect add/insert
        usbDetect.on('add', (device) => {
            if (device.vendorId == vid && device.productId == pid) {
                this.connect();
            }
        });

        // Detect remove
        usbDetect.on('remove', (device) => {
            if (device.vendorId == vid && device.productId == pid) {
                this.disconnect();
            }
        });
    }

    connect() {
        if (!this.connected) {
            this.connected = true;
            this.emit("connect");
        }
    }

    disconnect() {
        if (this.connected) {
            this.connected = false;
            this.emit("disconnect");
        }
    }
}

module.exports = DeviceDetector;
