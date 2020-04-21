const mongoose = require('mongoose');
const { Schema } = mongoose;

const users = new Schema({
    // email: {type: String, required: true},
    // password: {type: String, required:true}

    name: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, unique:true, required: true},
    password: {type: String, required:true},
    matricula: {type: String, required: true},
    rol: {type: String, required: true},
    image:{type:String, required:false,default:""},
    Cursos:{type:Array,requied: false}
},{
    timestamps: true
});


module.exports = mongoose.model('Users', users);
