(function () {
    var NOTE_EDIT_DIV_WHILE_SHOW =
        "<a href=\"javascript://\" title=\"Edit note\" class=\"edit-button\">&#9998;</a><br>" +
        "<a href=\"javascript://\" title=\"Delete note\" class=\"delete-button\">&#10007;</a>";

    var NOTE_EDIT_DIV_WHILE_EDIT =
        "<a href=\"javascript://\" title=\"Cancel changes\" class=\"cancel-button\">&#10007;</a><br>" +
        "<a href=\"javascript://\" title=\"Save changes\" class=\"save-button\">&#10003;</a>";

    var NOTE_DIV =
        "<div class=\"note-text\">" +
        "</div>" +
        "<div class=\"note-edit\">" +
        NOTE_EDIT_DIV_WHILE_SHOW +
        "</div>";

    var newNoteInput;
    var notesDiv;

    $(function () {
        notesDiv = $("#notes");

        newNoteInput = $("#new-note-input").keydown(function (event) {
            if (event.which === 13) {
                event.preventDefault();
                addNoteButtonHandler();
            }
        });

        $("#add-note-button").click(addNoteButtonHandler);
    });

    function addNoteButtonHandler() {
        var text = newNoteInput.val();
        if (text === "") {
            return;
        }
        newNoteInput.val("");

        var newNoteNode = $("<div>")
            .addClass("note")
            .html(NOTE_DIV)
            .appendTo(notesDiv);

        var noteTextNode = newNoteNode.children(".note-text")
            .text(text);

        setEditButtonsHandlers(newNoteNode, noteTextNode, newNoteNode.children(".note-edit"));
    }

    function setEditButtonsHandlers(noteNode, noteTextNode, noteEditNode) {
        noteEditNode.children(".edit-button")
            .click(function () {
                editNoteButtonHandler(noteNode, noteTextNode, noteEditNode);
            });

        noteEditNode.children(".delete-button")
            .click(function () {
                noteNode.remove();
            });
    }

    function editNoteButtonHandler(noteNode, noteTextNode, noteEditNode) {
        var height = noteTextNode.height() - 2;

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
            .height(height)
            .keydown(function (event) {
                if (event.which === 13) {
                    event.preventDefault();
                    saveNote();
                }
            }).prependTo(noteNode);

        noteEditNode.html(NOTE_EDIT_DIV_WHILE_EDIT);

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

        var noteTextNode = $("<div>")
            .addClass("note-text")
            .text(textareaNoteNode.text())
            .prependTo(noteNode);

        noteEditNode.html(NOTE_EDIT_DIV_WHILE_SHOW);

        setEditButtonsHandlers(noteNode, noteTextNode, noteEditNode);
    }
})();