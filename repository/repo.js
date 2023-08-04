const { DelBoy, Menu, Order, User } = require("../model/foodGraph");

const findAllUsers = async () => {
  return await User.find();
};

const findAllDelBoys = async () => {
  return await DelBoy.find();
};

const findMenuItems = async (page, limit) => {
  let skip = (page - 1) * limit;
  return await Menu.find().skip(skip).limit(limit);
};

const finditemByCategory = async (category, page, limit) => {
  let skip = (page - 1) * limit;
  return await Menu.find({ category: category }).skip(skip).limit(limit);
};

const findItemsByName = async (name) => {
  return await Menu.find({
    itemName: { $regex: new RegExp(name, "i") },
  }).limit(5);
};

const findOrderdetailsById = async (orderId) => {
  const od = await Order.find({ orderId: orderId });
  if (!od[0]) {
    throw new Error("invalid orderId");
  }
  return od;
};

const createUser = async (user) => {
  return await User.create(user);
};

const createDelBoy = async (delboy) => {
  return await DelBoy.create(delboy);
};

const createMenu = async (menu) => {
  await Menu.create(menu);
};

const deleteMenu = async (itemId) => {
  const deletedData = await Menu.findOneAndDelete({
    itemId: itemId,
  });
  if (!deletedData) {
    throw new Error("item is not present or already got deleted");
  }
  return deletedData;
};

const deletedelBoy = async (id) => {
  const deletedDelBoy = await DelBoy.findOneAndDelete({ id: id });
  if (!deletedDelBoy) {
    throw new Error("DeliveryBoy is not present or already got deleted");
  }
  return deletedDelBoy;
};

const updateDelStatus = async (id, status) => {
  const updatedDelBoy = await DelBoy.findOneAndUpdate(
    { id: id },
    { Status: status }
  );
  if (!updatedDelBoy) {
    throw new Error("DeliveryBoy is not present with this Id");
  }
  return updatedDelBoy;
};

const deleteUserById = async (id) => {
  const deletedUser = await User.findOneAndDelete({ id: id });
  if (!deletedUser) {
    throw new Error("User is not present with this Id or already deleted");
  }
  return deletedUser;
};

const createOrder = async (order) => {
  await Order.create(order);
};

const findUserById = async (userId) => {
  const existUser = await User.findOne({ id: userId });
  return existUser;
};

const findMenuByItemId = async (item) => {
  return await Menu.find({ itemId: item });
};

const findDelBoyStatus = async () => {
  return await DelBoy.findOne({ Status: "Available" });
};

module.exports = {
  findAllUsers,
  findDelBoyStatus,
  findUserById,
  findMenuByItemId,
  findAllDelBoys,
  deleteUserById,
  updateDelStatus,
  findMenuItems,
  createOrder,
  finditemByCategory,
  findItemsByName,
  findOrderdetailsById,
  createUser,
  createDelBoy,
  createMenu,
  deleteMenu,
  deletedelBoy,
};
