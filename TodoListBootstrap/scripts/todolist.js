(function () {
    var noteEditDivWhileShow =
        "<button type=\"button\" class=\"edit-button btn btn-outline-primary\">Edit</button>\n" +
        "<button type=\"button\" class=\"delete-button btn btn-outline-danger\">Delete</button>\n" ;

    var noteEditDivWhileEdit =
        "<button type=\"button\" class=\"save-button btn btn-outline-success\">Save</button>\n" +
        "<button type=\"button\" class=\"cancel-button btn btn-outline-danger\">Cancel</button>";

    var newNoteColDiv =
        "<div class=\"card shadow\">\n" +
        "   <div class=\"card-body\">\n" +
        "       <p class=\"note-text card-text\"></p>\n" +
        "       <div class=\"note-edit btn-group btn-group-sm\" role=\"group\" aria-label=\"Manage note\">\n" +
        noteEditDivWhileShow +
        "       </div>\n" +
        "   </div>\n" +
        "</div>";

    var newNoteInput;
    var notesRow;

    var deleteNoteModal;
    var deleteNoteModalButton;

    $(function () {
        notesRow = $("#notes");

        newNoteInput = $("#new-note-input").keydown(function (event) {
            if (event.which === 13) {
                event.preventDefault();
                addNoteButtonHandler();
            }
        });

        $("#add-note-button").click(addNoteButtonHandler);

        deleteNoteModal = $("#delete-note-modal");
        deleteNoteModalButton = $("#delete-modal-button");
    });

    function addNoteButtonHandler() {
        var text = newNoteInput.val();
        if (text === "") {
            newNoteInput.addClass("is-invalid")
                .prop("placeholder", "You must write something!");
            return;
        }
        newNoteInput.val("");
        newNoteInput.removeClass("is-invalid")
            .prop("placeholder", "Write new note...");

        var newNoteNode = $("<div>")
            .addClass("col-md-6 col-xl-4 pb-3")
            .html(newNoteColDiv)
            .appendTo(notesRow);

        var noteTextNode = newNoteNode.find(".note-text")
            .text(text);

        setEditButtonsHandlers(newNoteNode, noteTextNode, newNoteNode.find(".note-edit"));

        $(window).scrollTop(newNoteNode.offset().top);
    }

    function setEditButtonsHandlers(noteNode, noteTextNode, noteEditNode) {
        noteEditNode.children(".edit-button")
            .click(function () {
                editNoteButtonHandler(noteNode, noteTextNode, noteEditNode);
            });

        noteEditNode.children(".delete-button")
            .click(function () {
                deleteNoteModalButton.click(function () {
                    noteNode.remove();
                    deleteNoteModal.modal("hide");
                });

                deleteNoteModal.modal("show");
            });
    }

    function editNoteButtonHandler(noteNode, noteTextNode, noteEditNode) {
        var height = noteTextNode.height() + 8;

        noteTextNode.remove();

        function saveNote() {
            if (textareaNoteNode.val() === "") {
                return;
            }

            textareaNoteNode.text(textareaNoteNode.val());
            doneEditNoteHandler(noteNode, textareaNoteNode, noteEditNode);
        }

        var textareaNoteNode = $("<textarea>")
            .text(noteTextNode.text())
            .addClass("note-text-edit")
            .height(height)
            .keydown(function (event) {
                if (event.which === 13) {
                    event.preventDefault();
                    saveNote();
                }
            }).prependTo(noteNode.find(".card-body"));

        noteEditNode.html(noteEditDivWhileEdit);

        noteEditNode.children(".cancel-button")
            .click(function () {
                doneEditNoteHandler(noteNode, textareaNoteNode, noteEditNode);
            });

        noteEditNode.children(".save-button")
            .click(function () {
                saveNote();
            });
    }

    function doneEditNoteHandler(noteNode, textareaNoteNode, noteEditNode) {
        textareaNoteNode.remove();

        var noteTextNode = $("<p>")
            .addClass("note-text card-text")
            .text(textareaNoteNode.text())
            .prependTo(noteNode.find(".card-body"));

        noteEditNode.html(noteEditDivWhileShow);

        setEditButtonsHandlers(noteNode, noteTextNode, noteEditNode);
    }
})();