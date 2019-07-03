var array = [1, 4, 6, 2, 3, 5, 7, 8];

function getSortedArrayByDescending(array) {
    var result = array.slice();

    return result.sort(function (a, b) {
        return b - a;
    });
}

console.log("sorted by descending: ", getSortedArrayByDescending(array));

function getFirstFiveElementsOfArray(array) {
    return array.slice(0, 5);
}

console.log("first five elements of array: ", getFirstFiveElementsOfArray(array));

function getLastFiveElementsOfArray(array) {
    return array.slice(-5);
}

console.log("last five elements of array: ", getLastFiveElementsOfArray(array));

function getSumOfEvenNumbersInArray(array) {
    return array.reduce(function (accumulator, currentValue) {
        if (currentValue % 2 === 0) {
            return accumulator + currentValue;
        }

        return accumulator;
    }, 0);
}

console.log("sum of even numbers in array: ", getSumOfEvenNumbersInArray(array));

var arrayFromOneToHundred = [];
for (var i = 1; i <= 100; i++) {
    arrayFromOneToHundred.push(i);
}

function getSquaresOfEvenNumbers(array) {
    return array.filter(function (value) {
        return value % 2 === 0;
    }).map(function (value) {
        return Math.pow(value, 2)
    });
}

console.log("squares of even numbers from 1 to 100: ", getSquaresOfEvenNumbers(arrayFromOneToHundred));