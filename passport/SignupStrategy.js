const Strategy=require('passport-local').Strategy;
const bcrypt=require('bcrypt');
const saltRound=10;
const connection = require('../connection.js');

const SignupStrategy= new Strategy({passReqToCallback:true},(req,username,password,done)=>{

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
        firstname:req.body.fname,
        lastname:req.body.lname,
        email:req.body.email,
        email1:req.body.email1,
        password: bcrypt.hashSync(password, saltRound),
        type:req.body.type,


        };
        let insertQuery = "INSERT INTO users (username,first_name,last_name,email,email_confirmed,password,user_type) values (?,?,?,?,?,?,?)";
        connection.query(insertQuery, [newUser.username, newUser.firstname, newUser.lastname, newUser.email, newUser.email1, newUser.password,newUser.type],
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

