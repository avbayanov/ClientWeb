(function () {
    var rows = [];
    var checkedRows = [];
    var isCheckedAll = false;

    var lastNameInput;
    var firstNameInput;
    var phoneInput;

    var checkAllCheckbox;

    var inputErrorClass = "error-input";
    
    $(function () {
        lastNameInput = $("#last-name-input")
            .keydown(enterKeydownHandler);
        firstNameInput = $("#first-name-input")
            .keydown(enterKeydownHandler);
        phoneInput = $("#phone-input")
            .keydown(enterKeydownHandler);

        $("#save-button").click(saveButtonHandler);
        checkAllCheckbox = $("thead .delete-check > input").click(checkAllRows);
        $("#batch-delete-button").click(showBatchDeleteConfirmation);
    });

    function enterKeydownHandler(event) {
        if (event.which === 13) {
            saveButtonHandler();
        }
    }

    function saveButtonHandler() {
        if (lastNameInput.val() === "" && firstNameInput.val() === "" && phoneInput.val() === "") {
            return;
        }

        if (!validateForm()) {
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
            .addClass("delete-button")
            .appendTo(row);
        var checkCell = $("<td>")
            .addClass("delete-check")
            .appendTo(row);

        $("<a>")
            .html("&#10060;")
            .attr("href", "javascript://")
            .click(function () {
                showDeleteConfirmation(row);
            })
            .appendTo(deleteCell);

        $("<input>")
            .attr("type", "checkbox")
            .attr("title", "Выбрать контакт").click(function () {
                checkRow(row);
            }).appendTo(checkCell);

        clearInputs();

        setIsCheckedAllFalse();
    }

    function validateForm() {
        lastNameInput.removeClass(inputErrorClass);
        firstNameInput.removeClass(inputErrorClass);
        phoneInput.removeClass(inputErrorClass);
        $(".error-message").remove();

        if (!useCheckAndDisplayError(checkForEmptyInputs)) {
            return false;
        }

        return useCheckAndDisplayError(checkForExistingPhone);
    }

    function useCheckAndDisplayError(check) {
        var checkResult = check();

        if (checkResult.isError) {
            $("<p>")
                .addClass("error-message")
                .html(checkResult.message)
                .appendTo(".new-contact-form");

            return false;
        }

        return true;
    }

    function checkForEmptyInputs() {
        var isError = false;

        var errorMessageFirst = "Необходимо заполнить пол";
        var errorMessageFirstEnding = "е";
        var errorMessageLast = "";

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

        return {
            isError: isError,
            message: errorMessageFirst + errorMessageFirstEnding + "<br>" + errorMessageLast
        };
    }

    function checkForExistingPhone() {
        for (var i = 0; i < rows.length; i++) {
            if (phoneInput.val() === rows[i].children(".phone").text()) {
                phoneInput.addClass(inputErrorClass);

                return {
                    isError: true,
                    message: "Контакт с таким номером телефона уже добавлен"
                };
            }
        }

        return {
            isError: false
        };
    }

    function clearInputs() {
        lastNameInput.val("")
            .focus();
        firstNameInput.val("");
        phoneInput.val("");
    }

    function removeRow(row) {
        row.remove();
        rows.splice(rows.indexOf(row), 1);

        reindex();

        var checkedRowIndex = checkedRows.indexOf(row);
        if (checkedRowIndex !== -1) {
            checkedRows.splice(checkedRowIndex, 1);
            updateBatchDeleteText();
        }

        setIsCheckedAllFalse();
    }

    function showDeleteConfirmation(row) {
        $(".delete-confirmation").dialog({
            dialogClass: "no-close",
            resizable: false,
            height: "auto",
            width: 450,
            modal: true,
            buttons: [
                {
                    text: "Удалить контакт",
                    click: function() {
                        $(this).dialog("close");
                        removeRow(row);
                    }
                },
                {
                    text: "Отмена",
                    click: function() {
                        $(this).dialog("close");
                    }
                }
            ]
        });
    }

    function reindex() {
        var index = 1;

        rows.forEach(function (row) {
            row.children(".index")
                .text(index++);
        })
    }

    function checkAllRows() {
        if (!isCheckedAll) {
            rows.forEach(function (row) {
                if (checkedRows.indexOf(row) === -1) {
                    checkedRows.push(row);
                    row.children(".delete-check")
                        .children("input")
                        .prop("checked", true);
                }
            });

            isCheckedAll = true;
        } else {
            checkedRows.splice(0, checkedRows.length);

            rows.forEach(function (row) {
                row.children(".delete-check")
                    .children("input")
                    .prop("checked", false);
            });

            isCheckedAll = false;
        }

        toggleBatchDeletePopup();
    }

    function setIsCheckedAllFalse() {
        isCheckedAll = false;
        checkAllCheckbox.prop("checked", false);
    }

    function checkRow(row) {
        setIsCheckedAllFalse();

        var checkedRowIndex = checkedRows.indexOf(row);

        if (checkedRowIndex === -1) {
            checkedRows.push(row);
        } else {
            checkedRows.splice(checkedRowIndex, 1);
        }

        toggleBatchDeletePopup();
    }

    function toggleBatchDeletePopup() {
        var batchDeletePopup = $(".batch-delete-popup");
        var phoneBook = $(".phone-book");

        if (checkedRows.length > 0){
            updateBatchDeleteText();

            batchDeletePopup.show();
            phoneBook.addClass("batch-delete-popup-push");
            return;
        }
        batchDeletePopup.hide();
        phoneBook.removeClass("batch-delete-popup-push");
    }

    function updateBatchDeleteText() {
        $(".batch-delete-count")
            .text(checkedRows.length);
        $(".batch-delete-text-ending")
            .text(getBatchDeleteTextEnding());
    }

    function showBatchDeleteConfirmation() {
        $(".batch-delete-confirmation").dialog({
            dialogClass: "no-close",
            resizable: false,
            height: "auto",
            width: 450,
            modal: true,
            buttons: [
                {
                    text: "Удалить " + checkedRows.length + " контакт" + getBatchDeleteTextEnding(),
                    click: function () {
                        $(this).dialog("close");
                        batchRemoveRows();
                        toggleBatchDeletePopup();
                        setIsCheckedAllFalse();
                    }
                },
                {
                    text: "Отмена",
                    click: function () {
                        $(this).dialog("close");
                    }
                }
            ]
        });
    }

    function getBatchDeleteTextEnding() {
        switch (checkedRows.length % 10) {
            case 1:
                return  "";
            case 2:
            case 3:
            case 4:
                return "а";
            default:
                return "ов";
        }
    }

    function batchRemoveRows() {
        while (checkedRows.length > 0) {
            var row = checkedRows.pop();

            row.remove();
            rows.splice(rows.indexOf(row), 1);
        }

        reindex();
    }
})();