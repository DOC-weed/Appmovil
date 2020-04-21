const course = require('../models/Courses');
const jwt = require('jsonwebtoken');
let bcrypt = require('bcrypt');


const courseController = {};


//GET ALL COURSES
courseController.getCourses = async (req, res) =>{

   const courses =  await course.find({estatus:true});
   res.json(courses);

}

//GET COURSE BY ID
courseController.getCoursePersona = async (req , res) =>{
    // verifyToken(req, res);
    const getCourseOne = await course.find({idPersona:req.params.id});
    res.json(getCourseOne);
}
courseController.getCourseregistardo = async (req , res) =>{
    let array = req.params.array;
    for (var i = 0; i < array.length-1; i++) {
      const getCourseOne = await course.find({_id:array[i]});
    }
    res.json(getCourseOne);
}

courseController.getCourse = async (req , res) =>{
    // verifyToken(req, res);
    const getCourseOne = await course.findById(req.params.id);
    res.json(getCourseOne);
}

//CREATE A COURSE
courseController.createCourse = async (req, res) => {

    const OneCourse = {
        nameCourse: req.body.nameCourse,
        topicCourse: req.body.topicCourse,
        descriptionCourse  : req.body.descriptionCourse,
        days  : req.body.days,
        date  : req.body.date,
        hour: req.body.hour,
        place: req.body.place,
        idPersona: req.body.idPersona,

    }
    const newCourse = new course(OneCourse)
    await newCourse.save();

    res.json({
        status: "Course saved",
        //name: req.params._id
    });

}

//EDIT A COURSE BY ID
courseController.editCourse = async (req, res) =>{
    const {id} = req.params;

      const oneCourse = {
        nameCourse: req.body.nameCourse,
        topicCourse: req.body.topicCourse,
        descriptionCourse  : req.body.descriptionCourse,
        days  : req.body.days,
        date  : req.body.date,
        hour: req.body.hour,
        place: req.body.place

    };
    await course.findByIdAndUpdate(id, {$set: oneCourse}, {new:true} );
    res.json({
        status: "Course Updated"
    })
}

courseController.editMessage = async (req, res) =>{
  let id = req.params.id;
  let msg = req.params.msg;

  //   const oneCourse = {
  //     nameCourse: req.body.nameCourse,
  //     topicCourse: req.body.topicCourse,
  //     descriptionCourse  : req.body.descriptionCourse,
  //     days  : req.body.days,
  //     date  : req.body.date,
  //     hour: req.body.hour,
  //     place: req.body.place,
  //     Messages:msg

  // };
  await course.update({_id: id},{$set:{Messages: msg}}, (err, resp) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            resp
        });
    });
  // await course.findByIdAndUpdate(id, {$set: oneCourse}, (err,));
  // res.json({
  //     status: "Course Updated With Message"
  // })

    // res.json({
    //     status: "Course Updated with message"
    // })
}

//DELETE A COURSE BY ID
courseController.deleteCourse = async (req, res) =>{
    await course.findByIdAndRemove(req.params.id);
    res.json({
        status: "Course Deleted"
    })
}


module.exports = courseController;
