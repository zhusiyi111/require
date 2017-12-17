

var express = require('express');
var path = require('path');

var httpConcat = require('http-concat');
var app = new express();

app.use(httpConcat({
    base: './public/',
    path: '/'
}));


app.use(express.static('public'));



app.listen(3001);