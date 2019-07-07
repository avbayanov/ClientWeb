var celsiusInput;
var nanMessage;
var kelvinText;
var fahrenheitText;

document.addEventListener("DOMContentLoaded", function () {
    celsiusInput = document.getElementById("celsius-input");
    nanMessage = document.getElementById("nan-message");
    kelvinText = document.getElementById("kelvin-text");
    fahrenheitText = document.getElementById("fahrenheit-text");

    var convertButton = document.getElementById("convert-button");
    convertButton.addEventListener("click", convertButtonClickHandler);

    celsiusInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            convertButtonClickHandler();
        }
    })
});

function convertToKelvin(celsius){
    return celsius - 273.15;
}

function convertToFahrenheit(celsius) {
    return celsius * (9 / 5) + 32;
}

function updateKelvinText(kelvin) {
    kelvinText.innerText = kelvin;
}

function updateFahrenheitText(fahrenheit) {
    fahrenheitText.innerText = fahrenheit;
}

function convertButtonClickHandler() {
    var toKelvin = convertToKelvin(celsiusInput.value);

    if (isNaN(toKelvin)) {
        nanMessage.style.display = "inline";
        return;
    }
    nanMessage.style.display = "none";

    updateKelvinText(toKelvin);
    updateFahrenheitText(convertToFahrenheit(celsiusInput.value));
}