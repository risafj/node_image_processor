const AWS = require('aws-sdk');
const IM = require('imagemagick');
const fs = require('fs');
// const path = require('path');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'ap-northeast-1'
});

const uploadFile = './boggle.jpg'

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