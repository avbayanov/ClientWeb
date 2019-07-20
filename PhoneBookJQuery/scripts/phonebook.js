(function () {
    var rows = [];

    var lastNameInput;
    var firstNameInput;
    var phoneInput;
    
    $(function () {
        lastNameInput = $("#last-name-input")
            .keydown(enterKeydownHandler);
        firstNameInput = $("#first-name-input")
            .keydown(enterKeydownHandler);
        phoneInput = $("#phone-input")
            .keydown(enterKeydownHandler);

        $("#save-button").click(saveButtonHandler);
    });

    function enterKeydownHandler(event) {
        if (event.which === 13) {
            saveButtonHandler();
        }
    }

    function validateForm() {
        var inputErrorClass = "error-input";
        var isError = false;

        var errorMessageFirst = "Необходимо заполнить пол";
        var errorMessageFirstEnding = "е";
        var errorMessageLast = "";

        lastNameInput.removeClass(inputErrorClass);
        firstNameInput.removeClass(inputErrorClass);
        phoneInput.removeClass(inputErrorClass);
        $(".error-message").remove();

        function makePluralForm() {
            if (isError) {
                errorMessageLast += ", ";
                errorMessageFirstEnding = "я";
            }
        }

        if (lastNameInput.val() === "") {
            lastNameInput.addClass(inputErrorClass);
            errorMessageLast += "Фамилия";
            isError = true;
        }

        if (firstNameInput.val() === "") {
            firstNameInput.addClass(inputErrorClass);

            makePluralForm();
            errorMessageLast += "Имя";

            isError = true;
        }

        if (phoneInput.val() === "") {
            phoneInput.addClass(inputErrorClass);

            makePluralForm();
            errorMessageLast += "Номер телефона";

            isError = true;
        }

        if (isError) {
            $("<p>")
                .addClass("error-message")
                .html(errorMessageFirst  + errorMessageFirstEnding + "<br>" + errorMessageLast)
                .appendTo(".new-contact-form");

            return true;
        }

        return false;
    }

    function clearInputs() {
        lastNameInput.val("")
            .focus();
        firstNameInput.val("");
        phoneInput.val("");
    }

    function saveButtonHandler() {
        if (lastNameInput.val() === "" && firstNameInput.val() === "" && phoneInput.val() === "") {
            return;
        }

        if (validateForm()) {
            return;
        }

        var row = $("<tr>")
            .appendTo(".phone-book tbody");

        rows.push(row);

        $("<td>")
            .addClass("index")
            .text(rows.length)
            .appendTo(row);
        $("<td>")
            .addClass("last-name")
            .text(lastNameInput.val())
            .appendTo(row);
        $("<td>")
            .addClass("first-name")
            .text(firstNameInput.val())
            .appendTo(row);
        $("<td>")
            .addClass("phone")
            .text(phoneInput.val())
            .appendTo(row);
        var deleteCell = $("<td>")
            .addClass("delete")
            .appendTo(row);

        $("<a>")
            .html("&#10060;")
            .click(function () {
                removeRow(rows.length - 1);
            })
            .appendTo(deleteCell);

        clearInputs();
    }

    function removeRow(index) {
        rows[index].remove();
        rows.splice(index, 1);
        reindex();
    }

    function reindex() {
        var index = 1;

        rows.forEach(function (row) {
            row.children(".index")
                .text(index);

            index++;
        })
    }
})();