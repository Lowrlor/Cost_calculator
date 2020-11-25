const mongoose = require('mongoose');
const costSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Текст помилки required'],
    minlength: [6, 'short title'],
    lowercase: true,
    trim: true,
  },
  happy_code:{
    type: String,
    minlength: [6, 'short title']
  },
  cost:{
    type: String,
    required: [true, 'Ціна обовязкова'],
  },
  img:{
    type: String,
    required: [true, 'Фото обовязкове'],
  }
});
costSchema.path('img').validate(function (value, respond) {
  var img = value.split(".")
  if (img[img.length -1]=="img" || img[img.length -1]=="jpg") {
    return
  }else {
      return err.errors['img'].value; // undefined
  }
})
const Cost = mongoose.model('Cost', costSchema);
module.exports = Cost
