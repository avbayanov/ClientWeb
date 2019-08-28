(function () {
    function post(url, data) {
        return $.post({
            url: url,
            data: JSON.stringify(data),
            contentType: "application/json"
        });
    }

    function PhoneBookService() {
        this.getContacts = function (searchTerm) {
            return $.get("/contacts/get?term=" + searchTerm);
        };

        this.addContact = function (contact) {
            return post("/contacts/add", contact);
        };

        this.removeContact = function (ids) {
            return post("/contacts/remove", {ids: ids});
        };
    }

    Vue.component("add-contact-form", {
        props: ["is-phone-exist"],
        data: function () {
            return {
                firstName: "",
                lastName: "",
                phoneNumber: "",
                isFirstNameEmpty: false,
                isLastNameEmpty: false,
                isPhoneEmpty: false,
                isPhoneDuplicate: false
            }
        },
        template: "#add-contact-form-template",
        methods: {
            checkInputs: function () {
                var result = true;

                if (this.firstName === "") {
                    this.isFirstNameEmpty = true;
                    result = false;
                } else {
                    this.isFirstNameEmpty = false;
                }

                if (this.lastName === "") {
                    this.isLastNameEmpty = true;
                    result = false;
                } else {
                    this.isLastNameEmpty = false;
                }

                if (this.phoneNumber === "") {
                    this.isPhoneEmpty = true;
                    result = false;
                } else {
                    this.isPhoneEmpty = false;
                }

                return result;
            },
            saveContact: function () {
                this.isPhoneDuplicate = false;

                if (!this.checkInputs()) {
                    return;
                }

                this.$emit("add-contact", {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    phoneNumber: this.phoneNumber
                });
            }
        },
        watch: {
            isPhoneExist: function () {
                if (this.isPhoneExist === null) {
                    return;
                }

                if (this.isPhoneExist) {
                    this.isPhoneDuplicate = true;
                    return;
                }

                this.$emit("set-is-phone-exist-null");

                this.firstName = "";
                this.lastName = "";
                this.phoneNumber = "";
                this.$refs.firstName.focus();
            }
        }
    });

    Vue.component("batch-remove-popup", {
        props: ["checked", "isSidebarActive"],
        template: "#batch-remove-popup-template",
        methods: {
            doRemove: function () {
                this.$emit("remove-checked");
            }
        }
    });

    Vue.component("remove-modal", {
        props: ["targets"],
        template: "#remove-contacts-modal-template",
        methods: {
            showModal: function () {
                $("#remove-contacts-modal").modal("show");
            },
            hideModal: function () {
                $("#remove-contacts-modal").modal("hide");
            },
            doRemove: function () {
                this.$emit("remove-contacts");
                this.hideModal();
            }
        },
        mounted: function () {
            this.showModal();

            var self = this;
            $("#remove-contacts-modal").on("hidden.bs.modal", function () {
                self.$emit("clear-remove-targets");
            })
        }
    });

    new Vue({
        el: "#app",
        data: {
            isSidebarActive: false,
            isLoading: false,
            loadingError: {
                isExist: false,
                message: ""
            },
            contacts: [],
            search: "",
            isPhoneExist: null,
            removeTargets: {
                isExist: false,
                ids: []
            },
            checkAll: false,
            checkAllFalsedByContactsWatcher: false
        },
        methods: {
            addContact: function (contact) {
                this.isLoading = true;

                var service = new PhoneBookService();

                var self = this;

                var contactDto = {
                    firstName: contact.firstName,
                    lastName: contact.lastName,
                    phoneNumber: contact.phoneNumber
                };

                service.addContact(contactDto).done(function (response) {
                    if (response.success) {
                        self.loadContacts();
                        self.isPhoneExist = false;
                        return;
                    }

                    if (response.cause === "phone number exist") {
                        self.isPhoneExist = true;
                        self.loadContacts();
                    }
                }).fail(function () {
                    self.setLoadingError("Can't add contact");
                }).always(function () {
                    self.isLoading = false;
                });
            },
            setRemoveTargets: function (targets) {
                this.removeTargets.ids = targets;
                this.removeTargets.isExist = true;
            },
            removeContacts: function () {
                this.isLoading = true;

                var service = new PhoneBookService();

                var self = this;

                service.removeContact(this.removeTargets.ids).done(function (response) {
                    self.loadContacts();
                }).fail(function () {
                    self.setLoadingError("Can't remove contact" + self.removeTargets.ids > 1 ? "s" : "");
                }).always(function () {
                    self.isLoading = false;
                });
            },
            loadContacts: function () {
                this.isLoading = true;

                var service = new PhoneBookService();

                var self = this;

                service.getContacts(this.search).done(function (response) {
                    var checkedIdsBeforeLoading = [];

                    self.checkedIds.forEach(function (id) {
                        checkedIdsBeforeLoading.push(id);
                    });

                    self.contacts = [];

                    response.contacts.forEach(function (contact) {
                        var isContactWasChecked = checkedIdsBeforeLoading.indexOf(contact.id) !== -1 ;

                        self.contacts.push({
                            id: contact.id,
                            firstName: contact.firstName,
                            lastName: contact.lastName,
                            phoneNumber: contact.phoneNumber,
                            isChecked: isContactWasChecked
                        });
                    });
                }).fail(function () {
                    self.setLoadingError("Can't get contacts");
                }).always(function () {
                    self.isLoading = false;
                });
            },
            setLoadingError: function (message) {
                this.loadingError.isExist = true;
                this.loadingError.message = message;
            }
        },
        computed: {
            checkedIds: function () {
                return this.contacts.filter(function (contact) {
                    return contact.isChecked;
                }).map(function (contact) {
                    return contact.id;
                });
            }
        },
        watch: {
            search: function () {
                this.loadContacts();
            },
            isSidebarActive: function () {
                $("#sidebarCollapse").button("toggle");
            },
            checkAll: function () {
                if (this.checkAllFalsedByContactsWatcher) {
                    this.checkAllFalsedByContactsWatcher = false;
                    return;
                }

                var self = this;
                this.contacts.forEach(function (contact) {
                    Vue.set(contact, "isChecked", self.checkAll);
                })
            },
            contacts: function () {
                if (this.checkAll) {
                    this.checkAllFalsedByContactsWatcher = true;
                }

                this.checkAll = false;
            }
        },
        created: function () {
            this.loadContacts();
        }
    });
})();