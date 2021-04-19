const { Contacts } = require('../models/index');

const createContact = (contact) => {
    return Contacts.create(contact)
}

module.exports = { createContact }
