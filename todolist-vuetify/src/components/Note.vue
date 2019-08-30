<template>
    <div>
        <v-card
            class="mx-auto mb-4"
        >
            <note-edit
                v-if="isEditing"
                :index="index"
                :note-text="noteText"
                @edited="isEditing = false"
            ></note-edit>
            <div v-else>
                <v-card-text class="black--text pb-6">
                    <div class="subtitle-1">
                        {{ noteText }}
                    </div>
                </v-card-text>
                <v-card-actions>
                    <div class="flex-grow-1"></div>
                    <v-btn @click="isEditing = true"
                           icon color="primary">
                        <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn @click="removeDialog = true"
                           icon color="red lighten-1">
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                </v-card-actions>
            </div>
        </v-card>
        <remove-note-dialog
            :remove-dialog="removeDialog"
            :index="index"
            @closed="removeDialog = false"
        ></remove-note-dialog>
    </div>
</template>

<script>
    import NoteEdit from "./NoteEdit.vue";
    import RemoveNoteDialog from "./RemoveNoteDialog.vue";

    export default {
        name: "Note",
        props: ["noteText", "index"],
        data: () => ({
            removeDialog: false,
            isEditing: false
        }),
        components: {
            "note-edit": NoteEdit,
            "remove-note-dialog": RemoveNoteDialog
        },
        methods: {

        }
    }
</script>

<style lang="scss">

</style>
