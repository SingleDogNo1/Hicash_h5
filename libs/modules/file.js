var request = require('request');
var fs = require('fs');
var path = require('path');
var config = require(__base + 'src/config.json');
var gulp = require('gulp');
var imageResize = require('gulp-image-resize');
/**
 * 上传文件
 * @param file[File Object]: 上传的文件对象
 */
var upload = function(req, res) {
    //console.log('body====', req.body)
    var body = req.body;
    var file = req.body.file;
    var fileName = req.body.fileName;
    var imageBase64 = req.body.imageBase64;
    var uploadBeforeUrl = config.hicashServerUrl + '/HicashService/UploadPicBefore'

    var result = {};

    var options = {
      url: uploadBeforeUrl,
      form: body
    }

    request.post(options, function(err, r, body) {
        console.log('body==', body)
        if(!err && r.statusCode === 200 && JSON.parse(body).resultCode === '1') {
            console.log('3e3e3e3e3')
            var beforeBody = JSON.parse(body);
            var uploadFloderPath = process.cwd() + beforeBody.uploadFloderPath;
            var uploadFilePath = process.cwd() + beforeBody.uploadFilePath;
            var uploadFilePathThum = process.cwd() + beforeBody.uploadFilePathThum;
            var picName = beforeBody.picName;
            //var writeFile = function (imageBase64, uploadFilePath, picName, uploadFilePathThum) {
            var base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");
            var dataBuffer = new Buffer(base64Data, 'base64');
            var writeFile = function(imageBase64, uploadFilePath, picName, uploadFilePathThum) {
                fs.writeFile(uploadFilePath, dataBuffer, function(err) {
                    console.log(222)
                    resizeImages(uploadFilePath, picName, uploadFilePathThum);
                    var postData = {
                      'userName': req.body.userName,
                      'tempAppNo': req.body.tempAppNo,
                      'imgType': req.body.imgType,
                      'uploadType': req.body.uploadType,
                      'saveFilePath': beforeBody.saveFilePath,
                      'saveFilePathThum': beforeBody.saveFilePathThum,
                      'picName': beforeBody.picName,
                      'uuid': req.body.uuid
                    }
                    var uploadAfterUrl = config.hicashServerUrl + '/HicashService/UploadPicAfter';
                    var options = {
                      url: uploadAfterUrl,
                      form: postData
                    }
                    request.post(options, function(err, r, body) {
                      if(!err && r.statusCode === 200 && JSON.parse(body).resultCode === '1') {
                        var afterBody = JSON.parse(body);
                        result.picId = afterBody.picId;
                        result.resultCode = afterBody.resultCode;
                        result.saveFilePathThum = beforeBody.saveFilePathThum;
                        res.send(result, 200);
                      } else {
                        var afterBody = JSON.parse(body);
                        result.resultCode = afterBody.resultCode;
                        result.resultMsg = afterBody.resultMsg;
                        res.send(result, 200);
                      }
                    });
                });
            }
            //检查并创建'uploadFloderPath'目录
            if (!fs.existsSync(uploadFloderPath)) {
                console.log('not exists')
                // 递归创建目录 异步方法
                function mkdirs(dirname, callback) {
                    fs.exists(dirname, function (exists) {
                        if (exists) {
                            console.log('mkdirs exists');
                            callback();
                        } else {
                            mkdirs(path.dirname(dirname), function () {
                              fs.mkdir(dirname, callback);
                            });
                        }
                    });
                }
                mkdirs(uploadFloderPath, function() {
                    writeFile(imageBase64, uploadFilePath, picName, uploadFilePathThum);
                });
            } else {
              writeFile(imageBase64, uploadFilePath, picName, uploadFilePathThum);
            }
          //}
          // //检查并创建'uploadFloderPath'目录
          // if (!fs.existsSync(uploadFloderPath)) {
          //   console.log('not exists')
          //   // 递归创建目录 异步方法
          //   function mkdirs(dirname, callback) {
          //       fs.exists(dirname, function (exists) {
          //           if (exists) {
          //             console.log('mkdirs exists');
          //             writeFile(imageBase64, uploadFilePath, picName, uploadFilePathThum);
          //               callback();
          //           } else {
          //               mkdirs(path.dirname(dirname), function () {
          //                   fs.mkdir(dirname, callback);
          //               });
          //           }
          //       });
          //   }
          //   mkdirs(uploadFloderPath);
          // } else {
            //console.log('exists');
            //writeFile(imageBase64, uploadFilePath, picName, uploadFilePathThum);
          //}
        }
    });

    //var delay = Q.defer();

    //res.send(result, 200)

    //重命名临时文件并复制到指定路径
    // fs.rename(tmp_path, target_path + newName, function(err) {
    //   if (err) {
    //     logger.error(err)
    //     delay.reject(err);
    //   }

    //   //删除临时文件，并返回消息
    //   fs.unlink(tmp_path, function() {
    //     console.log('type====', type)
    //     if(type != 1 && type != 3 && type != 4){
    //       //封面或者编辑器内图片
    //       resizeImages(target_path,newName,type);
    //     }
    //     //要返回的数据
    //     var body = {
    //       origin_url: file_origin_url + newName,
    //       thumb_url:"",
    //       size: file.size,
    //       name: newName,
    //       type: file.type,
    //       original_name: file.name
    //     };

    //     delay.resolve(body);
    //   });
    // });

  //return delay.promise;
};

/**
*把上传的图片转换成两个大小的
普通图片转换成640px，如果是封面类型，需要多生成一个缩略图，大小是150px，
**/
var resizeImages = function  (directory, fileName, ThumDir) {
    console.log('directory=====', directory)
    var resize= gulp.src(directory)
    //封面需要生成缩略图
    resize.pipe(imageResize({
        width : 120,
        height : 90,
        crop : true,
        upscale : false,
        imageMagick:true
    })).pipe(gulp.dest(ThumDir));
}
exports.upload = upload;