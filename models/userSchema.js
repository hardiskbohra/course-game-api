var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  userType: {type: String, required: true},
  username: {type: String, required: true, unique: true, dropDups: true},
  password: {type: String, required: true},
  contact: {type: Number, required: true},
  specialization: {type: String, required: false},
  university: {type: String, required: false},
  city: {type: String, required: true},
  country: {type: String, required: true},
  facultyType: {type: String, required: false},
  programme: {type: String, required: false},
  studentId: {type: Number, required: false},
  year: {type: Number, required: false},
  semester: {type: Number, required: false}
});

var User = mongoose.model('User', userSchema);
module.exports = User;
