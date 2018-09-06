var Movie = require('../models/movie')
// 首页
exports.index=function(req, res){

    Movie.fetch(function (err, movies) {
        if (err) {
            console.log(err)
        }
        res.render('index', {
            title: '首页',
            index: 0,
            movies: movies
        })
    })
}
