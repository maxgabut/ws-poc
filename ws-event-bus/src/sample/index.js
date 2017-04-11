const Server = require('app/core/server');

const YearlyCountdown = require('app/sample/yearly-countdown');
const army            = require('app/sample/army');

new Server({port: 8910, topics: [
    // http://geekdays.com/ has much potential for high quality countdowns, do they have APIs ?
    new YearlyCountdown('may-the-fourth-countdown',         /* may  */ 4, 4),
    new YearlyCountdown('talk-like-a-pirate-day-countdown', /* sept */ 8, 9),
    army
]});
