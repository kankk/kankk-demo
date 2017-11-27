// 类型
function greeter(person) {
    return "Hello, " + person;
}
var user = "Kankk";
console.log(greeter(user));
function greeter(person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
var user = {
    firstName: "KK",
    lastName: "Kan"
};
console.log(greeter(user));
// 类
var Student = /** @class */ (function () {
    function Student(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
    return Student;
}());
function greeter(person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
var user = new Student("KK", "D.", "Kan");
console.log(greeter(user));
