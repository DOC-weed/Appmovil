const express = require('express');
const router = express.Router();
const courseController = require('../controllers/Courses.controller');

  router.get('/', courseController.getCourses);
   router.post('/', courseController.createCourse);
   router.get('/:id', courseController.getCourse);
   router.get('/persona/:id', courseController.getCoursePersona);
   router.get('/registrados/:array', courseController.getCourseregistardo);
   router.put('/:id', courseController.editCourse);
  router.get('/mensaje/:id/:msg', courseController.editMessage);
   router.delete('/:id', courseController.deleteCourse);

module.exports = router;
