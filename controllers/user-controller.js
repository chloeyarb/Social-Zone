const { User } = require('../models');

// Methods for functionality are placed in this variable
const userController = {
    // find method for all users
    getAllUsers(req, res) {
        User.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then(userData => res.json(userData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    // find method for one user. destructured the params
    getSingleUser({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: 'No user found.'});
                return;
            }
            res.json(userData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    // create method to post new user. destructered the body of of the express.js 'req' object
    createUser({ body }, res) {
        User.create(body)
        .then(userData => res.json(userData))
        .catch(err => res.status(400).json(err));
    },
    // add friends
    addFriends({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendId } },
            { new: true }
        )
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: 'No user found.'});
                return;
            }
            res.json(userData)
        })
        .catch(err => res.json(err));
    },
    // method to update user
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, {new: true})
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: 'No user found.'});
                return;
            }
            res.json(userData);
        })
        .catch(err => res.status(400).json(err));
    },
    // method to delete user
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: 'No user found.'});
                return;
            }
            res.json(userData);
        })
        .catch(err => res.status(400).json(err));
    },
    // delete friend
    deleteFriends({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId} },
            { new: true }
        )
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: 'No user found.'});
                return;
            }
            res.json(userData);
        })
        .catch(err => res.status(400).json(err));
    }

};

module.exports = userController;