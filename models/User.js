const { Schema, model } = require('mongoose');

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
        match: [/.+\@.+\..+/]
        // validate: {
        //     validator: () => Promise.resolve(false),
        //     message: 'Not a valid email'
        // }
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

// UserSchema to create User model
const User = model('User', UserSchema);

module.exports = User;