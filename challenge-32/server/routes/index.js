'use strict';

var express = require('express');
var router = express.Router();
var data = [];

router.get('/', function(req, res) {
  res.json(data);
});

router.post('/', function(req, res) {
  data.push({
    image: req.body.image,
    brandModel: req.body.brandModel,
    year: req.body.year,
    licensePlate: req.body.licensePlate,
    color: req.body.color 
  });
  res.json({ message: 'success' });
});

router.delete('/', function(req, res) {
  data.splice(req.body.indexToDelete, 1);
  res.json({ message: 'success' });
});

module.exports = router;
