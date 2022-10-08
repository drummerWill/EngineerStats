var request = require('request'); // "Request" library
const fs = require('fs');

var engineers = require('../engineers.json')
var latlong = require('../latlong.json')
console.log(engineers)

module.exports = function(app){
    app.get('/test', function(req, res){
        res.json(engineers)
    })

    app.get('/latlong', function(req, res){
        res.json(latlong)
    })
}