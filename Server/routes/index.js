var express = require('express');
var xml = require('xml');
var config = require('../config');
var fs = require('fs');
var xml2js = require('xml2js');
const Parser = require('xml2js-parser');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/dictionary', function (req, res, next) {

  var path_xml = config.PATH_XML;
  var word = req.body.word;
  var type = req.body.type;
  switch (type) {
    case 0://Fra-Eng
      path_xml += "/Fra-Eng.xml";
      break;
    case 1://Fra-Vi 
      path_xml += "/Fra-Vi.xml";
      break;
    case 2://Eng-Vi
      path_xml += "/Eng-Vi.xml";
      break;
    default:
      break;
  }
  var parser = new Parser({ trim: true });
  fs.readFile(path_xml, "UTF-8", (err, xml) => {
    if (err) throw err;
    parser.parseString(xml, (err, result) => {
      if (err) throw err;
      var item = result.dict.word;
      var success = false;
      var result = '';
      for (var i=0; i < item.length; i++) {
        switch (type) {
          case 0://Fra-Eng
            var word_fr = item[i].fr.toString().trim();
            var mean = item[i].en.toString().trim();
            if (word === word_fr) {
              success = true;
              result = mean;
              break;
            }
            break;
          case 1://Fra-Vi 
            var word_fr = item[i].fr.toString().trim();
            var mean = item[i].vi.toString().trim();
            if (word === word_fr) {
              success = true;
              result = mean;
              break;
            }
            break;
          case 2://Eng-Vi
            var word_en = item[i].en.toString().trim();
            var mean = item[i].vi.toString().trim();
            if (word_en === word) {
              success = true;
              result = mean;
              break;
            }
            break;
          default:
            break;
        }
      }
      console.log('success: ' + success);
      console.log('result: ' + result);
      res.json({
        success: success,
        result: result,
      });
    });
  });
  
});

module.exports = router;
