// 类型
function greeter(person: string) {
    return "Hello, " + person;
}
let user = "Kankk";
console.log(greeter(user));

// 接口
interface Person {
    firstName: string;
    lastName: string;
}
function greeter(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
let user = {
    firstName: "KK",
    lastName: "Kan"
};
console.log(greeter(user));

// 类
class Student {
    fullName: string;
    constructor(public firstName: string, public middleInitial: string, public lastName: string) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}
interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
let user = new Student("KK", "D.", "Kan");
console.log(greeter(user));