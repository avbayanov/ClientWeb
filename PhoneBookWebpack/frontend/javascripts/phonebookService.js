import Ajax from "./ajax";

export default {
    getContacts(searchTerm) {
        return Ajax.get("/contacts/get?term=" + searchTerm);
    },

    addContact(contact) {
        return Ajax.post("/contacts/add", contact);
    },

    removeContact(ids) {
        return Ajax.post("/contacts/remove", {ids: ids});
    }
};
