const User = require("./user.model");

const findUser = async (data) => {
  const user = await User.findById(data);
  return user;
};

const storeUser = async (userToStore) => {
  const storedUser = await User.create(userToStore);
  return storedUser;
};

const updateUser = async (userData) => {
  const user = await User.findByIdAndUpdate(
    userData._id,
    { $set: userData.toUpdate },
    { new: true }
  );
  return user;
};

const deleteUser = async (data) => {
  const user = await User.deleteOne({ _id: data._id });
  return user;
};

module.exports = { findUser, storeUser, updateUser, deleteUser };
