// import passport from 'passport';
// import passportLocal from 'passport-local';
// import { UserModel } from '../models/user.model';

// const loginFunction = async (
//   req: any,
//   username: any,
//   password: any,
//   done: any
// ) => {
//   const user = await UserModel.findOne({ username });

//   if (!user) {
//     return done(null, false, { message: 'User does not exist' });
//   }
//   if (!user.isValidPassword(password)) {
//     return done(null, false, { message: 'Password is not valid' });
//   }
//   console.log('Login OK');
//   return done(null, user);
// };
// const LocalStrategy = passportLocal.Strategy;

// const strategyOptions: any = {
//   usernameField: 'username',
//   passwordField: 'password',
//   passReqToCallback: true,
// };

// // passport.use('login', new LocalStrategy(strategyOptions, loginFunction));

// passport.serializeUser((user, done) => {
//   // done(null, user.id);
// });

// passport.deserializeUser((userId, done) => {
//   UserModel.findById(userId, function (err: any, user: any) {
//     done(err, user);
//   });
// });

// export const isLoggedIn = (req: any, res: any, done: any) => {
//   if (!req.user) return res.status(401).json({ msg: 'Unathorized' });
//   done();
// };

// export default passport;
