const { Thought, User } = require('../models');

const thoughtController = {
    // find method for all user
    getAllThoughts(req, res) {
        Thought.find()
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then(thoughtData => res.json(thoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        }); 
    },
    // find method for one thought by id
    getSingleThought({ params}, res) {
        Thought.findOne({ _id: params.id })
        .populate({
            path: 'reactions',
            select: '__v'
        })
        .select('-__v')
        .then(thoughtData => {
            if (!thoughtData) {
                res.status(404).json({ message: 'No user found.'});
                return;
            };
            res.json(thoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    // New thought
    createThought({ body }, res) {
        Thought.create(body)
        .then(({ thoughtData }) => {
            return User.findOneAndUpdate(
                { _id: body.userId },
                { $push: { thoughts: thoughtData._id} },
                { new: true }
            );
        })
        .then( userData => {
            if (!userData) {
                res.status(404).json({ message: 'No user found.'});
                return;
            }
            res.json(userData);
        })
        .catch(err => res.json(err));
    },
    // update thought
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(thoughtData => {
            if (!thoughtData) {
                res.status(404).json({ message: 'No thought found.'});
                return;
            }
            res.json(thoughtData);
        })
        .catch(err => res.json(err));
    },
    // delete thought
    deleteThought({ params}, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then(thoughtData => res.json(thoughtData))
        .catch(err => res.json(err));
    }
};

module.exports = thoughtController;