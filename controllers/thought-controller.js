const { Thought, User } = require('../models');

const thoughtController = {
    // find method for all user
    getAllThoughts(req, res) {
        Thought.find({})
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
            res.json(dbPizzaData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    // New thought
    createThought({ body }, res) {
        Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: body.userId },
                { $push: { thoughts: _id} },
                { new: true }
            );
        })
        .then(thoughtData => {
            if (!thoughtData) {
                res.status(404).json({ message: 'No user found.'});
                return;
            }
            res.json(thoughtData);
        })
        .catch(err => res.json(err));
    },
}

module.exports = thoughtController;