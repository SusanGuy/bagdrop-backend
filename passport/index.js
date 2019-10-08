const passport=require('passport');
const connection = require('../connection.js');

// passport.serializeUser((user,done)=>{
//     done(null, user.user_id);
// })

// passport.deserializeUser((user,done)=>{
//     connection.query("SELECT * FROM users WHERE user_id = ? ", [id],
//     (err, rows)=>{
//      done(err, rows[0]);
//     });
// })

//import all strategies
const SignupStrategy=require('./SignupStrategy')
const SigninStrategy=require('./SigninStrategy')


passport.use('local-signup',SignupStrategy)
passport.use('local-signin',SigninStrategy)

module.exports=passport;