const express = require('express');
const router = express.Router();
const homeworkController = require('../controllers/homeworks.controller');

    router.get('/', homeworkController.getHomeworks);
    router.post('/', homeworkController.createHomework);
    router.get('/:id', homeworkController.getHomework);
    router.put('/:id', homeworkController.editHomework);
    router.delete('/:id', homeworkController.deleteHomework);

module.exports = router;
