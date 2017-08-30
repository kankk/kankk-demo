function greeter(person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
var user = {
    firstName: 'Qihua',
    lastName: 'Jian'
};
console.log(greeter(user));
