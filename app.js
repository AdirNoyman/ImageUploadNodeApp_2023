require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');

// database
const connectDB = require('./db/connect');

// product router
const productRouter = require('./routes/productRoutes');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
// set the folder files we want to be publicley available
app.use(express.static('./public'));
// load the request body from the request object
app.use(express.json());
// load the file sent in the request object
app.use(fileUpload());

app.get('/', (req, res) => {
  res.send('<h1>File Upload Starter</h1>');
});

app.use('/api/v1/products', productRouter);

// middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3001;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
