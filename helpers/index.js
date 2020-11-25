const fs = require('fs');
const path = require('path');
exports.DeleteFileFromTmp = function () {
  var appDir=path.dirname(require.main.filename)
  var directory=path.join(appDir,"tmp_img")
  fs.readdir(directory, (err, files) => {
    if (err) throw err;
    for (const file of files) {
      fs.unlink(path.join(directory, file), err => {
        if (err) throw err;
      });
    }
  });
}
exports.CopyFileFromTmpAndSave = function (cost_img) {
  var appDir=path.dirname(require.main.filename)
  var sourse=path.join(appDir,"tmp_img",cost_img)
  var dest=path.join(appDir,"uploads",cost_img)
  fs.copyFileSync(sourse, dest);
}
