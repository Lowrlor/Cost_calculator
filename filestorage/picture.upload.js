
var multer  = require('multer')
multer({ dest: 'uploads/' })
multer({ dest: 'tmp_img/' })
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'tmp_img')
  },
  filename: function (req, file, cb) {
    var extention = file.originalname.split(".")
    extention = extention[extention.length -1]
    cb(null, file.fieldname + '-' + Date.now() + "." + extention)
  }
})

var upload = multer({ storage: storage })
module.exports= upload
