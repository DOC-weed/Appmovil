const mongoose = require('mongoose');
const { Schema } = mongoose;
const Course = require('../models/Courses');

const homework = new Schema({

      nameHomework:{type:String,required: true},
      descriptionHomework:{type:String,required: true},
      fileName:{type:String,required: false},
      idCourse:{type:Schema.Types.ObjectId,ref:'Course',required:true}

    },
    {
      timestamps: true
    }
  )


module.exports = mongoose.model('Homeworks', homework);
