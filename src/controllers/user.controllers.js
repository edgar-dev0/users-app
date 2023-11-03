const catchError = require('../utils/catchError');
const User = require('../models/User');

const getAll = catchError(async(req, res) => {
  const users = await User.findAll();
  return res.json(users);
});

const create = catchError(async(req, res) => {
  const { first_name, last_name, birthday, email, password } = req.body;
  const user = await User.create({
    first_name: first_name,
    last_name: last_name,
    birthday: birthday,
    email: email,
    password: password
  });
  return res.status(201).json(user);
});

const getOne = catchError(async(req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  return res.status(200).json(user);
});

const remove = catchError(async(req, res) => {
  const { id } = req.params;
  await User.destroy({ where: { id:id } });
  return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
  const { id } = req.params;
  const { first_name, last_name, birthday, email, password } = req.body;
  const user = await User.update(
    { first_name, last_name, birthday, email, password },
    { where: { id: id }, returning: true }
  );
  return res.json(user[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}