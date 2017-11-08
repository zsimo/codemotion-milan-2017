import _ from 'underscore';
import EventEmitter from 'events';
import AppDispatcher from '../dispatcher/AppDispatcher';
import ClientConstants from '../constants/ClientConstants';

const EVENTS = {
    CHANGE: 'CHANGE',
};

// init rooms global state
const rooms = [];
_(5).times((n) => { rooms.push({ _id: `${n + 1}`, people: '0' }) });

// init store with emit events
const ClientStore = Object.assign({}, EventEmitter.prototype, {
    rooms() {
        return rooms;
    },
    emitChangeRooms() {
        this.emit(EVENTS.CHANGE);
    },
    addChangeRoomsListener(callback) {
        this.on(EVENTS.CHANGE, callback);
    },
    removeChangeRoomsListener(callback) {
        this.removeListener(EVENTS.CHANGE, callback);
    },
});

// business logic
const updateRoom = (newRoom) => {
    _.findWhere(rooms, { _id: newRoom._id }).people = newRoom.people;
    ClientStore.emitChangeRooms();
};

// register store to dispatcher
AppDispatcher.register((action) => {
    switch (action.actionType) {
    case ClientConstants.NEW_MESSAGE:
        updateRoom(action.message);
        break;
    default:
        // no op
        break;
    }
});

export default ClientStore;
