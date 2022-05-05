const { User } = require('../models');

// Methods for functionality are placed in this variable
const userController = {
    // find method for all users
    getAllUsers(req, res) {
        User.find({})
        .then(userData => res.json(userData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    // find method for one user. destructured the params
    getSingleUser({ params }, res) {
        User.findOne({ _id: params.id })
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: 'No user found with this id.'});
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
    // method to update user
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, {new: true})
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: 'No user found with this id.'});
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
                res.status(404).json({ message: 'No user found with this id.'});
                return;
            }
            res.json(userData);
        })
        .catch(err => res.status(400).json(err));
    }

};

module.exports = userController;