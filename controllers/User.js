const sequelize = require('sequelize');
const User      = require('../models/').User;

module.exports = {
    read: function(){
        return User
        .findAll({
            attributes: ['id', 'email', 'firstName', 'lastName']
        })
    },

    create: function({email, firstName, lastName, password}){
        return User
        .create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            roleId: 2
        })
        .then(() => this.read())
    }
}