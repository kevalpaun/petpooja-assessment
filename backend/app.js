require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

app.use(cors());
app.use(bodyParser.json({ limit: '500mb' }));
app.use(express.json());
app.use(morgan('dev'));
app.use(require('./routes'));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
app.get('/', (req, res) => {
  res.send('PetPooja Assessment API');
});
const statusCodes = {
  OK: 200,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER: 500,
};
app.use((error, req, res, next) => {
  console.log('Error ==>', error);
  const status = error.statusCode || statusCodes.INTERNAL_SERVER;
  const message = error.message || 'Internal Server Error!';
  return res.status(status).json({ status, message });
});
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
