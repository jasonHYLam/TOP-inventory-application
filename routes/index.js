var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/artists', function (req, res) {
  res.render("artist_list");
})

module.exports = router;
