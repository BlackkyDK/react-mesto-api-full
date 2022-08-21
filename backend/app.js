const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { errors } = require('celebrate');
const cors = require('cors');
const { validateUserCreate, validateUserLogin } = require('./middlewares/celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const auth = require('./middlewares/auth');

const NotFound = require('./errors/NotFound');
const errorHandler = require('./middlewares/error-handler');

const app = express();
const { PORT = 3000 } = process.env;

const { createUser, login } = require('./controllers/users');

mongoose.connect('mongodb://localhost:27017/myDB');

app.use(cors({
  origin: [
    'https://klementeva.students.nomoredomains.sbs',
    'http://klementeva.students.nomoredomains.sbs',
    'http://localhost:3000',
    'https://locahost:3000',
    'http://localhost:3001',
    'https://locahost:3001',
  ],
  credentials: true,
  methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// app.use((req, res, next) => {
//   req.user = { _id: '62dee506a7aff95bb45c420d' };
//   next();
// });

app.use(requestLogger);
app.post('/signup', validateUserCreate, createUser);
app.post('/signin', validateUserLogin, login);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use(errorLogger);
app.use(errors());

app.use((req, res, next) => {
  next(new NotFound('Страница не найдена'));
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log('сервер Express запущен');
});
