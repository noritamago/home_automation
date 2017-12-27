var express = require("express");
var exec = require('child_process').exec;
var app = express();

var server = app.listen(3000, function(){
    console.log("Node.js is listening to PORT:" + server.address().port);
});

app.get("/api/action", function(req, res, next){
    if( req.query.location && req.query.location === 'living' ){
        if( req.query.cmd ){
            exec('/usr/local/bin/bto_advanced_USBIR_cmd -d `cat '+__dirname+'/'+req.query.cmd+'`',
                function (error, stdout, stderr) {
                if(stdout){
                    console.log('stdout: ' + stdout);
                }
                if(stderr){
                    console.log('stderr: ' + stderr);
                }
                if (error !== null) {
                    console.log('Exec error: ' + error);
                }
            });
            res.json({status:'OK'});
            return;
        }
    }
    res.json({status:'NG'});
});