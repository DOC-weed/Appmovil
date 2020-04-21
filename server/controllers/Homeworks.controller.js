const homework = require('../models/Homeworks');
const jwt = require('jsonwebtoken');
let bcrypt = require('bcrypt');


const homeworkController = {};

//GET ALL HOMEWORKS
homeworkController.getHomeworks = async (req, res) =>{

   const homeworks =  await homework.find();
   res.json(homeworks);

}

// /GET HOMEWORK BY ID
homeworkController.getHomework = async (req , res) =>{
    // verifyToken(req, res);
    const getHomework = await homework.find({idCourse:req.params.id});
    res.json(getHomework);
}

//CREATE A HOMEWORK
homeworkController.createHomework = async (req, res) => {

    const OneHomework = {
        nameHomework: req.body.nameHomework,
        fileName: req.body.fileName,
        descriptionHomework: req.body.descriptionHomework,
        idCourse:req.body.idCourse
    }
    const newHomework = new homework(OneHomework)
    await newHomework.save();

    ;
    res.json({
        status: "Homework saved",

    });

}

// /PUT update user
homeworkController.editHomework = async (req, res) =>{
    const {id} = req.params;

    const onehomework = {
      nameHomework: req.body.nameHomework,
      fileName: req.body.fileName,
      fileType: req.body.fileType,
      deliveryDate: req.body.deliveryDate,
      hourDeliveryDate: req.body.hourDeliveryDate
    };
    await homework.findByIdAndUpdate(id, {$set: onehomework}, {new:true} );
    res.json({
        status: "Homework Updated"
    })
}

//DELETE A COURSE BY ID
homeworkController.deleteHomework = async (req, res) =>{
    await homework.findByIdAndRemove(req.params.id);
    res.json({
        status: "Homework Deleted"
    })
}


module.exports = homeworkController;
