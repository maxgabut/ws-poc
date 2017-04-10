const Topic = require('app/core/topic');

const { describe, it } = require('mocha');
const { expect } = require('chai');
const sinon = require('sinon');

describe('Topic', () => {
    describe('constructor', () => {
        it('should keep and expose id', () => {
            expect(new Topic('stuff').id()).to.eq('stuff');
        });
        it('should fail if id is absent', () => {
            expect(() => new Topic()).to.throw();
        });
        it('should fail if id is an empty string', () => {
            expect(() => new Topic('')).to.throw();
        });
        it('should fail if id is a blank string', () => {
            expect(() => new Topic('    ')).to.throw();
        });
        it('should fail if id is not a string', () => {
            expect(() => new Topic(42)).to.throw();
        });
    });

    describe('sendMessage', () => {
        it('should emit messages to listeners', () => {
            const spy = sinon.spy();
            const topic = new Topic('hal');
            topic.on('message', spy);

            topic.sendMessage('Hello !');

            expect(spy.called).to.eq(true);
            expect(spy.calledWith({topic: 'hal', data: 'Hello !'})).to.eq(true);
        });

        it('should emit last message to new listener', () => {
            const spy = sinon.spy();
            const topic = new Topic('hal');

            topic.sendMessage('one');
            topic.sendMessage('two');

            topic.on('message', spy);

            expect(spy.called).to.eq(true);
            expect(spy.calledWith({topic: 'hal', data: 'two'})).to.eq(true);
        });
    });
});
