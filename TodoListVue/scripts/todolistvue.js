(function () {
    new Vue({
        el: "#app",
        data: {
            addNoteText: "",
            isInvalidInput: false,
            notes: [],
            removeTarget: {
                isExist: false,
                target: 0
            }
        },
        methods: {
            addNote: function () {
                if (this.addNoteText === "") {
                    this.isInvalidInput = true;
                    return;
                }
                this.isInvalidInput = false;

                this.notes.push(this.addNoteText);
                this.addNoteText = "";
            },
            setRemoveTarget: function (index) {
                this.removeTarget.isExist = true;
                this.removeTarget.target = index;
            },
            removeNote: function () {
                this.notes.splice(this.removeTarget, 1);
            },
            editNote: function (index, newContent) {
                Vue.set(this.notes, index, newContent);
            }
        }
    });

    Vue.component("note", {
        props: ["noteContent", "index"],
        data: function() {
            return {
                isEditing: false,
                contentHeight: null
            }
        },
        template: "#note-template",
        methods: {
            removeSelf: function () {
                this.$emit("remove-note");
            },
            editSelf: function (newContent) {
                this.$emit("edit-note", this.index, newContent);
            },
            updateContentHeight: function () {
                this.contentHeight = $("p.note-text:contains(" + this.noteContent +")").height();
            }
        },
        mounted: function () {
            this.updateContentHeight();
        },
        updated: function () {
            this.updateContentHeight();
        }
    });

    Vue.component("note-edit", {
        props: ["initialContent", "fieldHeight"],
        data: function() {
            return {
                editContent: this.initialContent,
                isInvalid: false
            }
        },
        template: "#edit-note-template",
        methods: {
            save: function () {
                if (this.editContent === "") {
                    this.isInvalid = true;
                    return;
                }

                if (this.editContent !== this.initialContent) {
                    this.$emit("edit-made", this.editContent);
                }
                this.$emit("edit-finished");
            },
            cancel: function () {
                this.$emit("edit-finished");
            }
        }
    });

    Vue.component("remove-modal", {
        props: ["target"],
        template: "#remove-modal-template",
        methods: {
            showModal: function () {
                $("#delete-note-modal").modal("show");
            },
            hideModal: function () {
                $("#delete-note-modal").modal("hide");
            },
            doRemove: function () {
                this.$emit("remove-note", this.target);
                this.hideModal();
            }
        },
        mounted: function () {
            this.showModal();

            var self = this;

            $("#delete-note-modal").on("hidden.bs.modal", function () {
                self.$emit("clear-remove-target");
            })
        }
    });
})();