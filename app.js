var express = require('express')
var path = require('path')
var session = require('express-session')
var mongoose = require('mongoose')
var mongoStore = require('connect-mongo')(session)
var logger = require('morgan');
var port = process.env.PORT || 3000
var app = express()
var cookieParser = require('cookie-parser')
var dburl = 'mongodb://localhost:27017/wangnannan'

mongoose.connect(dburl)

app.set('views', '/root/nodeapp/app/views/pages')
app.set('view engine', 'jade')
app.use(cookieParser())
app.use(session({
    secret: 'jc',
    store: new mongoStore({
        url: dburl,
        collection: 'sessions'
    })
}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(require('body-parser').urlencoded({ extended: true }))
app.listen(port)
app.locals.moment = require('moment')

require('./config/routes')(app)

// if ('development' === app.get('env')) {
//     app.set('showStackError', true)
//     app.use(logger(':method :url :status'))
//     app.locals.pretty = true
//     mongoose.set('debug', true)
// }

console.log("服务启动")
