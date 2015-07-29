/**
 * Created by kris on 16/05/15.
 */

var mongoose        = require('mongoose');
var Schema          = mongoose.Schema;

var BearSchema      = new Schema({
    name: String
});

module.exports = mongoose.model('Bear', BearSchema);

