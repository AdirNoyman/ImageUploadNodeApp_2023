const path = require('path');
const { StatusCodes } = require('http-status-codes');

const uploadProductImage = async (req, res) => {
  const productImage = req.files.image;
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
