const mongoose = require('mongoose');
const { Schema } = mongoose;
const Persona = require('../models/Users');



const courses = new Schema({

      nameCourse:{type:String,required: true},
      topicCourse:{type:String,required: true},
      descriptionCourse:{type:String,required: false},
      days:{type:Array,required:true},
      date:{type:Date,required:true},
      hour:{type:String,required:true},
      place:{type:String,required:true},
      idPersona:{type:Schema.Types.ObjectId,ref:'Persona',required:true},
      Messages:{type:String,required:false,default:""},
      estatus:{type:Boolean, required:false,default:true}
    },
    {
      timestamps: true
    }
  )


module.exports = mongoose.model('Courses', courses);
