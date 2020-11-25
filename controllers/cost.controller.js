const Cost = require('../models/model_of_cost');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const fs = require('fs');
const path = require('path');
const helpers = require('../helpers/index.js');
exports.create = async (req, res) => {
  if (req.file) {
    req.body.img = req.file.filename
  }
  const silence = new Cost(req.body);
  try {
    var cost = await silence.save()
    var cost_img = cost.img
    helpers.CopyFileFromTmpAndSave(cost_img)
    res.send(cost)
  } catch (err) {
    console.log(err);
    res.status(422).send(err)
  } finally {
    helpers.DeleteFileFromTmp()
  }
}
exports.update = (req, res) => {
  var id = req.params.id
  var update=req.params.update
  console.log(update);
    Cost.findByIdAndUpdate(id, {title:update} ,(err, docs) =>{
        if(err){
            res.send(err);
        } else {
            res.send("work");
        }
     });
}

exports.lookAll = (req, res) => {
  var searchBy = req.query.search
  queryParams = {}
  if (searchBy) {
    searchBy = searchBy.toLowerCase()
    const regex = new RegExp(searchBy, 'i')
    queryParams['title'] = regex
  }
  Cost.find(queryParams, (err, records) => {
    res.send(records)
  })
}

exports.remove= async (req, res) => {
  Cost.findOne({_id:req.params.id }, (err, record )=>{
    var appDir=path.dirname(require.main.filename)
    var photoPath= path.join(appDir, "uploads", record.img)
    fs.unlink(photoPath, err => {
      if (err) throw err;
    });
   });
   var result = await Cost.deleteMany({_id:req.params.id} )
   res.send(result)
}

exports.remove_all= (req, res) => {
  Cost.find({}, (err, records )=>{
    for (var record of records) {
      var appDir=path.dirname(require.main.filename)
      var photoPath= path.join(appDir, "uploads", record.img)
      fs.unlink(photoPath, err => {
        if (err) throw err;
      });
     }
   })
    Cost.deleteMany({}, function (err) {
    if (err) return handleError(err);
    res.send("work");
    });

}
