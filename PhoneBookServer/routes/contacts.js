var express = require('express');
var router = express.Router();

var lastId = -1;
var contacts = [];

router.get('/get', function (req, res, next) {
    var term = (req.query.term || '').toLowerCase();

    res.send({
        contacts: contacts.filter(function (contact) {
            return term === '' || contact.firstName.toLowerCase().indexOf(term) >= 0
                || contact.lastName.toLowerCase().indexOf(term) >= 0
                || contact.phoneNumber.toLowerCase().indexOf(term) >= 0;
        })
    });
});

router.post('/add', function (req, res) {
    var contact = req.body;

    if (contact.firstName === null || contact.lastName === null || contact.phoneNumber === null) {
        res.send({
            success: false,
            cause: "empty field"
        });
        return;
    }

    var index = contacts.findIndex(function (existingContact) {
        return existingContact.phoneNumber.toLowerCase() === contact.phoneNumber.toLowerCase();
    });

    if (index >= 0) {
        res.send({
            success: false,
            cause: "phone number exist"
        });
        return;
    }

    lastId++;

    contacts.push({
        id: lastId,
        firstName: contact.firstName,
        lastName: contact.lastName,
        phoneNumber: contact.phoneNumber
    });

    res.send({success: true});
});

router.post('/remove', function (req, res) {
    var ids = req.body.ids;

    var isDeleted = false;
    ids.forEach(function (id) {
        var index = contacts.findIndex(function (existingContact) {
            return existingContact.id === id;
        });

        if (index >= 0) {
            contacts.splice(index, 1);
            isDeleted = true;
        }
    });

    res.send({success: isDeleted});
});

module.exports = router;
