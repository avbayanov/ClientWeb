var countriesWithCities = [
    {
        name: "Country1",
        cities: [
            {
                name: "City1InCountry1",
                population: 1000
            },
            {
                name: "City2InCountry1",
                population: 2000
            },
            {
                name: "City3InCountry1",
                population: 3000
            }
        ]
    },
    {
        name: "Country2",
        cities: [
            {
                name: "City1InCountry2",
                population: 5000
            },
            {
                name: "City2InCountry2",
                population: 8000
            }
        ]
    },
    {
        name: "Country3",
        cities: [
            {
                name: "City1InCountry3",
                population: 1500
            },
            {
                name: "City2InCountry3",
                population: 4500
            },
            {
                name: "City3InCountry3",
                population: 6500
            }
        ]
    }
];

function getCountriesWithMaxCitiesCount(countriesWithCities) {
    var maxCitiesCount = countriesWithCities.reduce(function (accumulator, currentValue) {
        if (currentValue.cities.length > accumulator) {
            return currentValue.cities.length;
        }
        return accumulator;
    }, 0);

    return countriesWithCities.filter(function (value) {
        return value.cities.length === maxCitiesCount;
    });
}

console.log("countries with max cities count:  ", getCountriesWithMaxCitiesCount(countriesWithCities));

function getTotalPopulationOfCountry(country) {
    return country.cities.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue.population;
    }, 0);
}

function getCountriesWithTotalPopulation(countriesWithCities) {
    return countriesWithCities.map(function (value) {
        return {
            name: value.name,
            totalPopulation: getTotalPopulationOfCountry(value)
        };
    });
}

console.log("countries with their total population: ", getCountriesWithTotalPopulation(countriesWithCities));