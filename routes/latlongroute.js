var request = require('request'); // "Request" library
const fs = require('fs');
var latlong = require('../latlong.json')
console.log(latlong)

module.exports = function(app){

    app.get('/latlong', function(req, res){
        res.json(latlong)
    })
}