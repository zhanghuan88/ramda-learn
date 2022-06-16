import R, { any, T } from "ramda";

const logSplit = (number?: number) => console.log(`--------------------TITLE NO.${number ?? 0}--------------------`);
// Ramda库专项练习一
// 1.	add，使用该函数创建一个n+10的 函数
logSplit(1);
const add10 = R.add(10);
console.log(add10(5));
// 2.	addIndex、map，创建一个函数，该函数可以将数字数组[a]中的每一项乘以索引值
logSplit(2);
const indexMultiValue = R.addIndex<number, number>(R.map)(R.multiply);
console.log(indexMultiValue([1, 2, 3, 4, 5]));
// 3.	adjust，创建一个函数 ，将数组中的最后一项值修改为字符串end
logSplit(3);
const changeArrayEnd = R.adjust<any>(-1, R.always("end"));
console.log(changeArrayEnd([1, 2, 3, 4, 5]));
// 4.	all，创建一个函数，用于判断数组中的所有值是否都是数字
logSplit(4);
const arrIsNumber = R.all(R.is(Number));
console.log(arrIsNumber([1, 2, 3, 4, 5]));
console.log(arrIsNumber([1, 2, 3, 4, "5"]));
// 5.	allPass，创建一个函数，可以用来判断一个值：是数组、数组中有值和值都为字符串
logSplit(5);
const isStringArr = R.allPass([R.is(Array), R.complement(R.isEmpty), R.all(R.is(String))]);
console.log(isStringArr([1, 2, 3, 4, 5]));
console.log(isStringArr([]));
console.log(isStringArr(["1"]));

// 6.	always，创建一个函数，这个函数永远返回字符串我爱你
logSplit(6);
const alwaysILoveYou = R.always("我爱你");
console.log(alwaysILoveYou());
// 7.	and，创建一个函数，当传入一个转为布尔值为false的值时返回这个值，否则返回一个字符串pass
logSplit(7);
const andPass = R.flip(R.and)("pass");
console.log(andPass(false));
console.log(andPass(true));
// 8.	any，创建一个函数，用于判断数组[a]中是否有一个值的类型为数字
logSplit(8);
const arrHasNumber = R.any(R.is(Number));
console.log(arrHasNumber([1, 2, 3, 4, 5]));
console.log(arrHasNumber(["5"]));
// 9.	anyPass，创建一个函数，用于判断一个值是数字或者是可以转为数字的字符串
logSplit(9);
const isNumberOrString = R.anyPass<any>([R.is(Number), R.both(R.is(String), R.complement(isNaN))]);
console.log(isNumberOrString(1));
console.log(isNumberOrString("1"));
console.log(isNumberOrString("a"));
console.log(isNumberOrString(false));

// 10.	ap，创建一个函数，传入一个数字数组，获取一个新的数组，新数组的内容分别为原数组内容、原数组每项+1和原数组每项-1；
logSplit(10);
const ap = R.ap<number, number>([R.identity, R.add(1), R.flip(R.subtract)(1)]);
console.log(ap([1, 2]));

// 11.	ap，创建一个函数，传入一个数字a，获取a是否大于等于a*a的值（题目修改：将原来的a是否大于等于a*a+1做一定修改）
logSplit(11);
const gtMul = R.ap(R.gte, R.ap(R.multiply, R.identity));
const gtMul1 = R.ap(R.gte, R.pipe(R.ap<number, number, number>(R.multiply, R.identity), R.inc));
console.log(gtMul(2));
console.log(gtMul(0.5));
console.log(gtMul1(0.5));
console.log(gtMul1(-2));
// 12.	aperture，创建一个函数，传入数组，判断该数组中是否有相邻元素相等
logSplit(12);
const arrItemEqual = R.pipe(R.aperture(2), R.any(R.apply<any>(R.equals)));
console.log(arrItemEqual([1, 1, 3, 4, 5]));
console.log(arrItemEqual([1, 2, 3, 4, 5]));
// 13.	append，创建一个函数，传入数组，将在这个数组的末尾添加一个字符串end
logSplit(13);
const appendEnd = R.append<any>("end");
console.log(appendEnd([1, 2, 3, 4, 5]));
// 14.	apply，创建一个函数，用于获取数字数组中的最小值
logSplit(14);
const getMin = R.apply(Math.min);
console.log(getMin([1, 2, 3, 4, 5]));

// 15.	applySpec，创建一个函数，接收两个数字x和y，并返回一个由a、b、c三个属性组成的对象，其中a为x+y，b为x-y，c为x*y
logSplit(15);
let applySpec: (s: number, t: number) => { a: number; b: number; c: number } = R.applySpec<{ a: number; b: number; c: number }>({
  a: R.add,
  b: R.subtract,
  c: R.multiply,
});
console.log(applySpec(1, 2));
// 16.	applyTo，创建一个函数，其接收一个数字，并返回此数字的平方值
logSplit(16);
const func16: (n: number) => number = R.flip<any, any>(R.applyTo)(R.ap(R.multiply, R.identity));
console.log(func16(5));
// 17.	ascend、sort，创建一个函数，传入一个数字数组，使其按照数字的绝对值进行从小到大排序
logSplit(17);
const absSort = R.sort<number>(R.ascend(Math.abs));
console.log(absSort([-6, -2, 3, -4, 5]));
// 18.	assoc，创建一个函数，传入一个对象，其会将这个对象的from属性设置为值字符串Earth
logSplit(18);
const assocForm = R.assoc("from", "Earth");
console.log(assocForm({ name: "John" , from: "China" }));
// 19.	assocPath，创建一个函数，传入一个对象，其会给这个对象的from属性设置为字符串Earth
logSplit(19);
const assocPathForm = R.assocPath(["from"], "Earth");
console.log(assocPathForm({ name: "John" , from: "China" }));
// 20.	binary，创建一个Math.max函数的两个参数的版本
logSplit(20);
const binaryMax = R.binary(Math.max);
console.log(binaryMax(1, 2));
// 21.	bind，创建一个函数，接收两个参数，一个是对象obj，另一个是字符串key，返回obj是否有这个key属性。注：使用Object.prototype.hasOwnProperty方法
const hasKey = (obj:Object, key:string) => R.bind(Object.prototype.hasOwnProperty, obj)(key);
logSplit(21);
console.log(hasKey({ name: "John" , from: "China" }, "name"));
// 22.	both，创建一个函数，用于判断数组中的值均为数字且数字都是>=0且<=100
logSplit(22);
const both = R.all(R.both(R.is(Number), R.both(R.lte(0), R.gte(100))));
console.log(both([1, 2, 3, 4, 5]));
console.log(both([1, 2, 3, 4, 101]));

