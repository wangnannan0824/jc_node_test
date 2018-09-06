var User = require('../models/user')
// 退出
exports.logout = function (req, res) {
    delete req.session.user
    // delete app.locals.user
    res.redirect('/')
}

// 登录
exports.login = function (req, res) {
    var _user = req.body.user
    var name = _user.name
    var password = _user.password
    User.findOne({ name: name }, function (err, user) {
        if (err) {
            console.log(err)
        }
        if (user) {
            user.comparePassword(password, function (err, isMatch) {
                if (err) {
                    console.log(err)
                }
                if (isMatch) {
                    req.session.user = user
                    return res.redirect('/')
                } else {
                    console.log('密码错误')
                }
            })
        } else {
            console.log('shibai')
        }
    })
}
// 注册
exports.signup = function (req, res) {
    var _user = req.body.user
    User.find({ name: _user.name }, function (err, user) {
        if (err) {
            console.log(err)
        }
        if (user.length) {
            console.log('用户名重复')
        } else {
            var userobj = new User(_user)
            userobj.save(function (err, user) {
                if (err) {
                    console.log(err)
                }
                console.log(user)
                // res.redirect('/')
            })
        }
    })

}
exports.signinRequired = function (req, res, next) {
    var user = req.session.user
    if (!user) {
        return res.redirect('/')
    }
    next()
}
exports.adminRequired = function (req, res, next) {
    // var user = req.session.user
    // if (user.role <= 10 || user.role) {
    //     return res.redirect('/')
    // }
    next()
}