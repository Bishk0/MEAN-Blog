const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    login: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserByLogin = function (login, cb) {
    const query = {login: login};
    User.findOne(query, cb);
}

module.exports.getUserById = function (id, cb) {
    User.findById(id, cb);
}

module.exports.addUser = function (newUser, cb) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            if (err) throw  err;
            newUser.password = hash;
            newUser.save(cb);
        });
    });
}

module.exports.comparePass = function (passFromUser, userDbPass, cb) {
    bcrypt.compare(passFromUser, userDbPass, (err, isMath) => {
        if (err) throw  err;
        cb(null, isMath);
    });
}
