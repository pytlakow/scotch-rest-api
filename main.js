/**
 * Created by kris on 16/05/15.
 */
//BASE
var express         = require('express');
var app             = express();
var bodyParser      = require('body-parser');
var mongoose        = require('mongoose');
var morgan          = require('morgan');


var config = require('./config');

var Bear            = require('./models/bear');
var User            = require('./models/user');

mongoose.connect(config.database); // connect to database

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));




//ROUTES
var router          = express.Router();

////middleware to use for all resources
//router.use(function(req, res, next){
//    console.log('middleware called..');
//    next();
//});

router.route('/bears')
    .post(function(req, res){
        var bear = new Bear();
        bear.name = req.body.name;

        bear.save(function(err){
           if(err)
            res.send(err);

            res.json({message: 'Bear created!'});
        });

    })
    .get(function(req, res) {
        Bear.find(function(err, bears) {
            if (err)
                res.send(err);

            res.json(bears);
        });
    });

router.route('/bears/:bear_id')
    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
        Bear.findById(req.params.bear_id, function(err, bear) {
            if (err)
                res.send(err);
            res.json(bear);
        });
    })
    .put(function(req, res) {

        // use our bear model to find the bear we want
        Bear.findById(req.params.bear_id, function(err, bear) {

            if (err)
                res.send(err);

            bear.name = req.body.name;  // update the bears info

            // save the bear
            bear.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Bear updated!' });
            });

        });
    })
    .delete(function(req, res) {
        Bear.remove({
            _id: req.params.bear_id
        }, function(err, bear) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });



router.get('/', function(req, res){
   res.json({message: 'welcome to node API'});
});

//REGISTER
app.use('/api', router);

//START SERVER
app.listen(process.env.PORT || 5000);
//app.listen(port);
//console.log('Magic happens at port: ' + process.env.PORT || 5000);