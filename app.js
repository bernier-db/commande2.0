var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var db = mongoose.connection;

mongoose.connect('mongodb://localhost/resto');

var routes = require('./routes/index');
var menu = require('./routes/menu');
var gestion = require('./routes/gestion');
var plan = require('./routes/plan');


var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Socket middleware
app.use(function(req, res, next){
  res.io = io;
  next();
});

app.use('/', routes);
app.use('/menu', menu);
app.use('/gestion', gestion);
app.use('/plan', plan);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// Socket.io events
var clients = {};
io.on('connection', function (socket) {    
    
    socket.on('log', function (data) {
        
        io.emit('log', data);
    });
    
    socket.on('help', function (message) {

        io.emit("help", message);
    });
    socket.on('msg', function (message) {
        console.log(message);
        io.emit("msg", message);
    });
    socket.on('coming', function(data) {
        
        io.emit('coming', data);
    });
    
});


module.exports ={ app: app, server:server};
