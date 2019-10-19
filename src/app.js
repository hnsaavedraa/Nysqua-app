const express = require("express");
const cors = require("cors");
const app = express();
const passport = require("passport");
var usersRouter = require('./routes/user.route');
var signInRouter = require('./routes/signInRouter');
var signUpRouter = require('./routes/signUpRouter');
var oauth = require('./routes/oauth');
var assistantRouter = require('./routes/assistant.route');
const bodyParser = require('body-parser');

//settings
var port = process.env.PORT || "3001"
app.set("port", port);

//midleware
app.use(cors());
//app.use(express.json());



var jsonParser = bodyParser.json({ limit: 1024 * 1024 * 20, type: 'application/json' });
var urlencodedParser = bodyParser.urlencoded({ extended: true, limit: 1024 * 1024 * 20, type: 'application/x-www-form-urlencoded' })

app.use(jsonParser);
app.use(urlencodedParser);
app.use(passport.initialize());
app.use(passport.session());

app.use('/users', usersRouter);
app.use('/signIn', signInRouter);
app.use('/signUp', signUpRouter);
app.use('/authentication', oauth)
app.use('/assistant', assistantRouter)

module.exports = app;