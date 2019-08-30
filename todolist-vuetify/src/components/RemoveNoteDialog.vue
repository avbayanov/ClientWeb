<template>
    <v-dialog
        v-model="removeDialog"
        width="400px"
    >
        <v-card>
            <v-card-title class="red darken-4 modal-title">
                Remove note
            </v-card-title>
            <v-container>
                <v-row class="px-2">
                    <v-col
                        class="align-center justify-space-between"
                        cols="12"
                    >
                        Do you really want delete the note?
                    </v-col>
                </v-row>
            </v-container>
            <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn
                    text
                    @click="cancel()"
                >Cancel
                </v-btn>
                <v-btn
                    text
                    color="red lighten-1"
                    @click="remove()"
                >Delete
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: "RemoveNoteDialog",
        props: ["removeDialog", "index"],
        methods: {
            cancel() {
                this.$emit("closed");
            },
            remove() {
                this.$store.commit("removeNote", this.index);
                this.$emit("closed");
            }
        }
    }
</script>

<style lang="scss">
    @import "../styles/modal";
</style>
