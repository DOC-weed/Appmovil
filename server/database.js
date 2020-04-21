const mongoose = require('mongoose');

const URI = 'mongodb://localhost/courses';

mongoose.connect(URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
})
    .then(db => console.log("DB is conected"))
    .catch(err => console.error(err))
module.exports = mongoose;
