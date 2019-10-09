const Strategy=require('passport-google-oauth20').Strategy;
const keys=require('../config/keys')
//const connection = require('../connection.js');


const GoogleStrategy= new Strategy({
    callbackURL:'users/google/redirect',
    clientID:keys.google.clientID,
    clientSecret:keys.google.clientSecret
},()=>{

});
module.exports =GoogleStrategy;