let EventEmitter = require('events').EventEmitter;

function complexOperations() {
    let events = new EventEmitter();

    process.nextTick(() => {
        events.emit('success');
    });

    return events;
}

complexOperations().on('success', () => {
    console.log('success');
});
