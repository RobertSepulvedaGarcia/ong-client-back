const sequelize = require('sequelize');
const organization = require('../models').Organization;

// Function to find a organization by id
module.exports = {
    find: function(id){
        return organization.findOne({
            where:{id},
            attributes: [
                "id",
               "name",
               "image",
               "phone",
               "address",
               "welcomeText"                
            ]
        }).then(organization =>{
            return organization
        }    
        )
    }
}