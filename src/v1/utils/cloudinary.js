const cloudinary = require('cloudinary').v2;

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const cloudinaryUploadImg = async (fileToUploads) => {
  return new Promise((resolve) => {
    const res = cloudinary.uploader.upload(fileToUploads);

    res
      .then((data) => {
        resolve(
          {
            url: data.secure_url,
          },
          {
            resource_type: 'auto',
          },
        );
      })
      .catch((err) => {
        console.log('err: ', err);
      });
  });
};

module.exports = cloudinaryUploadImg;
