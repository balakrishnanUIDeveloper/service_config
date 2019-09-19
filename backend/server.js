var express = require('express');
var cors = require('cors');
var fs = require('fs');
var bodyParser = require('body-parser');
var busboy = require('connect-busboy');
var mongoose = require('mongoose');
// for login authentication
const path = require('path');
const passport = require('passport');

// file imports
const config = require('./config/config');
var serviceRoute = require('./models/serviceConfig/serviceRoute');
var systemConfigRoute = require('./models/systemConfig/systemConfigRoute');
var users = require('./models/login/users');

const app = express();
const port = process.env.PORT || '3000';
app.set('port', port);
app.use(cors());
app.use(busboy());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})


require('./models/models/passport')(passport);

mongoose.connect(config.database, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});
app.use('/user', users);
app.use('/checkerData', serviceRoute);
app.use('/systemConfig', systemConfigRoute);
app.listen(port, () => console.log(`Express server running on port ${port}`));
