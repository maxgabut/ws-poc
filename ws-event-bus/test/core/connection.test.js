const EventEmitter = require('events');

const Connection = require('app/core/connection');
const Repository = require('app/core/repository');
const Topic = require('app/core/topic');

const { describe, it } = require('mocha');
const { expect } = require('chai');
const sinon = require('sinon');

describe('Connection', () => {
    describe('constructor', () => {

        let topicRepository     = sinon.mock();
        let webSocketConnection = sinon.mock();

        it('should attribute an id', () => {
            expect(new Connection(topicRepository, webSocketConnection).id()).to.not.be.null;
        });
    });

    describe('when receiving message', () => {
        it('should subscribe to topic if possible', () => {

            let topic = new Topic('my-topic');
            sinon.stub(topic, 'on');
            let topicRepository = new Repository();
            topicRepository.save(topic);

            let webSocketConnection = new EventEmitter();

            let connection = new Connection(topicRepository, webSocketConnection);

            webSocketConnection.emit('message', JSON.stringify({action: 'join', data: 'my-topic'}));
            // upon reception of this message, a callback is added to the Topic
            expect(topic.on.calledWith('message', connection.sendRaw)).to.be.true;
        })
    });
});
