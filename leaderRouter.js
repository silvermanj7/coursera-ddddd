var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var Leaders=require('../models/leadership');
var mongoose=require('mongoose');
var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev'));

var leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
// .all(function(req,res,next) {
//       res.writeHead(200, { 'Content-Type': 'text/plain' });
//       next();
// })
.get(function (req, res, next) {
    Leaders.find({}, function (err, lead) {
        if (err) throw err;
        res.json(lead);

    });
})

// .get(function(req,res,next){
//         res.end('Will send all the leaders to you!');
// })

// .post(function(req, res, next){
//     res.end('Will add the leader: ' + req.body.name + ' with details: ' + req.body.description);
// })
.post(function (req, res, next) {
    Leaders.create(req.body, function (err, leader) {
        if (err) throw err;
        console.log('Leader created!');
        var id = leader._id;

        // res.writeHead(200, {
        //     'Content-Type': 'text/plain'
        // });
        res.end('Added the leader with id: ' + id);
    });
})

.delete(function (req, res, next) {
    Leaders.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});
// .delete(function(req, res, next){
//         res.end('Deleting all leaders');
// });

leaderRouter.route('/:leaderId')
// .all(function(req,res,next) {
//       res.writeHead(200, { 'Content-Type': 'text/plain' });
//
// })

// .get(function(req,res,next){
//         res.end('Will send details of the leader: ' + req.params.leaderId +' to you!');
// })
.get(function (req, res, next) {
    Leaders.findById(req.params.dishId, function (err, lead) {
        if (err) throw err;
        res.json(lead);
    });
})
.put(function(req, res, next){
        res.write('Updating the leader: ' + req.params.leaderId + '\n');
    res.end('Will update the leader: ' + req.body.name +
            ' with details: ' + req.body.description);
})

.delete(function(req, res, next){
        res.end('Deleting dish: ' + req.params.leaderId);
});

// app.use('/leadership',leaderRouter);
//
// app.use(express.static(__dirname + '/public'));
//
// app.listen(port, hostname, function(){
//   console.log(`Server running at http://${hostname}:${port}/`);
// });
module.exports=leaderRouter;
