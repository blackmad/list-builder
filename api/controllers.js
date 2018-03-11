var List     = require('../models/List');
var User     = require('../models/User');

exports.listCreateController = function(req, res) {
  console.log(req.isAuthenticated())
  console.log(req.user)
  var list = new List();
  list.name = req.body.name;
  list.userId = req.user.id;

  list.save(function(err) {
    if (err)
      res.send(err);

    res.json({ response: list });
  });
}

exports.listViewController = function(req, res) {
  const listId = req.params.id
  console.log(listId);
  List.findById(listId, function (err, list) {
    res.json({ response: list });
  });
}

exports.userListViewController = function(req, res) {
  const username = req.params.username
  const slug = req.params.slug

  User.findByUsername(username, function (err, user) {
    console.log(err)
    console.log(user);
    if (user === null)
      res.status(404).json({error: 'user not found'})
    else {
      List.findByUserIdAndSlug(user._id, slug, function(err, list) {
        res.json({ response: list });
      })
    }
  })
}
