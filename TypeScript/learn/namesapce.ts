namespace Totoro {
  export function walk(msg): number {
    console.log(`duck walk: ${msg}`);
    return msg.length;
  }
  export function speak(msg): void {
    console.log(`duck speak: ${msg}`);
  }
}

// 内联类型
let toy: {
  name: string;
  year: number;
  game?: any;
}

toy = {
  name: 'switch',
  year: 2017,
}

// 接口
interface Name {
  first: string;
  last: string;
}

// 接口
interface Person {
  name: Name;
  age: number;
}

// 类型别名
type Text = string | { text: string };

const text1: Text = 'text';
const text2: Text = { text: 'text'};

export {
  Totoro,
  Person
};