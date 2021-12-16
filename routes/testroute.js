var request = require('request'); // "Request" library

module.exports = function(app){
    app.get('/test', function(req, res){
        res.json("it worked")
    })
}