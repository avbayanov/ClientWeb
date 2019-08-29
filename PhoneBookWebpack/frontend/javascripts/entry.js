import "bootstrap/dist/css/bootstrap.css";
import "../stylesheets/phonebook.scss";

import Vue from "vue";
import "bootstrap";

import PhonebookComponent from "./Phonebook.vue";

new Vue({
    el: "#app",
    components: {
        "phonebook": PhonebookComponent
    }
});
