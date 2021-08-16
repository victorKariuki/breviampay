var io = require("../public/assets/plugins/socketio/socket.io.min");

function SocketHeandler(url) {
    var self = this;
    var socket = null;
    var socketon = false;
    var authretry = false;
    this.startSocket = function () {
        if (socket === null) {
            socket = io.connect(url);
            socketon = true;
            socket.on("connect_error", socketError);
            socket.on("reconnect_error", socketError);
            socket.on("error", socketError);
            socket.on("updates", function (resp) {
                switch (resp.data.label) {
                    case "error":
                        if (
                            !authretry &&
                            resp.hasOwnProperty("msg") &&
                            resp.msg == "auth"
                        ) {
                            authretry = true;
                            self.stopSocket();
                            self.startSocket();
                            return;
                        }
                        break;
                }
            });
        }
    };

    function socketError() {
        if (socketon) {
            // A fix for mod_proxy_wstunnel causing error on disconnect
            console.log("Update feed could not be connected, \nyou will not receive realtime updates!");
            self.stopSocket();
            self.startSocket();
        }
    }

    this.stopSocket = function () {
        if (socket !== null) {
            socketon = false;
            authretry = false;
            socket.disconnect();
            socket = null;
        }
    };
}
module.exports = SocketHeandler;