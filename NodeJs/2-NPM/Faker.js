var faker = require('faker');

var name = faker.name.findName();
console.log(name);
var id = faker.helpers.userCard();
console.log(id);
id = faker.phone.phoneNumber();
// console.log(id);
// id = faker.hacker.abbreviation();
// console.log(id);
// id = faker.hacker.adjective();
// console.log(id);
// id = faker.hacker.noun();
// console.log(id);
// id = faker.hacker.phrase();
// console.log(id);