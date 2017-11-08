import EnvProps from './class/EnvProps';
import ClientActions from './actions/ClientActions';

class Api {
    initWebSocket() {
        const displayWebSocket = new WebSocket(`${(location.protocol === 'https:') ? 'wss' : 'ws'}://${location.hostname}/${EnvProps.displaySubPath}`);

        displayWebSocket.onmessage = (message) => {
            ClientActions.newMessage(JSON.parse(message.data));
        };

    }
}

export default new Api();
