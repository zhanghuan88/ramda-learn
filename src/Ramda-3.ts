import R  from "ramda";

const logSplit = (number?: number) => console.log(`--------------------TITLE NO.${number ?? 0}--------------------`);
// 1.	divide，创建一个函数，传入一个数字，获取其第一位上的数字
logSplit(1);
const divide = R.pipe<any, string, string>(R.toString, R.head);
console.log(divide(0.1));
// 2.	drop，创建一个函数，传入一个字符串数组，将字符串值为start的项之前的项都删除
logSplit(2);
const drop = R.chain(R.drop, R.findLastIndex(R.equals("start")));
console.log(drop(["start", "test", "start", "end"]));
// 3.	dropLast，创建一个函数，接收一个字符串，删除字符串中$符号之后的内容
logSplit(3);
const dropLast = R.pipe(R.split("$"), R.nth(0));
//@ts-ignore
const dropLast2: (str: string) => string = R.chain(R.dropLast, R.converge(R.subtract, [R.length, R.pipe(R.findIndex(R.equals("$")))]));
console.log(dropLast2("start$test$end$"));
// 4.	dropLastWhile，创建一个函数，传入一个字符串，从后往前删除不是数字或字母的字符，如果有数字或字母则停止
logSplit(4);
//@ts-ignore
const dropLastWhile: (str: string) => string = R.dropLastWhile(R.complement(R.test(/[a-zA-Z\d]/)));
console.log(dropLastWhile("!@#$$a$$$"));
// 5.	dropRepeats，创建一个函数，传入一个字符串，去除其中连续重复的字符（区分大小写）
logSplit(5);
//@ts-ignore
const dropRepeats: (params: string[] | string) => string = R.pipe(R.dropRepeats, R.join(""));
console.log(dropRepeats("aaabbbaccc"));
// 6.	dropRepeatsWith，创建一个函数，传入一个字符串，去除其中连续重复的字符（不区分大小写）
logSplit(6);
//@ts-ignore
const dropRepeatsWith: (params: string[] | string) => string = R.pipe(R.dropRepeatsWith(R.eqBy(R.toLower)), R.join(""));
console.log(dropRepeatsWith("aaabbabaccc"));

// 7.	dropWhile，创建一个函数，传入一个字符串格式的数字，去除其开头不是数字或者是0的字符
logSplit(7);
const dropWhile = R.pipe(R.dropWhile(R.complement(R.test(/^[1-9]/))), R.join(""));
// @ts-ignore
console.log(R.dropWhile(R.complement(R.test(/[1-9]/)))("asd0123456789"));
// 8.	either，创建一个函数，传入一个值，判断其类型是字符串或者字符串数组
logSplit(8);
const either: (any: any) => boolean = R.either(R.is(String), R.both(R.is(Array), R.all(R.is(String))));
console.log(either("test"));
console.log(either(["test"]));
console.log(either(1));

// 9.	empty，创建一个函数，传入一个对象，用empty函数初始化这个对象自身的所有属性值
logSplit(9);
// @ts-ignore
const empty: (arg: any[] | object) => any[] | object = R.map(R.empty);
console.log(empty({ a: 1, b: 2, c: { a: 1 } }));

// 10.	endsWith，创建一个函数，传入一个字符串数组，过滤出其中以end结尾的所有字符串
logSplit(10);
const endsWith = R.filter(R.endsWith("end"));
console.log(endsWith(["start", "test", "end1212", "1212end"]));

// 11.	eqBy，创建一个函数，其可以用来判断两个字符串是否在不区分大小写的情况下相同
logSplit(11);
const eqBy = R.eqBy(R.toLower);
console.log(eqBy("a", "A"));

// 12.	eqProps，创建一个函数，接收两个对象，返回由两个对象自身所有的相等的属性值组成的对象
logSplit(12);
const eqProps = (obj1:Record<string, any>, obj2:Record<string, any>) =>{
  let obj:Record<string, any> = {};
  R.forEachObjIndexed((value, key) => {
    if (R.equals(value, obj2[key])) {
      obj[key] = value;
    }
  }, obj1);
  return obj;
};
// @ts-ignore
const eqProps2 = R.pipe(R.converge(R.intersection,[R.pipe(R.nthArg(0),R.toPairs),R.pipe(R.nthArg(1),R.toPairs)]),R.fromPairs)
console.log(eqProps2({ a: 1, b: 2 }, { a: 1, b: 3 }));
// 13.	equals，创建一个函数，传入一个对象，判断其是否是一个空对象
logSplit(13);
const equals = R.equals({});
console.log(equals({}));
console.log(equals({ a: 1 }));
// 14.	evolve，创建一个函数，传入一个有a和b属性的对象，返回一个也有a和b属性的对象，返回对象的a属性为参数a属性的大写，b属性为参数b属性的小写

// 15.	F，创建一个函数，接收一个数组，将数组中的所有项转为false
logSplit(15);
const F = R.map(R.F);
console.log(F([1, 2, 3]));
// 16.	filter，创建一个函数，接收一个数字数组，过滤出其中大于10的数
logSplit(16);
const filter = R.filter(R.lte(10));
console.log(filter([1, 2, 3, 11, 12, 13]));
// 17.	find，创建一个函数，接收一个字符串数组，返回其中第一个有字符串皮卡丘的字符串
logSplit(17);
const find = R.find(R.includes("皮卡丘"));
console.log(find(["火影", "火影忍者", "1212皮卡丘"]));

// 18.	findIndex，创建一个函数，接收一个数字数组，返回其中第一个值大于10的项的索引值
logSplit(18);
const findIndex = R.findIndex(R.lt(10));
console.log(findIndex([1, 2, 3, 11, 12, 13]));
// 19.	findLast，创建一个函数，接收一个数字数组，返回其中最后一个小于10的数
logSplit(19);
const findLast = R.findLast(R.gt(10));
console.log(findLast([1, 2, 10, 11, 12, 13]));

// 20.	findLastIndex，创建一个函数，接收一个字符串数组，返回其中最后一个包含有伊布的项的索引
logSplit(20);
const findLastIndex = R.findLastIndex(R.includes("伊布"));
console.log(findLastIndex(["火影", "火影忍者", "1212伊布"]));
// 好好学习 ，天天向上
