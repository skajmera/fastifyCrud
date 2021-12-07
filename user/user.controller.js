const usersDataAccess = require("./user.dal");
require("dotenv").config();

exports.getUser = async (req) => {
  const _id = req.body._id;
  const users = await usersDataAccess.findUser({ _id: _id });
  return {
    error: false,
    sucess: true,
    message: "Get user",
    data: users,
  };
};

exports.createUser = async (req) => {
  const { email, password, first_name, last_name } = req.body;
  if (!password || !email || !first_name || !last_name) {
    throw new ExpressError(401, "Bad request");
  }
  const data = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
  };
  const storedUser = await usersDataAccess.storeUser(data);
  return {
    error: false,
    sucess: true,
    message: "user created successfully",
    data: storedUser,
  };
};

exports.updateUser = async (req, res) => {
  const _id = req.body._id;
  const updateData = {
    _id,
    toUpdate: {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
    },
  };
  const update = await usersDataAccess.updateUser(updateData);
  return {
    error: false,
    sucess: true,
    message: "updated user successfully",
    data: update,
  };
};

exports.deleteUser = async (req, res) => {
  const data = await usersDataAccess.deleteUser(req.body);
  return {
    error: false,
    sucess: true,
    message: "delete user successfully",
    data: data,
  };
};
