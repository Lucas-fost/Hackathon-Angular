"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var body_parser_1 = require("body-parser");
var compression = require("compression");
var express = require("express");
var path = require("path");
var http = require("http");
var session = require("express-session");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var passport = require("passport");
var passportConfig = require("./config/passport");
var userController = require("./controllers/user");
var MongoStore = require('connect-mongo')(session);
var app = express();
app.disable('x-powered-by');
app.use(body_parser_1.json());
app.use(compression());
app.use(body_parser_1.urlencoded({ extended: true }));
// This will tell the server the place from where to render static files related to angular code
app.use(express.static(path.join(__dirname, './../client')));
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://localhost:27017/test');
mongoose.connection.on('error', function (err) {
    console.error(err);
    console.log('%s MongoDB connection error. Please make sure MongoDB is running.');
    process.exit();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'sessionsecret',
    cookie: { maxAge: 1209600000 },
    store: new MongoStore({
        url: 'mongodb://localhost:27017/test',
        autoReconnect: true,
    })
}));
app.use(passport.initialize());
app.use(passport.session());
app.post('/login', userController.postLogin);
app.get('/logout', userController.logout);
app.get('/api/members', passportConfig.isAuthenticated, userController.getMembers);
app.get('/api/members/member/:id', passportConfig.isAuthenticated, userController.getMember);
app.get('/api/authcheck', passportConfig.isAuthenticated, userController.checkAuth);
// All the requests will be send to angular routing if the route is not present on the server/api
app.use('/*', express.static(path.join(__dirname, './../client/index.html')));
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    next(err);
});
// production error handler
// no stacktrace leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        error: {},
        message: err.message,
    });
});
// Get port from environment and store in Express.
var port = normalizePort(process.env.PORT || 4000);
app.set('port', port);
// Create HTTP server.
var server = http.createServer(app);
// Listen on provided port, on all network interfaces.
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
// Normalize a port into a number, string, or false.
function normalizePort(val) {
    var normalizedPort = parseInt(val, 10);
    if (isNaN(normalizedPort)) {
        // named pipe
        return val;
    }
    if (normalizedPort >= 0) {
        // port number
        return normalizedPort;
    }
    return false;
}
// Event listener for HTTP server 'error' event.
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
// Event listener for HTTP server 'listening' event.
function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    console.log('Server is running on localhost:' + addr.port);
}
//# sourceMappingURL=www.js.map