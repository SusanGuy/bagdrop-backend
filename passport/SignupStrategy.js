const Strategy=require('passport-local').Strategy;
const bcrypt=require('bcrypt');
const saltRound=10;
const connection = require('../connection.js');

const SignupStrategy= new Strategy({passReqtoCallback:true},(username,password,done)=>{
    connection.query("SELECT * FROM users WHERE username = ? ",
    [username], (err, rows)=>{
        if(err){
            return done(err,null);
        }
        if(rows.length){
            return done('User already exists',null);
        }
        let newUser ={
        username,
        password: bcrypt.hashSync(password, saltRound)
        };
        let insertQuery = "INSERT INTO users (username, password) values (?, ?)";
        connection.query(insertQuery, [newUser.username, newUser.password],
            (err, rows)=>{
                if(err){
                    return done(err,null);
                }
             newUser.user_id = rows.insertId;

             return done(null, newUser);
            });
    })




});

module.exports =SignupStrategy;

