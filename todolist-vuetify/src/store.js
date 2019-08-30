import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        notes: []
    },
    mutations: {
        addNote(state, newNoteText) {
            state.notes.push(newNoteText);
        },
        removeNote(state, index) {
            state.notes.splice(index, 1);
        },
        editNote(state, params) {
            Vue.set(this.state.notes, params.index, params.editedNoteText);
        }
    },
    actions: {

    }
});
