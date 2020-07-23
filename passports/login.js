const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/users.model");
const bcrypt = require("bcrypt");

const login = passport =>{
    passport.use(
        "login",
        new LocalStrategy({
            usernameField: "email",
            passwordField: "password",
            passReqToCallback: true
        },
        (req,email,password, done)=>{
            User.findOne({
                email: email
            },
            (err,user)=>{
                if(err) return done(err);

                if(!user){
                    return done(
                        null,
                        false,
                        req.flash("message", "Email does not exits!")
                    );
                }

                if(!isValidPassword(user,password)){
                    return done(
                        null,
                        false,
                        req.flash( "message",
                        "Email or Password is incorrect!")
                    )
                }

                return done(null,user);
            });
        })
    );

    const isValidPassword = (user,password) =>{
        return bcrypt.compareSync(password,user.password)
    }
};

module.exports = login;