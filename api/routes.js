var express = require('express');
var controllers     = require('./controllers');

export var router = express.Router();

/**
 * Login required middleware
 */
var ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.route('/list/create').post(ensureAuthenticated, controllers.listCreateController)
router.route('/list/:id').get(controllers.listViewController)
router.route('/user/:username/list/:slug').get(controllers.userListViewController)
