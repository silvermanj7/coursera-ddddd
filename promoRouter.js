var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var Promotions=require('../models/promotions');
var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev'));

var promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
// .all(function(req,res,next) {
//       res.writeHead(200, { 'Content-Type': 'text/plain' });
//       next();
// })

// function(req,res,next){
//       res.end('Will send all the promotions to you!');}
.get(function (req, res, next) {
    Promotions.find({}, function (err, promo) {
        if (err) throw err;
        res.json(promo);

    });


})

.post(function(req, res, next){
    res.end('Will add the promotion: ' + req.body.name + ' with details: ' + req.body.description);
})

.delete(function(req, res, next){
        res.end('Deleting all promotions');
});

promoRouter.route('/:promoId')
// .all(function(req,res,next) {
//       res.writeHead(200, { 'Content-Type': 'text/plain' });
//       next();
// })

// .get(function(req,res,next){
//         res.end('Will send details of the promotion: ' + req.params.promoId +' to you!');
// })
.get(function (req, res, next) {
    Promotions.findById(req.params.promoId, function (err, promo) {
        if (err) throw err;
        res.json(promo);

    });
})

.put(function(req, res, next){
        res.write('Updating the : ' + req.params.promoId + '\n');
    res.end('Will update the promotion: ' + req.body.name +
            ' with details: ' + req.body.description);
})

.delete(function(req, res, next){
        res.end('Deleting promotion: ' + req.params.promoId);
});

// app.use('/promotions',promoRouter);
//
// app.use(express.static(__dirname + '/public'));
//
// app.listen(port, hostname, function(){
//   console.log(`Server running at http://${hostname}:${port}/`);
// });
module.exports=promoRouter;
