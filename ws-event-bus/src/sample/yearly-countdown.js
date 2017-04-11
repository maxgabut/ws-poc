const Countdown = require('app/sample/countdown');

const ArgumentValidator = require('argument-validator');

// countdown for a specific day of the year
// counted down in second, for extra uselessness
class YearlyCountdown extends Countdown {

    // beware, month is 0 based (0 is january, 1 is february, etc...)
    constructor(topicId, month, day) {

        ArgumentValidator.number(month);
        ArgumentValidator.number(day);

        let date = new Date();
        date.setMonth(month);
        date.setDate(day); // Date.setDate sets the day...
        if (date - new Date() < 0) {
            date.setFullYear(date.getFullYear() + 1);
        }

        super(topicId, date);
    }
}

module.exports = YearlyCountdown;