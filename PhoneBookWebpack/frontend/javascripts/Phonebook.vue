<template>
    <div>
        <nav class="navbar navbar-expand-sm fixed-top navbar-dark bg-dark">
            <span class="navbar-brand mb-0 h1">Phonebook</span>
            <button @click="isSidebarActive = !isSidebarActive"
                    id="sidebarCollapse" class="btn btn-primary ml-sm-1 mt-1 mt-sm-0 mr-sm-1 mr-md-0 sidebarCollapse" type="button">Add&nbsp;contact</button>
            <form @submit.prevent="loadContacts()" class="form-inline w-100 my-1 my-sm-0 d-flex flex-sm-row">
                <input v-model.lazy.trim="search"
                       class="form-control flex-grow-1" id="new-note-input" type="text" placeholder="Search">
            </form>
        </nav>

        <div class="vertical-nav bg-white" id="sidebar" :class="{ 'active': isSidebarActive }">
            <div class="container topbar-indent">
                <div class="row">
                    <div class="col">
                        <add-contact-form :is-phone-exist="isPhoneExist"
                                          @set-is-phone-exist-null="isPhoneExist = null" @add-contact="addContact">
                        </add-contact-form>
                    </div>
                </div>
            </div>
        </div>

        <div class="page-content" id="content" :class="{ 'active': isSidebarActive }">
            <div class="table-responsive " :class="{ 'batch-delete-popup-push': (checkedIds.length > 0) }">
                <table class="table table-hover mb-0" id="phonebook">
                    <thead class="thead-light">
                    <tr>
                        <th class="index">#</th>
                        <th class="first-name">First name</th>
                        <th class="last-name">Last name</th>
                        <th class="phone">Phone number</th>
                        <th class="delete-button"></th>
                        <th class="delete-check">
                            <div>
                                <input v-model="checkAll" type="checkbox" title="Check all contacts">
                            </div>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-cloak v-for="(contact, index) in contacts">
                        <td class="index">{{ index + 1 }}</td>
                        <td class="first-name">{{ contact.firstName }}</td>
                        <td class="last-name">{{ contact.lastName }}</td>
                        <td class="phone">{{ contact.phoneNumber }}</td>
                        <td class="delete-button">
                            <div>
                                <button @click="setRemoveTargets([contact.id])"
                                        type="button" class="close" aria-label="Delete contact" title="Delete contact">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        </td>
                        <td class="delete-check">
                            <div>
                                <input v-model="contact.isChecked" type="checkbox" title="Check contact">
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div v-if="isLoading">
                <div class="d-flex justify-content-center loading">
                    <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
            </div>


            <div v-cloak v-if="loadingError.isExist" class="container loading">
                <div class="alert alert-danger" role="alert">
                    <b>Connection error!</b>
                    {{ loadingError.message }}
                    <button @click="loadingError.isExist = false"
                            type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>

            <batch-remove-popup v-if="checkedIds.length > 0" :checked="checkedIds" :is-sidebar-active="isSidebarActive"
                                @remove-checked="setRemoveTargets(checkedIds)">
            </batch-remove-popup>
        </div>

        <remove-modal v-if="removeTargets.isExist" :targets="removeTargets.ids"
                      @clear-remove-targets="removeTargets.isExist = false" @remove-contacts="removeContacts">
        </remove-modal>
    </div>
</template>

<script>
    import Vue from "vue";
    import $ from "jquery";
    import "bootstrap";

    import phonebookService from "./phonebookService";

    import AddContactFormComponent from "./AddContactForm.vue";
    import BatchRemovePopupComponent from "./BatchRemovePopup.vue";
    import RemoveModalComponent from "./RemoveModal.vue";

    export default {
        data() {
            return {
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
            }
        },
        methods: {
            addContact: function (contact) {
                this.isLoading = true;

                const contactDto = {
                    firstName: contact.firstName,
                    lastName: contact.lastName,
                    phoneNumber: contact.phoneNumber
                };

                phonebookService.addContact(contactDto).done(response => {
                    if (response.success) {
                        this.loadContacts();
                        this.isPhoneExist = false;
                        return;
                    }

                    if (response.cause === "phone number exist") {
                        this.isPhoneExist = true;
                        this.loadContacts();
                    }
                }).fail(() => {
                    this.setLoadingError("Can't add contact");
                }).always(() => {
                    this.isLoading = false;
                });
            },
            setRemoveTargets: function (targets) {
                this.removeTargets.ids = targets;
                this.removeTargets.isExist = true;
            },
            removeContacts: function () {
                this.isLoading = true;

                phonebookService.removeContact(this.removeTargets.ids).done(response => {
                    this.loadContacts();
                }).fail(() => {
                    this.setLoadingError("Can't remove contact" + this.removeTargets.ids > 1 ? "s" : "");
                }).always(() => {
                    this.isLoading = false;
                });
            },
            loadContacts: function () {
                this.isLoading = true;

                phonebookService.getContacts(this.search).done(response => {
                    const checkedIdsBeforeLoading = [];

                    this.checkedIds.forEach(function (id) {
                        checkedIdsBeforeLoading.push(id);
                    });

                    this.contacts = [];

                    response.contacts.forEach(contact => {
                        const isContactWasChecked = checkedIdsBeforeLoading.indexOf(contact.id) !== -1 ;

                        this.contacts.push({
                            id: contact.id,
                            firstName: contact.firstName,
                            lastName: contact.lastName,
                            phoneNumber: contact.phoneNumber,
                            isChecked: isContactWasChecked
                        });
                    });
                }).fail(() => {
                    this.setLoadingError("Can't get contacts");
                }).always(() => {
                    this.isLoading = false;
                });
            },
            setLoadingError: function (message) {
                this.loadingError.isExist = true;
                this.loadingError.message = message;
            }
        },
        computed: {
            checkedIds: function () {
                return this.contacts.filter(contact => {
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

                this.contacts.forEach(contact => {
                    Vue.set(contact, "isChecked", this.checkAll);
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
        },
        components: {
            "add-contact-form": AddContactFormComponent,
            "batch-remove-popup": BatchRemovePopupComponent,
            "remove-modal": RemoveModalComponent
        }
    };
</script>

<style lang="scss">
    @import "../stylesheets/sidebar";

    [v-cloak] {
        display: none;
    }

    .topbar-indent {
        padding-top: 4.5em;
    }

    @media (max-width: 576px) {
        .topbar-indent {
            padding-top: 7.5em;
        }
    }

    .page-content {
        padding-top: 3.5em;
    }

    @media (max-width: 576px) {
        .page-content {
            padding-top: 6.5em;
        }
    }

    td.delete-button > div, td.delete-check > div, th.delete-check > div {
        display: flex;
    }

    td.delete-button > div > button {
        margin: -3px auto 0;
    }

    td.delete-check input {
        margin: 5px auto 0;
    }

    th.delete-check input {
        margin: -17px auto 0;
    }

    td.delete-check input, th.delete-check input {
        cursor: pointer;
    }

    .batch-delete-popup-push {
        margin-bottom: 3.4em;
    }

    .loading {
        margin-top: 1em;
    }
</style>