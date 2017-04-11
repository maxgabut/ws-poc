const Topic = require('app/core/topic');

const ArgumentValidator = require('argument-validator');

// extends Topic and export constructor since multiple instances may make sense.
class Countdown extends Topic {

    constructor(topicId, date) {
        ArgumentValidator.string(topicId);
        ArgumentValidator.type('Date', date);

        super(topicId);
        this._date = date;

        this.sendRemainingSeconds = this.sendRemainingSeconds.bind(this);
        setInterval(this.sendRemainingSeconds, 1000);
    }

    remainingSeconds() {
        const remainingSeconds = Math.round((this._date.getTime() - new Date().getTime()) / 1000);
        return Math.max(remainingSeconds, 0);
    }

    sendRemainingSeconds() {
        this.sendMessage(this.remainingSeconds());
    }
}

module.exports = Countdown;