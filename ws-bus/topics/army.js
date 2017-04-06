const Topic = require('../topic');

let topic = new Topic('the-army', (connection) => {
    topic.pushToOne(connection, 'Welcome to the army !');
});


let first = true;

function produceArmyData() {

    let lyric = first ? "Your're in the army now" : "Howouhow";
    first = !first;
    return lyric;
}

setInterval(() => {topic.pushToAll(produceArmyData())}, 1000);

module.exports = topic;