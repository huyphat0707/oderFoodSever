const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/users.model");
const bcrypt = require("bcrypt");

const register = passport=>{
    passport.use(
        "register",
        new LocalStrategy({
            usernameField:"email",
            passwordField:"password",
            passReqToCallback:true
        },
        (req,email,password, done)=>{
            const createAccount = ()=>{
                User.findOne({
                    email: email
                },
                (err,user)=>{
                    if(err)return done(err);

                    if(user){
                        return done (
                            null,
                            false,
                            req.flash("message", "Email already exists ")
                        );
                    }else{
                        let userInfo = new User();
                        
                        userInfo.email = email;
                        userInfo.name = req.param("name");
                        userInfo.password = createHash(password) //Tạo pass dạng mã hoá

                        userInfo.save(err =>{
                            if(err){
                                console.log(err.message);
                                throw err;
                            }
                            return done(null , userInfo);
                        });
                    }
                });
            };
            process.nextTick(createAccount);
        }
        )
    );
    const createHash = password =>{
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10),null);
    };
};

module.exports = register;