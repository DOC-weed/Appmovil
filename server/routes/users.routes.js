const express = require('express');
const router = express.Router();
const userController = require('../controllers/Users.controller');


    // Login routing
    router.get('/', userController.getUsers);
    router.get('/profile', userController.profile);
    router.post('/', userController.createUser);
    router.get('/:id', userController.getUser);
    router.get('/register/:id/:array', userController.registercourse);
    router.put('/:id', userController.editUser);
    router.put('/imagen/:id/:image', userController.editImage);
    router.delete('/:id', userController.deleteUser);

    router.post('/login' , userController.login);



module.exports = router;
