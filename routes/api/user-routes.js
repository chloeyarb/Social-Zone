const router = require('express').Router();

// imports functionality from controllers
const {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    deleteFriends,
    addFriends
} = require('../../controllers/user-controller');

// Get all and POST
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

// Get one , PUT, DELETE
router
    .route('/:id')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

// router
//     .route('/:userId/friends')
//     .post(addFriends)

router
    .route('/:userId/friends/:friendId')
    .post(addFriends)
    .delete(deleteFriends)

module.exports = router;    