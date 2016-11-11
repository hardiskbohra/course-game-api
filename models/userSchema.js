var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  userType: {type: String, required: false},
  username: {type: String, required: false},
  password: {type: String, required: false, unique: true},
  contact: {type: Number, required: false},
  specialization: {type: String, unique: true, lowercase: true, required: true},
  university: {type: String, required: true},
  city: {type: String, required: false},
  country: {type: String, required: true},
  facultyType: {type: String, required: true},
  programme: {type: String, required: false},
  studentId: {type: Number, required: false},
  year: {type: Number, required: false},
  semester: {type: Number, required: false}
});

var User = mongoose.model('User', userSchema);
module.exports = User;
