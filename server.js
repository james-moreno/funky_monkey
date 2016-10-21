var express = require("express"),
    path    = require("path"),
    bp      = require('body-parser'),
    root    = __dirname,
    port    = process.env.PORT || 8000,
    mongoose = require('mongoose'),
    app     = express(),
    router = express.Router();


app.use(bp.json());
app.use(express.static(path.join(__dirname, "./client")));
app.use(express.static(path.join(__dirname, "./bower_components")));
require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);

app.listen(port, function() {
  console.log( 'server running on port 8000' );
});
