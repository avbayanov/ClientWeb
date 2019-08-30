<template>
    <div>
        <v-textarea
            v-model="noteTextEdited"
            :error-messages="errorMessage"
            :auto-grow="true"
            :row-height="24"
            :rows="1"
            class="px-4 pb-0 ma-0"
            color="light-green lighten-1"
        >
        </v-textarea>

        <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn @click="saveChanges()"
                icon color="green darken-1">
                <v-icon>mdi-check</v-icon>
            </v-btn>
            <v-btn @click="cancelChanges()"
                icon color="red lighten-1">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-card-actions>
    </div>
</template>

<script>
    import validateInput from "../scripts/validateInput";

    export default {
        name: "NoteEdit",
        props: ["index", "noteText"],
        data: () => ({
            noteTextEdited: "",
            errorMessage: null
        }),
        created() {
            this.noteTextEdited = this.noteText;
        },
        methods: {
            saveChanges() {
                this.errorMessage = validateInput(this.noteTextEdited);
                if (this.errorMessage !== null) {
                    return;
                }

                this.$store.commit("editNote", {
                    index: this.index,
                    editedNoteText: this.noteTextEdited
                });
                this.$emit("edited");
            },
            cancelChanges() {
                this.$emit("edited");
            },
            validateInput
        }
    }
</script>

<style scoped>

</style>
