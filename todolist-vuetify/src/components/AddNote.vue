<template>
    <div>
        <v-btn
            bottom
            color="pink"
            dark
            fab
            fixed
            right
            @click="addDialog = !addDialog"
        >
            <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-dialog
            v-model="addDialog"
            width="800px"
        >
            <v-card>
                <v-card-title class="light-green darken-4 modal-title">
                    Create note
                </v-card-title>
                <v-container>
                    <v-row>
                        <v-col
                            class="align-center justify-space-between"
                            cols="12"
                        >
                            <v-textarea
                                v-model="newNoteText"
                                :error-messages="errorMessage"
                                :auto-grow="true"
                                :clearable="true"
                                :hint="'Enter text for new note'"
                                :placeholder="'Enter note text'"
                                :row-height="24"
                                :rows="5"
                                :solo="true"
                            ></v-textarea>
                        </v-col>
                    </v-row>
                </v-container>
                <v-card-actions>
                    <div class="flex-grow-1"></div>
                    <v-btn
                        text
                        @click="closeDialog()"
                    >Cancel
                    </v-btn>
                    <v-btn
                        text
                        color="primary"
                        @click="save()"
                    >Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import validateInput from "../scripts/validateInput";

    export default {
        name: "AddNote",
        data: () => ({
            addDialog: false,
            newNoteText: "",
            errorMessage: null
        }),
        methods: {
            addNote() {
                this.$store.commit("addNote", this.newNoteText);
            },
            closeDialog() {
                this.addDialog = false;
                this.newNoteText = "";
            },
            save() {
                this.errorMessage = validateInput(this.newNoteText);
                if (this.errorMessage !== null) {
                    return;
                }

                this.addNote();
                this.closeDialog();
            },
            validateInput
        }
    }
</script>

<style lang="scss">
    @import "../styles/modal";
</style>
