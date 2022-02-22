import { json, urlencoded } from 'body-parser';
import * as compression from 'compression';
import * as express from 'express';
import * as path from 'path';
import * as http from 'http';
import * as session from 'express-session';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as passport from 'passport';

import * as passportConfig from './config/passport';
import * as userController from './controllers/user';

const MongoStore = require('connect-mongo')(session);

const app: express.Application = express();

app.disable('x-powered-by');

app.use(json());
app.use(compression());
app.use(urlencoded({ extended: true }));

// This will tell the server the place from where to render static files related to angular code
app.use(express.static(path.join(__dirname, './../client')));

// Mongoose DB middleware setup
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://localhost:27017/test');
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.');
  process.exit();
});

// Express Session middleware setup (for Passport)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'sessionsecret',
  cookie: { maxAge: 1209600000 }, // two weeks in milliseconds
  store: new MongoStore({
    url: process.env.MONGODB_URI || 'mongodb://localhost:27017/test',
    autoReconnect: true,
  })
}));
app.use(passport.initialize());
app.use(passport.session());

// Server API endpoints
app.post('/login', (<any>userController).postLogin);
app.get('/logout', (<any>userController).logout);
app.post('/signup', (<any>userController).postSignup);
app.get('/api/members', (<any>passportConfig).isAuthenticated, (<any>userController).getMembers);
app.get('/api/members/member/:id', (<any>passportConfig).isAuthenticated, (<any>userController).getMember);
app.get('/api/authcheck', (<any>passportConfig).isAuthenticated, (<any>userController).checkAuth);

// All the requests will be send to angular routing if the route is not present on the server/api
app.use('/*', express.static(path.join(__dirname, './../client/index.html')));

// catch 404 and forward to error handler
app.use((req: express.Request, res: express.Response, next) => {
  const err = new Error('Not Found');
  next(err);
});

// production error handler
// no stacktrace leaked to user
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {

  res.status(err.status || 500);
  res.json({
    error: {},
    message: err.message,
  });
});

// Get port from environment and store in Express.
const port = normalizePort(process.env.PORT || 4000);
app.set('port', port);

// Create HTTP server.
const server = http.createServer(app);

// Listen on provided port, on all network interfaces.
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

// Normalize a port into a number, string, or false.
function normalizePort(val): boolean | number {
  const normalizedPort = parseInt(val, 10);

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

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

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
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;

  console.log('Server is running on localhost:' + <any>addr.port);
}



