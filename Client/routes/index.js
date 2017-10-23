var express = require('express');
var axios = require('axios');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});
router.post('/dictionary', function (req, res, next) {

    var word = req.body.word;
    var type = req.body.type;


    axios.post('http://localhost:8080/dictionary', {
        word: word,
        type: type
    })
        .then(function (response) {
            var success = response.data.success;
            if (success === true) {
                var result = response.data.result;
                res.send({success: success, result: result});
            }
            else{
                res.send({success: success});
            }
        })
        .catch(function (error) {
            console.log(error);
        });

});
module.exports = router;
