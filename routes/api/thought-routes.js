const router = require('express').Router();

const {
    getAllThoughts,
    getSingleThought,
    createThought
} = require('../../controllers/thought-controller');

router
    .route('/')
    .get(getAllThoughts)
    .post(createThought);

router
    .route('/:id')
    .get(getSingleThought);
    
module.exports = router;    