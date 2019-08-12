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

                if (!this.checkInputs()) {
                    return;
                }

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
            }
        }
    });

    // Vue.component("batch-delete-popup", {
    //
    // });

    new Vue({
        el: "#app",
        data: {
            contacts: [],
            search: "",
            isPhoneExist: null,
            deleteTargets: {
                isExist: false,
                targets: []
            }
        },
        methods: {
            getContacts: function () {
                if (this.search === "") {
                    return this.contacts;
                }

                var self = this;
                return this.contacts.filter(function (contact) {
                    return contact.firstName.indexOf(self.search) !== -1
                        || contact.lastName.indexOf(self.search) !== -1
                        || contact.phoneNumber.indexOf(self.search) !== -1;
                })
            },
            checkPhoneExist: function (phoneNumber) {
                this.isPhoneExist = this.contacts.some(function (value) {
                    return value.phoneNumber === phoneNumber;
                });
            },
            addContact: function (contact) {
                this.contacts.push(contact);
                this.isPhoneExist = null;
            }
        }
    });


})();