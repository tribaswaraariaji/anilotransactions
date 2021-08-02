// const passport = require("passport");
// // const adminService = require("../../modules/user/userServices");
// const JwtStrategy = require("passport-jwt").Strategy,
// ExtractJwt = require("passport-jwt").ExtractJwt;
// const keys = require('./keys');

// const opts = {};
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = process.env.SECRET;

// passport.use(
//   new JwtStrategy(opts, async (jwt_payload, done) => {
//     try {
//       console.log(jwt_payload);
//       const admin = await adminService.getAdminById(jwt_payload.data.id);
//       console.log(jwt_payload);

//       if (!admin) {
//         return done(null, false);
//       }

//       const data = {
//         id: admin.id,
//         username: admin.username,
//         role: admin.role,
//       };

//       return done(null, data);
//     } catch (error) {
//       return done(null, error);
//     }
//   })
// );

// module.exports = passport.initialize();
