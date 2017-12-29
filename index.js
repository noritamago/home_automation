var fs = require('fs');
var express = require("express");
var bodyParser = require("body-parser");
var exec = require('child_process').exec;
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var server = app.listen(3000, function(){
    console.log("Node.js is listening to PORT:" + server.address().port);
});

var lookupData = {
    'light' : ['電気','ライト','明かり'],
    'tv' : ['TV','テレビ'],
    'aircon' : ['エアコン','暖房','冷房']
};

function execBTO(path){
    console.log('bto_advanced_USBIR_cmd '+path);
    exec('/usr/local/bin/bto_advanced_USBIR_cmd -d `cat '+__dirname+'/'+path+'`',
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
}

function processAction(target, cmd){
    Object.keys(lookupData).forEach(function(target_){
        if( lookupData[target_].indexOf(target) === -1 ){
            return;
        }
        var path = 'data/'+target_+'/'+cmd;
        fs.access(__dirname+'/'+path, (fs.constants || fs).R_OK, function(error){
            if (error) {
                if (error.code === "ENOENT") {
                    console.log('ENOENT error '+__dirname+'/'+path);
                }
            }
            execBTO(path);
        });
    });
}

app.post("/api/action", function(req, res, next){
    if( req.body.location && req.body.location !== 'living' ) {
        res.json({status:'NG'});
        return;
    }
    console.log(req.body);
    processAction(req.body.target.trim(), req.body.cmd);
    res.json({status:'OK'});
});
