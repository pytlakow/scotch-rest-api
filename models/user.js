/**
 * Created by kris on 17/05/15.
 */

var mongoose        = require('mongoose');
var Schema          = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
    name: String,
    password: String,
    admin: Boolean
}));
