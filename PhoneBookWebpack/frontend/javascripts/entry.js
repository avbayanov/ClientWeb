import "bootstrap/dist/css/bootstrap.css";
import "../stylesheets/phonebook.scss";

import Vue from "vue";
import $ from "jquery";
import "bootstrap";

import phonebookComponent from "./phonebook.vue";

new Vue({
    el: "#app",
    components: {
        "phonebook": phonebookComponent
    }
});
