const { Schema, model } = require('mongoose');
const date = require('date-and-time');

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: () => Promise.resolve(false),
            message: 'Not a valid email'
        }
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]

 },
 {
     toJSON: {
         virtuals: true,
         getters: true
     },
     id: false
 }
);

// Get a count of users friends with a virtual
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

// Create the User model using the UserSchema
const User = model('User', UserSchema);

module.exports = User;