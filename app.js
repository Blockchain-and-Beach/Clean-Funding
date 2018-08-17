const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const session = require('express-session');
const db = require('./lib/db');

const charge = require('./routes/charge');
const login  = require('./routes/login');
const payment = require('./routes/payment');
const post = require('./routes/post');
const signUp = require('./routes/signUp');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(helmet());
app.use(compression());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: 'Clean-Funding Project',
    resave : false,
    saveUninitialized: true,
    cookie : {secure : true}
}));
app.use(express.static(path.join(__dirname, 'public')));

db();

app.use('/',post);
app.use('/login',login);
app.use('/signUp',signUp);
app.use('/payment',payment);
app.use('/charge',charge);

// catch 404 and forward to error handler
app.use((req, res, next)=>{
    next(createError(404));
});

// error handler
app.use((err, req, res) =>{
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
