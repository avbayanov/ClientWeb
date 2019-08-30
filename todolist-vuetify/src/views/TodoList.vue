<template>
    <div>
        <note
            v-for="(note, index) in notesList"
            :noteText="note"
            :index="index"
        ></note>
        <add-note></add-note>
    </div>
</template>

<script>
    import Note from "../components/Note.vue";
    import AddNote from "../components/AddNote.vue";

    export default {
        name: "TodoList",
        data: () => ({
        }),
        methods: {
        },
        components: {
            "note": Note,
            "add-note": AddNote
        },
        computed: {
            notesList() {
                return this.$store.state.notes;
            }
        }
    }
</script>

<style lang="scss">

</style>
