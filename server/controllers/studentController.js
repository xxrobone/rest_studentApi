require('../models/db');
const Student = require('../models/student');

/**
 * /api/students
 * GET all students
 */
exports.listStudents = async (req, res) => {
  let { limit = 10, page = 1, classes, q } = req.query;
  const queryLimit = parseInt(limit);
  const skip = (page - 1) * limit;

  let query = {};
  // a query set in student model, used here to be able to query anything using ?q=<text>
  if (q) {
    query = { $text: { $search: q } };
  }
  if (classes) query.classes = classes;
  try {
    // created a search query to be able to search for everything in the data base
    const students = await Student.find(query).limit(queryLimit).skip(skip);

    // to set dynamic request qurey you can specify it in the req.query and then apply in the find functions like below
    /*  const students = await Student.find({ classes: classes })
      .limit(queryLimit)
      .skip(skip);
 */
    res.json({ page: page, limit: queryLimit, students });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

// POST, add student to db
exports.insertStudent = async (req, res) => {
  const newStudent = new Student({
    name: req.body.name,
    email: req.body.email,
    adress: req.body.adress,
    classes: req.body.classes,
    thumbnail: req.body.thumbnail,
  });

  try {
    await newStudent.save();
    res.json(newStudent);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

// update student thru id
exports.updateStudent = async (req, res) => {
  let paramID = req.params.id;
  let name = req.body.name;
  let email = req.body.email;
  let adress = req.body.adress;
  let classes = req.body.classes;
  let thumbnail = req.body.thumbnail;
  try {
    const updateStudent = await Student.updateOne(
      { _id: paramID },
      { name: name },
      { email: email },
      { adress: adress },
      { classes: classes },
      { thumbnail: thumbnail }
    );
    res.json(updateStudent);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

// delete single student using the id
exports.deleteStudent = async (req, res) => {
  let paramID = req.params.id;
  try {
    const deleteStudent = await Student.deleteOne({ _id: paramID });
    res.json(deleteStudent);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

// function used to set some students in the db
/* async function insertStudents() {
  try {
    await Student.insertMany([
      {
        name: 'burta Stain',
        email: 'rullbert@rb.com',
        adress: 'rullbert vägen 102, 13661 spånga',
        classes: ['hiphop', 'locking', 'modernt', 'jazz'],
        thumbnail: 'rullbert.png',
      },
      {
        name: 'yasmine bessie',
        email: 'jeeesus@rb.com',
        adress: 'Arenavägen 2, 10201 johanneshov',
        classes: ['street', 'tap', 'modernt', 'jazz'],
        thumbnail: 'jess.png',
      },
      {
        name: 'carla arla',
        email: 'bm@rb.com',
        adress: 'unserious street 102, 102 10 stockholm',
        classes: ['balett', 'locking', 'modernt', 'jazz'],
        thumbnail: 'bob.png',
      },
      {
        name: 'tim bom',
        email: 'bm@rb.com',
        adress: 'yeah street 102, 102 10 stockholm',
        classes: ['balett', 'locking', 'modernt', 'jazz'],
        thumbnail: 'bob.png',
      },
      {
        name: 'usman marla',
        email: 'bm@rb.com',
        adress: 'random street 102, 102 10 stockholm',
        classes: ['balett', 'locking', 'modernt', 'jazz'],
        thumbnail: 'bob.png',
      },
      {
        name: 'abdulla ahmad',
        email: 'bm@rb.com',
        adress: 'urban street 102, 102 10 stockholm',
        classes: ['balett', 'locking', 'modernt', 'jazz'],
        thumbnail: 'bob.png',
      },
      {
        name: 'carlos ruiz',
        email: 'bm@rb.com',
        adress: 'johsnsson street 102, 102 10 stockholm',
        classes: ['balett', 'locking', 'modernt', 'jazz'],
        thumbnail: 'bob.png',
      },
      {
        name: 'peter paker',
        email: 'bm@rb.com',
        adress: 'turn street 10, 102 10 stockholm',
        classes: ['balett', 'locking', 'modernt', 'jazz'],
        thumbnail: 'bob.png',
      },
    ]);
  } catch (error) {
    console.log(error);
  }
}

insertStudents(); */
