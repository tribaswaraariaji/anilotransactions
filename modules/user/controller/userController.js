const userService = require("../services/userService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const passportJWT = require("passport-jwt");
const { json, query } = require("express");
const saltRounds = bcrypt.genSaltSync(10);
const myPlaintextPassword = "s0//P4$$w0rD";
const bodyParser = require ("body-parser");
const responseFormatter = require("../../../responses/responses");
const { updateData } = require("../services/userService");

const userController = {
  getUser: (req, res, next) => {
    res.json(req.user);
  },

  getCustomer: async (req, res, next) => {
    try {
      const data = await userService.getCustomer(req);
      const cek = await userService.cekAll(req);
      if (!cek) {
        return responseFormatter.badRequest(
          res,
          null,
          "User tidak ditemukan",
          404
        );
      }
      return responseFormatter.success(res, data, "User ditemukan", 200);
    } catch (error) {
      return responseFormatter.error(res, null, "internal server error", 500);
    }
  },

  login: async (req, res, next) => {
    try {
      const { username, password } = req.body;
  
      if (username && password) {
        let user = await userService.getUserByUsername(username);
        
        // console.log({admin})
        if (!user) {
          res.status(400).json({ message: "Username Salah" });
        }
  
        const passwordUser = await bcrypt.compareSync(password, user.password)
  
        if (passwordUser) {
          jwt.sign({user}, 'secretkey', { expiresIn: '3600s'}, (err, token) => {
            res.json({
              message: 'Login Berhasil',
              token
            });
          });
        } else {
          res.status(400).json({ message: "Password salah" });
        }
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },
};

module.exports = userController;
