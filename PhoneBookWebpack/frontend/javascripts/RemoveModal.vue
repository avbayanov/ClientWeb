<template>
    <div class="modal fade" id="remove-contacts-modal" tabindex="-1" role="dialog" aria-labelledby="delete note" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Delete contact<span v-if="targets.length > 1">s</span></h5>
                </div>
                <div class="modal-body">
                    Do you really want delete <span v-if="targets.length === 1">the</span><span v-else>{{ targets.length }}</span> contact<span v-if="targets.length > 1">s</span>?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button @click="doRemove"
                            type="button" class="btn btn-danger" id="delete-modal-button">
                        Delete <span v-if="targets.length === 1">the</span><span v-else>{{ targets.length }}</span> contact<span  v-if="targets.length > 1">s</span></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from "jquery";

    export default {
        props: ["targets"],
        template: "#remove-contacts-modal-template",
        methods: {
            showModal: function () {
                $("#remove-contacts-modal").modal("show");
            },
            hideModal: function () {
                $("#remove-contacts-modal").modal("hide");
            },
            doRemove() {
                this.$emit("remove-contacts");
                this.hideModal();
            }
        },
        mounted: function () {
            this.showModal();

            $("#remove-contacts-modal").on("hidden.bs.modal", () => {
                this.$emit("clear-remove-targets");
            })
        }
    };
</script>