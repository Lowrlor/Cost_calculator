require('dotenv').config()
var uri = process.env.MONGO_URI
const express = require('express')
const app = express()
const controller_cost = require('./controllers/cost.controller.js');

var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


const Cost = require('./models/model_of_cost');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const silence = new Cost({
  title: '   Moya Persha PokuPka   ',
  happy_code: 'asdasd'
});

const upload = require('./filestorage/picture.upload.js');

mongoose.connect(uri , { useNewUrlParser: true, useUnifiedTopology: true }, function(err){
    if(err) return console.log(err);
    app.listen(2000, function(){
        console.log("Сервер ожидает подключения...");
    });
});

app.delete('/remove/:id', controller_cost.remove)
app.delete('/remove_all', controller_cost.remove_all)

app.get('/', controller_cost.lookAll)
app.get('/:id/:update', controller_cost.update)

app.post('/', upload.single('picture'), controller_cost.create)
