const User = require("../models/user.js");

module.exports.renderSignupForm =  (req, res) => {
    if (req.headers.referer && !req.session.redirectUrl) {
        req.session.redirectUrl = req.headers.referer;
    }
    res.render("users/signup.ejs");
};

module.exports.signup = async (req, res, next) => {
    try {
        let {username, email, password} = req.body;
        const newUser = new User({username, email});    
        const registeredUser = await User.register(newUser, password);
        // console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if(err) {
                return next(err);
            }
            req.flash("success", "Welcome to Wanderlust");
            let redirectUrl = res.locals.redirectUrl || "/wanderlust";
            res.redirect(redirectUrl);
        });
    } catch(err) {
        req.flash("error", err.message);
        res.redirect("/wanderlust/account/signup");
    }
};

module.exports.renderLoginForm = (req, res) => {
    if (req.headers.referer && !req.session.redirectUrl) {
        req.session.redirectUrl = req.headers.referer;
    }
    res.render("users/login.ejs")
};

module.exports.login = (req, res) => {
    req.flash("success", "Welcome back to Wandelust!");
    let redirectUrl = res.locals.redirectUrl || "/wanderlust";
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
    req.logOut((err) => {
        if(err) {
            return next(err);
        }
        req.flash("success", "You are logged out!");
        res.redirect("/wanderlust");
    })
};