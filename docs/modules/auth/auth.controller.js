const UserModel = require("./auth");

const createUser = async ({ userName }) => {
  const user = await UserModel.create({ userName });
  return user;
};

const getUsers = async ({ page, limit }) => {
  // page = 1, offset = 0
  // page = 2, offset = (page - 1) * limit
  const offset = (page - 1) * limit;
  const users = await UserModel
    .find()
    .skip(offset)
    .limit(limit)
    .sort({ createdAt: -1 })
  
  const total = await UserModel.find().count();
  
  return { data: users, total };
}
const getUser = async (userName) => {
  const foundUser = await UserModel
    .findById(userName)

  if (!foundUser) throw new Error('Not found post');
  
  return foundUser;
} 
const updateUser = async (id,userName, active) => {
  const update = await UserModel.findByIdAndUpdate(id, { userName: userName, active: active });

  return update;

}
module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser
};
