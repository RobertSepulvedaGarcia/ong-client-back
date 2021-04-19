const { Contacts } = require('../models/index');
const createContact = (contact) => {
    return Contacts.create(contact)
}
const getAllContacts = () => {
    return Contacts.findAll({})
}
module.exports = { createContact, getAllContacts }

