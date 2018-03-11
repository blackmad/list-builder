var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ListSchema   = new Schema({
    name: String
});

ListSchema.statics.findById = function(id, cb) {
  return ListModel.findOne({ id: Schema.ObjectId(id) }, cb);
};

ListSchema.statics.findByUserIdAndSlug = function(userId, slug, cb) {
  return ListModel.findOne({ userId: Schema.ObjectId(userId), slug: slug }, cb);
};

var ListModel = mongoose.model('List', ListSchema);
module.exports = ListModel
