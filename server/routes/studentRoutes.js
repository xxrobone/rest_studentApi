const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// APP routes
// get
router.get('/api/students/', studentController.listStudents);
router.post('/api/students/', studentController.insertStudent);
router.patch('/api/students/:id', studentController.updateStudent);
router.delete('/api/students/:id', studentController.deleteStudent);

// post

// update

// delete

// export router
module.exports = router;
