const db = require("../../../config/database");

const userService = {
  getUser : (all) => {
    const user = db("user").select("userID","username","password","role","name");
    return user;
  },
  getUserByUsername: (username) => {
    const user = db("user").where("username", username).first();
    return user;
  },
  getUserById: (userID) => {
    const user = db("user").where("userID", userID).first();
    return user;
  },
  getUserByPassword: (password) => {
    const user = db("user").where("password", password).first();
    return user;
  },
  cek: (userID) => {
    const data = db("user").select("*").where({ userID }).first();
    return data;
  },
  cekRole: async (role) => {
    const data = db("user").select("*").where({role : 'customer', role : 'admin'}).first();
    return data;
  },
  getCustomer: async (all) => {
    const data = await db("user").select("*").where({role : 'customer'});
    return data;
  },
  cekAll: (req) => {
    const data = db("user").select("*").first();
    return data;
  },
};

module.exports = userService;
