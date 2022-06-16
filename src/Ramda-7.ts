import R from "ramda";

const logSplit = (number?: number) => console.log(`--------------------TITLE NO.${number ?? 0}--------------------`);
// 1.	move，创建一个函数，接收一个字符串数组（并且包含end字符串），将end字符串移动到最后
logSplit(1);
// @ts-ignore
const move = R.converge(R.move(R.__, -1), [R.findIndex(R.equals("end")), R.identity]);
// @ts-ignore
console.log(move(["start", "end", "middle", "test"]));
// 2.	multiply，创建一个函数，接收一个数字n，返回n*(n+1)的结果
logSplit(2);
const multiply = R.ap(R.multiply, R.inc);
console.log(multiply(3));

// 3.	nAry，创建一个函数，接收一个数字数组，返回数组前五位的最大值，不足五位时则返回NaN
logSplit(3);
const nAry = R.nAry(5, Math.max);
// @ts-ignore
console.log(nAry(1, 2, 3, 4, 5, 6, 7, 8, 9, 10));
// @ts-ignore
console.log(nAry(1, 2, 3));

// 4.	negate，创建一个函数，接收一个数字数组，将数组中的奇数取反
logSplit(4);
// @ts-ignore
const negate = R.map(R.ifElse(R.modulo(R.__, 2), R.negate, R.identity));
console.log(negate([1, 2, 3, 4, -1, -2]));

// 5.	none，创建一个函数，接收一个字符串数组，判断数组中是否都是可以用Number函数转成数字的字符串
logSplit(5);
const none = R.none(isNaN);
// @ts-ignore
console.log(none(["1", "2", "3"]));
// @ts-ignore
console.log(none(["x"]));
// 6.	not，创建一个函数，接收一个字符串数组，判断其中有没有空字符串，返回true表示有
logSplit(6);
const not = R.pipe(R.findIndex(R.not), R.lt(-1));
console.log(not(["", "2", "3"]));
// 7.	nth，创建一个函数，接收一个数字数组，返回其中第一项与最后一项的和
logSplit(7);
// @ts-ignore
const nth = R.converge(R.add, [R.nth(0), R.nth(-1)]);
// @ts-ignore
console.log(nth([1, 2, 3, 4, 5]));

// 8.	nthArg，创建一个函数，其行为与nth函数一致
logSplit(8);
// @ts-ignore
const nthArg = R.unapply(R.converge(R.add, [R.nthArg(0), R.nthArg(-1)]));
// @ts-ignore
console.log(nth([1, 2, 3, 4, 5]));
// 9.	o，创建一个函数，接收一个数组，去除其中不能通过Number函数转为数字的字符串，然后再将所有值转为数字后求和并返回结果
logSplit(9);
const o = R.o<any[],any,number[]>(R.map(Number), R.filter(R.complement(isNaN)));
console.log(R.sum(o(["1", "x", 2])));
// 10.	objOf，创建一个函数，接收一个数字数组，返回以数组长度为key、数组总和为value的对象
logSplit(10);
// @ts-ignore
const objOf = R.converge(R.objOf, [R.length, R.sum]);
// @ts-ignore
console.log(objOf([1, 2, 3, 4, 5]));
// 11.	of，创建一个函数，接收一个数字n，返回由n与n的反数-n组成的二元数组
logSplit(11);
const of = R.ap(R.append,R.pipe(R.negate,R.of))
console.log(of(1));
// 12.	omit，创建一个函数，接收一个对象，删除对象中值不为字符串的属性
logSplit(12);
const omit =R.chain(R.omit,R.pipe(R.filter(R.complement(R.is(String))),R.keys));
console.log(omit({a:1,b:2,c:"3"}));
// 13.	once，创建一个函数，获取一个1-10的随机数，并且此后每次重复执行都会获取相同的结果
logSplit(13);
const once = R.once(()=> Math.floor(Math.random() * 10) + 1);
console.log(once());
console.log(once());
// 14.	or，创建一个函数，接收一个数字n，判断n是否满足n<0或n>100
logSplit(14);
// @ts-ignore
const or:(n:number)=>boolean = R.converge(R.or, [R.lt(R.__, 0), R.gt(R.__, 100)]);
console.log(or(1));
console.log(or(-1));
console.log(or(101));
// 16.	over，创建一个函数，接收一个对象n，给n设置end属性、属性值为false
logSplit(16);
// @ts-ignore
const over = R.over(R.lensProp("end"), R.always(false));
// @ts-ignore
console.log(over({}));
// 17.	pair，创建一个函数，接收一个字符串n，返回由n与n的大写字符串组成的数组
logSplit(17);
const pair = R.ap(R.pair, R.toUpper);
console.log(pair("a"));
// 18.	partial，创建一个函数，接收一个数字n，返回n与100中较少的那个数
logSplit(18);
const  partial = R.partial(R.min, [100]);
console.log(partial(1));
console.log(partial(101));
// 19.	partialRight，创建一个函数，接收一个数字m，返回m-10的结果
logSplit(19);
const partialRight = R.partialRight(R.subtract, [10]);
console.log(partialRight(1));

// 20.	partition，创建一个函数，接收一个数字数组，其中大于0的数的个数为m，不大于0的数的个数为n，返回m-n的值
logSplit(20);
// @ts-ignore
const partition =R.pipe(R.partition(R.lt(0)),R.map(R.length),R.apply(R.subtract));
console.log(partition([1, 2, 3,-1]));


// 15.	otherwise，创建一个函数，接收一个promise，当promise失败时在控制台打印出错误消息
logSplit(15);
const otherwise = R.otherwise(R.tap(console.log));
otherwise(Promise.reject("test")).then((arg)=>{
    console.log(arg);
});

