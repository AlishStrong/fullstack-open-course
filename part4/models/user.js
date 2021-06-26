const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minLength: 3,
    unique: true
  },
  password: {
    type: String,
    minLength: 3
  },
  name: String,
  blogs: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Blog'
  }]
});

userSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
