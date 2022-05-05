const { Schema, model, Types } = require('mongoose');
const date = require('date-and-time');

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtValue) => date(createdAtValue).format(now, 'MMM DD YYYY HH:mm')
    },
    username: {
        type: String,
        required: true
    },
    reactions: 
        [reactionSchema]
});

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtValue) => date(createdAtValue).format(now, 'MMM DD YYYY HH:mm')
    }
});

// Virtual for length of thoughts
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

// ThoughtSchema to create Though model
const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
