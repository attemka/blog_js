var crypto = require ('crypto');
var mongoose = require('libs/mongoose');
var async = require ('async');
const util = require('util');
var HttpError = require('config/error').HttpError;
Schema = mongoose.Schema;

var schema = new Schema ({
    email: {
        type: String,
        unique: true,
        required: true
    },
    username: {
        type:String,
        unique:true,
        required: true
    },
    hashedPassword: {
        type: String,
            required:true
    },
    salt: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default : Date.now()
    }
});

schema.methods.encryptPassword = function (password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

schema.virtual('password')
    .set(function (password) {
        this._plainPassword = password;
        this. salt = Math.random() + '';
        this.hashedPassword = this.encryptPassword(password);
    })
.get(function () { return this._plainPassword });

schema.methods.checkPassword = function (password) {
    return this.encryptPassword(password) === this.hashedPassword;
};

schema.statics.authorize = function (username, password, callback) {
    var User = this;
    async.waterfall([
        function (callback) {
            User.findOne({username: username}, callback);
        },
        function (user, callback) {
            if (user) {
                if (user.checkPassword(password)) {
                    callback(null, user);
                } else {
                    callback(new HttpError(403, "Wrong password"));
                }
            } else {
                callback(new HttpError(403, "user not found"));
            }
        }
    ], callback);
};

schema.methods.getUsernameById = function (id) {
    var User = this;
    var userModel = User.findById(id);
    var username = userModel.username;

    return username;
}

schema.statics.signup = function (email, username, password, callback) {
    var User = this;
    async.waterfall([
        function (callback) {
            User.findOne({username: username}, callback);
        },
        function (user, callback) {
            if (user) {
                callback(new HttpError(403, "User existing"));
                } else {
                var user = new User({username: username, password: password, email: email});
                user.save(function (err) {
                    if (err) return callback(err);
                    callback(null, user);
            });
        }
        }
    ], callback);
};
    function AuthError(message) {
        Error.call(this, AuthError);
        Error.apply(this, arguments);
        Error.captureStackTrace(this, AuthError);
        this.message = message;
    }


exports.User = mongoose.model ('User', schema);
util.inherits (AuthError, Error);
AuthError.prototype.name= 'AuthError';
exports.AuthError = AuthError;
