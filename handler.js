const AWS = require('aws-sdk');
const im = require('imagemagick');
const fs = require('fs');
// const path = require('path');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'ap-northeast-1'
});

im.resize({
  srcPath: 'boggle.jpg',
  dstPath: 'boggle_resized.jpg',
  width: 120,
  height: 120
}, function(err, stdout, stderr){
     if (err) throw err;
     console.log('Resized the image successfully');
});

const uploadFile = './boggle_resized.jpg'

const params = {
  Bucket: 'source-image-bois',
  Body : fs.createReadStream(uploadFile),
  Key : 'boggle.jpg'
};

s3.upload(params, function (err, data) {
  if (err){
    console.log(err);
  }

  if (data){
    console.log('Successfully uploaded in:', data.Location)
  }
});