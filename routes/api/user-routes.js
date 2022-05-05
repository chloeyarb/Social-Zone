const router = require('express').Router();

// imports functionality from controllers
const {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser
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

module.exports = router;    