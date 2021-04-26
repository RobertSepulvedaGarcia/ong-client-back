const { Members } = require('../models')


const getAllMembemres = () => {
    return Members.findAll()
}

const createMember = (member) => {
    return Members.create(member)
}
module.exports = { getAllMembemres, createMember }



