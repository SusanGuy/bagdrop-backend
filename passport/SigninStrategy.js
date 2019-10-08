const Strategy=require('passport-local').Strategy;
const bcrypt=require('bcrypt');
const connection = require('../connection.js');


const LoginStrategy= new Strategy((username,password,done)=>{
connection.query("SELECT * FROM users WHERE username = ? ",
[username], (err, rows)=>{
    if(err){

        return done(err,null);
    }
    if(!rows.length){

        return done('No user found',null);
    }
    const isPassportValid = bcrypt.compareSync(password, rows[0].password);
    if (!isPassportValid){
       ;
        return done("Password doesn't match",null);
    }

    return done(null, rows[0])


})
});
module.exports =LoginStrategy;