import R, { AnyFunction, type } from "ramda";
import * as CONSTANTS from "constants";

type func<R> = (a: R) => R;
// Ramda库专项练习二
const logSplit = (number?: number) => console.log(`--------------------TITLE NO.${number ?? 0}--------------------`);

// 1.  call，创建一个函数 ，其接收多个数字，返回这些数字的和
logSplit(1);
const sum = R.unapply(R.sum);
const sum2 = R.call(R.unapply, R.sum);
console.log(sum(1, 2, 3, 4, 5));
console.log(sum2(1, 2, 3, 4, 5));
// 2.  chain，创建一个函数，其将一个字符串数组中的每一个字符串的内容都展开到一个数组中，例如将[‘好好学习’, ’天天向上’]=> [‘好’, ’好’, ’学’, ’习’, ’天’, ’天’, ’向’, ’上’]
logSplit(2);
const flatten = R.chain(R.split(""));
console.log(flatten(["好好学习", "天天向上"]));
// 3.  chain，创建一个函数 ，计算x * x - 2x的值
logSplit(3);
const fx = R.chain(R.multiply, R.flip(R.subtract)(2));
console.log(fx(3));

// 4.  clamp，创建一个函数，传入一个数字，如果该数字大于等于1且小于等于100则返回该数字；如果该数字小于1，则返回1；如果该数字大于100则返回100
logSplit(4);
const clamp = R.clamp(1, 100);
console.log(clamp(0));
console.log(clamp(2));
console.log(clamp(101));

// 5.  clone，创建一个函数 ，传入一个对象后，返回一个这个对象的深度复制版本，且添加属性from，属性值为传入的对象
logSplit(5);
let obj = { a: 1, b: { c: 2, d: 3 } };
let clone: (o: object) => object = R.converge<object, [(o: object) => object, (o: object) => object], [(o: object) => object, (o: object) => object]>(R.assoc("from"), [R.identity, R.clone]);
let clone2: (o: object) => object = R.ap<object, object, object>(R.assoc("from"), R.clone);
let obj2 = clone2(obj);
console.log(obj2);
obj.b.c = 0;
console.log(obj2);
// 6.  comparator，创建一个函数，传入一个数字数组，对这个数组按照绝对值大小进行排序
logSplit(6);
const sort = R.sort(R.comparator(R.on<number, number, boolean>(R.lte, Math.abs)));
console.log(sort([-2, -3, -1, 4, -5, 6]));

// 7.  complement，创建一个函数 ，用于判断一个数字不是NaN
logSplit(7);
const isNotNaN = R.complement(isNaN);
console.log(isNotNaN(1));

// 8.  concat，创建一个函数，接收一个数组和字符串，将字符串的每个字符添加到数组中。
logSplit(8);
const concat = R.useWith<string, string[], any, any[], any[]>(R.concat, [R.split(""), R.identity]);
console.log(concat("abc", ["d", "e"]));
// 9.  cond，创建一个函数，接收一个数字n，当n >= 0.95时返回A +；当n >= 0.8时返回A；当n >= 0.5时返回B；当n >= 0.05时返回C；其余返回D（返回字符串的方法可使用always函数创建）
logSplit(9);
const cond = R.cond([
  [R.lte(0.95), R.always("A+")],
  [R.lte(0.8), R.always("A")],
  [R.lte(0.5), R.always("B")],
  [R.lte(0.05), R.always("C")],
  [R.T, R.always("D")],
]);
console.log(cond(0.94));
// 10. construct，创建一个函数，用于创建日期对象，日期对象的年月日固定为2018年08月 08日，只需要再传入时、分、秒即可创建一个日期对象
logSplit(10);
const construct = R.construct<number[], Date>(Date)(2018, 7, 8, R.__, R.__, R.__, 0);
console.log(construct(0, 0, 0));

// 11. contains(已经废弃)，创建一个函数，用于判断数组中是否有一个空对象
logSplit(11);
const contains = R.any(R.both(R.is(Object), R.isEmpty));
console.log(contains([0, null, undefined, ""]));
console.log(contains([{}]));
// 12. converge，创建一个函数，传入一个数字数组，返回这组数字的平均值
logSplit(12);
const converge = R.converge<number, [(arr: number[]) => number, (arr: number[]) => number], any>(R.divide, [R.sum, R.length]);
console.log(converge([1, 2, 3]));
// 13. countBy，创建一个函数，接收一个中文名数组，获取每个姓氏的数量（假设数组中没有复姓名称）
logSplit(13);
const countBy = R.countBy<string>(R.head);
console.log(countBy(["陆林冲", "陆大侠", "张恩泽", "张大人", "朱快乐"]));
// 14. dec，创建一个函数，可以计算一个正整数阶乘的结果
logSplit(14);
const dec = R.pipe(R.unfold((n: number) => R.lte(n, 1) ? false : [n, R.dec(n)]), R.reduce(R.multiply, 1));
console.log(dec(4));
// 15. defaultTo，创建一个函数func，接收一个函数A作为参数，并返回一个函数B；运行时将函数B的参数传给函数A，并计算函数A的结果，如果函数A 的结果为null、undefined或NaN则返回0，否则返回函数A的结果
logSplit(15);
const func = (funcA: AnyFunction) => (...args: any[]): any => R.defaultTo(0, R.apply(funcA, args));
console.log(func(R.add)(1, "t"));
// 16. descend，创建一个函数，对数组中的字符串按照其编码值降序来排列 ，比如数组[‘aa’, ’ab’] => [‘ab’, ‘aa’]
logSplit(16);
const sortDescCode = R.sort(R.descend<string>(R.identity));
console.log(sortDescCode(["aa", "ab"]));
// 17. difference，创建一个函数，接收两个数组作为参数，判断第一个数组中是否有第二个数组中的值
logSplit(17);
const difference = (arr: number[], arr2: number[]) => {
  return R.length(R.difference(arr, arr2)) !== R.length(arr);
};
//@ts-ignore
const difference2: (arr: any[], arr2: any[]) => boolean = R.converge(R.complement(R.equals), [R.pipe(R.difference, R.length), R.pipe(R.nthArg(0), R.length)]);
console.log(difference2(["1", "2", "3"], [3]));


// 18. differenceWith，创建一个函数，传入两个字符串数组，取出第一个 数组中未包含在第二个数组中的字符串（不区分大小写）
logSplit(18);
const differenceWith = R.differenceWith<string, string>(R.on<string, string, boolean>(R.equals, R.toLower));
console.log(differenceWith(["aa", "ab"], ["Ac", "AB"]));
// 19. dissoc，创建一个函数，传入一个对象，删除该对象上值不为字符串或字符串数组的属性
const isStrOrStrArray = R.either<(paras: any) => boolean>(R.is(String), R.both(R.is(Array), R.all(R.is(String))));
logSplit(19);
const filter = R.filter(isStrOrStrArray);
console.log(filter({ a: "1", b: ["2", "3"], c: 4, d: { a: 1 }, f: [1] }));


// 20. dissocPath，创建一个函数，传入一个对象数组，其将会删除数组中最后一项的next属性
logSplit(20);
const getPath: (arr: any[]) => any[] = R.pipe(R.length, R.dec, R.of, R.concat(R.__, ["next"]));
const deleteLastObjNext = R.converge<any[], [(arr: any[]) => any[], (arr: any[]) => any[]], any>(R.dissocPath, [getPath, R.identity]);
console.log(deleteLastObjNext([{ a: 1, next: { a: 1 } },{ a: 2, next: { a: 2 } }]));
