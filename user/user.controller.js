const usersDataAccess = require("./user.dal");
const {generateAccessToken}=require('../utils/jwt')
require("dotenv").config();

exports.getUser = async (req) => {
  const _id = req.body._id;
  const users = await usersDataAccess.findUser({ _id: _id });
  const token=generateAccessToken({_id:users._id})
  return {
    error: false,
    sucess: true,
    message: "Get user",
    data: users,
    token:token
  };
};

exports.createUser = async (req) => {
  const { email, password, firstName, lastName } = req.body;
  if (!password || !email || !firstName || !lastName) {
    throw new ExpressError(401, "Bad request");
  }
  const data = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
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
      firstName: req.body.firstName,
      lastName: req.body.lastName,
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

exports.passportLogin = async (req) => {
  try{
  const storedUser = await usersDataAccess.storeUser(req);
  return {
    error: false,
    sucess: true,
    message: "user created successfully",
    data: storedUser,
  }}catch(err){
    console.log('already exist');
    return ("you are already exist")
  }
};