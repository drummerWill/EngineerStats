var request = require('request'); // "Request" library
const fs = require('fs');

var engineers = require('../engineers.json')
console.log(engineers)

module.exports = function(app){
    app.get('/test', function(req, res){
        res.json("it worked")
    })
}