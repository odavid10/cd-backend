const { getContactsService } = require("./contacts.service");
const { createContactService } = require("./create-contact.service");
const { deleteContactService } = require("./delete-contact.service");
const { getContactByIdService } = require("./get-contact-by-id.service");
const { updateContactService } = require("./update-contact.service");

module.exports = {
  getContactsService,
  createContactService,
  deleteContactService,
  getContactByIdService,
  updateContactService,
};
