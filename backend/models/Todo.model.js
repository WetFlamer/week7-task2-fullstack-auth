const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
  text: String,
  completed: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User'
  },
});

const Todo = mongoose.model("Todo", usersSchema);

module.exports = Todo;
