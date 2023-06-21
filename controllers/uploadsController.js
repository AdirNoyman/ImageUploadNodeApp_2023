const path = require('path');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

const uploadProductImage = async (req, res) => {
  // check if file exists
  console.log('Req files: ', req.files);
  if (!req.files) {
    throw new CustomError.BadRequestError('No file uploaded 🤨');
  }

  const productImage = req.files.image;

  // check file format (by mimetype)
  if (!productImage.mimetype.startsWith('image/')) {
    throw new CustomError.BadRequestError('Invalid file format 🤨');
  }

  // check file size(in bytes)
  const productAllowedSize = 1024 * 1024;

  if (productImage.size > productAllowedSize) {
    throw new CustomError.BadRequestError('File size too big 🤨');
  }

  const imagePath = path.join(
    __dirname,
    '../public/uploaded_images/' + `${productImage.name}`
  );
  console.log('The image path is ', imagePath);
  // move the uploaded product image to the the folder we want on the server
  await productImage.mv(imagePath);
  res
    .status(StatusCodes.OK)
    .json({ image: { src: `/uploaded_images/${productImage.name}` } });
};

module.exports = {
  uploadProductImage,
};
