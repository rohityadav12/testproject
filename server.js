var express = require('express'),
    expApp = express(),
    fs = require('fs'),
    port = process.env.PORT || 5000,
    env = process.env.NODE_ENV || 'development';

var myapp = require('./connection.js');

expApp.use(express.static(__dirname + '/public'));

// views is directory for all template files
expApp.set('views', __dirname + '/views');
expApp.set('view engine', 'ejs');

expApp.get('/', function(request, response) {
    try {
        response.render('index',{ myVar : "This is index page" });
    } catch (e) {
        console.log(e);
    }
});

expApp.get('/test', function(request, response) {
    try {
        response.render('index',{ myVar : "This is test page" });
    } catch (e) {
        console.log(e);
    }    
});

expApp.get('/404', function(req, res, next){
    next();
});

expApp.use(function(req, res, next){
    res.status(404);

    res.format({
        html: function () {
            res.render('404', { url: req.url,myVar:"Page not found ( 404 Error )" })
        },
        json: function () {
            res.json({ error: 'Not found' })
        },
        default: function () {
            res.type('txt').send('Not found')
        }
    })
});

if( port == 5000 ) {
    var options = {

        key: fs.readFileSync('fake-keys/privatekey.pem'),
        cert: fs.readFileSync('fake-keys/certificate.pem')
        
    };
    var https = require('https').createServer(options, expApp);
    console.log('url','https://localhost:'+port);
}else{
    var https = require('http').Server(expApp);
    console.log('url','http://localhost:'+port);
}

require('./connection.js')(https);

https.listen(port, function() {
    console.log("NODE_ENV: ",env);
    console.log('listening on *:', port);
});