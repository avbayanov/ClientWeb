(function () {
    var newNoteInput;
    var notesDiv;

    document.addEventListener("DOMContentLoaded", function () {
        newNoteInput = document.getElementById("new-note-input");
        notesDiv = document.getElementById("notes");

        var addNoteButton = document.getElementById("add-note-button");
        addNoteButton.addEventListener("click", addNoteButtonHandler);

        newNoteInput.addEventListener("keydown", function (event) {
            if (event.keyCode === 13 || event.key === "Enter") {
                event.preventDefault();
                addNoteButtonHandler();
            }
        })
    });

    function addNoteButtonHandler() {
        var newNoteContent = newNoteInput.value;
        if (newNoteContent === "") {
            return;
        }

        var newNoteNode = document.createElement("div");
        newNoteNode.classList.add("note");

        newNoteNode.innerHTML =
            "<div class=\"note-text\">" +
            "</div>" +
            "<div class=\"note-edit\">" +
            "<a href=\"javascript://\" title=\"Edit note\" class=\"edit-button\">&#9998;</a><br>" +
            "<a href=\"javascript://\" title=\"Delete note\" class=\"delete-button\">&#10007;</a>" +
            "</div>";

        newNoteNode.children[0].textContent = newNoteContent;
        setEditButtonsHandlers(newNoteNode, newNoteNode.children[0], newNoteNode.children[1]);

        notesDiv.appendChild(newNoteNode);
        newNoteInput.value = "";
    }

    function setEditButtonsHandlers(noteNode, noteTextNode, noteEditNode) {
        noteEditNode.children[0].addEventListener("click",
            editNoteButtonHandler.bind("", noteNode, noteTextNode, noteEditNode));

        noteEditNode.children[2].addEventListener("click", function () {
            noteNode.parentNode.removeChild(noteNode);
        });
    }

    function editNoteButtonHandler(noteNode, noteTextNode, noteEditNode) {
        var text = noteTextNode.textContent;

        noteNode.removeChild(noteTextNode);

        var textareaNoteNode = document.createElement("textarea");
        textareaNoteNode.textContent = text;

        noteEditNode.innerHTML =
            "<a href=\"javascript://\" title=\"Cancel changes\" class=\"cancel-button\">&#10007;</a><br>" +
            "<a href=\"javascript://\" title=\"Save changes\" class=\"save-button\">&#10003;</a>";

        noteEditNode.children[0].addEventListener("click",
            doneEditNoteHandler.bind("", noteNode, textareaNoteNode, noteEditNode));

        function saveNote() {
            if (textareaNoteNode.value === "") {
                return;
            }
            textareaNoteNode.textContent = textareaNoteNode.value;
            doneEditNoteHandler(noteNode, textareaNoteNode, noteEditNode);
        }

        noteEditNode.children[2].addEventListener("click", function () {
            saveNote();
        });

        textareaNoteNode.addEventListener("keydown", function (event) {
            if (event.keyCode === 13 || event.key === "Enter") {
                event.preventDefault();
                saveNote();
            }
        });

        noteNode.prepend(textareaNoteNode);
    }

    function doneEditNoteHandler(noteNode, textareaNoteNode, noteEditNode) {
        var text = textareaNoteNode.textContent;

        noteNode.removeChild(textareaNoteNode);

        var noteTextNode = document.createElement("div");
        noteTextNode.classList.add("note-text");
        noteTextNode.textContent = text;

        noteEditNode.innerHTML =
            "<a href=\"javascript://\" title=\"Edit note\" class=\"edit-button\">&#9998;</a><br>" +
            "<a href=\"javascript://\" title=\"Delete note\" class=\"delete-button\">&#10007;</a>";

        setEditButtonsHandlers(noteNode, noteTextNode, noteEditNode);

        noteNode.prepend(noteTextNode);
    }
})();