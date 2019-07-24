(function (){
    var people = [
        {
            name: "name1",
            lastName: "lastName1",
            age: 46
        },
        {
            name: "name2",
            lastName: "lastName2",
            age: 41
        },
        {
            name: "name3",
            lastName: "lastName3",
            age: 36
        },
        {
            name: "name4",
            lastName: "lastName4",
            age: 16
        },
        {
            name: "name5",
            lastName: "lastName5",
            age: 26
        },
        {
            name: "name6",
            lastName: "lastName6",
            age: 21
        },
        {
            name: "name7",
            lastName: "lastName7",
            age: 31
        },
        {
            name: "name8",
            lastName: "lastName8",
            age: 11
        },
        {
            name: "name9",
            lastName: "lastName9",
            age: 1
        },
        {
            name: "name10",
            lastName: "lastName10",
            age: 6
        }
    ];
    
    function getAverageAge(people) {
        return _.reduce(people, function (sum, person) {
            return sum + person.age;
        }, 0) / _.size(people);
    }

    console.log("average age of people: " + getAverageAge(people));

    function getPeopleInAgeRangeSortedByAgeAscending(people, from, to) {
        return _.chain(people)
            .filter(function (person) {
                return  person.age >= from && person.age <= to;
            })
            .sortBy("age")
            .value();
    }

    console.log("people age from 20 to 30 sorted by ascending order: "
        + JSON.stringify(getPeopleInAgeRangeSortedByAgeAscending(people, 20, 30)));

    function getPeopleWithFullName(people) {
        return _.map(people, function (person) {
            return _.extend({
                fullName: person.lastName + " " + person.name
            }, person);
        });
    }

    console.log("people with full name: " + JSON.stringify(getPeopleWithFullName(people)));
})();