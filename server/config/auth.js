module.exports = {
    ensureAuthenticated: function (req, res, next) {
        console.log(req._passport.instance);
        if (req.isAuthenticated()) {
            console.log("hello");
            return next();
        } else {
            res.redirect("/users/f");
        }
    },
    forwardAuthenticated: function (req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
    },
};
