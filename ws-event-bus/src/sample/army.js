const Topic = require('app/core/topic');

// intanciate a topic and export this instance : no one need this thing twice
let topic = new Topic('the-army');

let first = true;

function produceArmyData() {

    let lyric = first ? "Your're in the army now" : "Howouhow";
    first = !first;
    return lyric;
}

setInterval(() => {topic.sendMessage(produceArmyData())}, 2500);

module.exports = topic;