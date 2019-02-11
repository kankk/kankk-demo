import { Totoro, Person } from './namesapce'

let distance: number = 0;

distance += Totoro.walk('-----');
Totoro.speak('hahaha');
distance += Totoro.walk('-----');

console.log(`Totoro walk: ${distance}`);

const author: Person = {
  name: {
    first: 'qihua',
    last: 'jian'
  },
  age: 27
}

console.log(author);

const moment: Moment = {
  format(timestamp) {
    timestamp = timestamp || +new Date();
    const _now: Date = new Date(timestamp);
    const year: number = _now.getFullYear();
    const month: number = _now.getMonth() + 1;
    const date: number = _now.getDate();
    const hour: number = _now.getHours();
    const minte: number = _now.getMinutes();
    const second: number = _now.getSeconds();

    const monthStr: string = month < 10 ? `0${month}` : `${month}`;
    const dateStr: string = date < 10 ? `0${date}` : `${date}`;
    const hourStr: string = hour < 10 ? `0${hour}` : `${hour}`;
    const minteStr: string = minte < 10 ? `0${minte}` : `${minte}`;
    const secondStr: string = second < 10 ? `0${second}` : `${second}`;
    return `${year}-${monthStr}-${dateStr} ${hourStr}:${minteStr}:${secondStr}`;
  }
}
console.log(moment.format());