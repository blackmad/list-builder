var List     = require('../models/List');

exports.listCreateController = function(req, res) {
  console.log(req.isAuthenticated())
  console.log(req.user)
    var list = new List();      // create a new instance of the Bear model
    list.name = req.body.name;  // set the bears name (comes from the request)

    // save the bear and check for errors
    list.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'List created!' });
    });
  }
