const Strategy=require('passport-google-oauth20').Strategy;
const keys=require('../config/keys')
const connection = require('../connection.js');


const GoogleStrategy= new Strategy({
    callbackURL:'/users/google/redirect',
    clientID:keys.google.clientID,
    clientSecret:keys.google.clientSecret
},(accessToken,refreshToken,profile,done)=>{
   google_id= profile._json.sub
   google_fname=profile._json.given_name
   google_lname=profile._json.family_name
    google_email=profile._json.email;

    connection.query("SELECT * FROM users WHERE email = ? ",
    [google_email], (err, rows)=>{
        if(err){
            return done(err,null);
        }
        if(rows.length){
            return done('User already exists',null);
        }
let newUser={
        username:google_id,
        firstname:google_fname,
        lastname:google_lname,
        email:google_email,
        email1:google_email,
}

let insertQuery = "INSERT INTO users (username,first_name,last_name,email,email_confirmed) values (?,?,?,?,?)";
connection.query(insertQuery, [newUser.username, newUser.firstname, newUser.lastname, newUser.email, newUser.email1],
    (err, rows)=>{
        if(err){
            return done(err,null);
        }
     newUser.user_id = rows.insertId;

     return done(null, newUser);
    });
    })

});
module.exports =GoogleStrategy;