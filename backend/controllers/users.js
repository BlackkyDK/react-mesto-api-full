const { JWT_SECRET, NODE_ENV } = process.env;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const BadRequest = require('../errors/BadRequest');
const Conflict = require('../errors/Conflict');
const NotFound = require('../errors/NotFound');

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
        .then((userData) => res.status(201).send({
          email: userData.email,
          name: userData.name,
          about: userData.about,
          avatar: userData.avatar,
          _id: userData._id,
        }))
        .catch((err) => {
          if (err.code === 11000) {
            next(new Conflict('Такой email уже занят'));
          } else if (err.name === 'ValidationError') {
            next(new BadRequest('Переданы некорректные данные при создании пользователя'));
          } else {
            next(err);
          }
        });
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, `${NODE_ENV === 'production' ? JWT_SECRET : 'super-secret'}`, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      next(err);
    });
};

const getUserId = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        next(new NotFound('Пользователь по указанному _id не найден.'));
      } else res.send(user);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return next(new BadRequest('Переданы некорректные данные пользователя _id.'));
      } return next(err);
    });
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        next(new NotFound('Пользователь с таким _id не найден.'));
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные пользователя.'));
      } else {
        next(err);
      }
    });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        next(new NotFound('Пользователь не найден.'));
      } else res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные пользователя.'));
      } else {
        next(err);
      }
    });
};

const getCurrentUser = (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      if (!user) {
        throw new NotFound('Пользователь по указанному _id не найден.');
      }
      return res.send({
        user: {
          email: user.email,
          name: user.name,
          avatar: user.avatar,
          about: user.about,
          _id: user._id,
        },
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Передан некорректный _id пользователя.'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getUsers,
  createUser,
  getUserId,
  updateUser,
  updateAvatar,
  getCurrentUser,
  login,
};
