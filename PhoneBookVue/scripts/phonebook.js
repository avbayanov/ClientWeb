(function () {
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

                this.$emit("check-phone-exist", this.phoneNumber);
            }
        },
        watch: {
            isPhoneExist: function () {
                if (this.isPhoneExist === null) {
                    return;
                }

                if (this.isPhoneExist) {
                    this.isPhoneDuplicate = true;
                }

                if (!this.checkInputs() || this.isPhoneExist) {
                    this.$emit("set-is-phone-exist-null");
                    return;
                }

                this.$emit("add-contact", {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    phoneNumber: this.phoneNumber,
                    isChecked: false
                });

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
            contacts: [],
            addedContacts: 0,
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
            checkPhoneExist: function (phoneNumber) {
                var loweredPhoneNumber = phoneNumber.toLowerCase();

                this.isPhoneExist = this.contacts.some(function (value) {
                    return value.phoneNumber.toLowerCase() === loweredPhoneNumber;
                });
            },
            addContact: function (contact) {
                this.contacts.push(_.extend({
                    id: this.addedContacts
                }, contact));

                this.isPhoneExist = null;
                this.addedContacts++;
            },
            setRemoveTargets: function (targets) {
                this.removeTargets.ids = targets;
                this.removeTargets.isExist = true;
            },
            removeContacts: function () {
                var self = this;
                this.removeTargets.ids.forEach(function (id) {
                    var removeIndex = self.contacts.findIndex(function (contact) {
                        return contact.id === id;
                    });

                    self.contacts.splice(removeIndex, 1);
                })
            }
        },
        computed: {
            searchedContacts: function () {
                if (this.search === "") {
                    return this.contacts;
                }

                var loweredSearch = this.search.toLowerCase();

                return this.contacts.filter(function (contact) {
                    return contact.firstName.toLowerCase().indexOf(loweredSearch) !== -1
                        || contact.lastName.toLowerCase().indexOf(loweredSearch) !== -1
                        || contact.phoneNumber.toLowerCase().indexOf(loweredSearch) !== -1;
                });
            },
            checkedIds: function () {
                return this.contacts.filter(function (contact) {
                    return contact.isChecked;
                }).map(function (contact) {
                    return contact.id;
                });
            }
        },
        watch: {
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
        }
    });
})();