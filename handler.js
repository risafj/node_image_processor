const AWS = require('aws-sdk');
const im = require('imagemagick');
const fs = require('fs');
const promisify = require('util');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'ap-northeast-1'
});

// The 'async' in the line below automatically transforms the func into a Promise.
async function resize() {
  im.resize({
    srcPath: 'boggle.jpg',
    dstPath: 'boggle_resized.jpg',
    width: 120,
    height: 120
  }, function(err, stdout, stderr){
      if (err) throw err;
      console.log('Resized the image');
  });
}

const fileForUpload = './boggle_resized.jpg';

const params = {
  Bucket: 'source-image-bois',
  Body : fs.createReadStream(fileForUpload),
  Key : 'boggle_resized.jpg'
};

function upload() {
  s3.upload(params, function (err, data) {
    if (err){
      console.log(err);
    }

    if (data){
      console.log('Successfully uploaded to:', data.Location)
    }
  });
}

async function resizeAndUpload(){
  await resize()
  upload()
}

resizeAndUpload()