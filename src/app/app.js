window.onload = function() {

    var ws = new WebSocket('ws://127.0.0.1/websocket');

    ws.onmessage = function(event) {

        var message = JSON.parse(event.data);
        document.getElementById(`room-${message._id}`).innerHTML = message.people;

    };
};
