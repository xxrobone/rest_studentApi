const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// APP routes
// get
router.get('/api/students/', studentController.listStudents);

// post

// update

// delete

// export router
module.exports = router;
