const bodyParser = require('body-parser');
const express = require('express');
const dbConnect = require('./src/config/dbConnect');
const app = express();
const cors = require('cors');
const helmet = require('helmet');

const router = require('./src/routes');

const { notFound, errorHandler } = require('./src/middlewares/errorHandler');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

dbConnect();

app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(router);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
