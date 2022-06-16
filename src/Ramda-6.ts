import R from "ramda";

const logSplit = (number?: number) => console.log(`--------------------TITLE NO.${number ?? 0}--------------------`);
// Ramda库专项练习六
// 1.	lensIndex，创建一个函数，接收三个参数分别为索引i、值v和数组arr，该方法将返回一个arr数组的副本并且索引i处的值设置为v
logSplit(1);
const lensIndex = (i: number, v: any, arr: any[]) => R.set(R.lensIndex(i), v, arr);
console.log(lensIndex(0, "x", ["a", "b", "c"]));

// 2.	lensPath，创建一个lens，可以用来读取和设置一个数组中第一项（索引为0）的first属性
logSplit(2);
const lensPath = R.lensPath([0, "first"]);
console.log(R.set(lensPath, "x", ["a", "b", "c"]));

// 3.	lensProp，创建一个lens，可以用来读取和设置对象的name属性
logSplit(3);
// @ts-ignore
const lensProp = R.lensProp("name");
// @ts-ignore
console.log(R.set(lensProp, "x", { name: "y" }));
console.log(R.view(lensProp, { name: "y" }));

// 4.	lt，创建一个函数，接收一个数字数组nums，将nums中小于0的数转为0
logSplit(4);
const lt = R.map(R.when(R.lt(R.__, 0), R.always(0)));
console.log(lt([1, 2, -1, -2]));

// 5.	lte，创建一个函数，接收一个数字n，判断n是否为非负数
logSplit(5);
const lte = R.lte(0);
console.log(lte(-1));

// 6.	mapAccum，创建一个函数，接收一个数字数组nums，对nums进行累加操作，返回此nums所有数字和与每次叠加结果组成的数组
logSplit(6);
// @ts-ignore
const mapAccum = R.mapAccum(R.juxt([R.add, R.add]), 0);
// @ts-ignore
console.log(mapAccum([1, 2, 3, 4]));

// 7.	mapObjIndexed、toString，创建一个函数，接收一个对象，将对象中的非字符串值转为字符串
logSplit(7);
const mapObjIndexed = R.mapObjIndexed(R.toString);
console.log(mapObjIndexed({ a: 1, b: 2, c: 3 }));

// 8.	match，创建一个函数，接收一个价格字符串，比如10元一斤，获取其中的数字
logSplit(8);
const match = R.pipe(R.match(/[1-9]\d*\.?\d/g), R.head);
console.log(match("10元一斤"));

// 9.	max，创建一个函数，接收一个数字n，如果n大于10则返回n，否则返回10
logSplit(9);
const max = R.max<number>(10);
console.log(max(11));
console.log(max(9));

// 10.	maxBy，创建一个函数，接收两个数字，获取其中绝对值较大的值
logSplit(10);
const maxBy = R.maxBy(Math.abs);
console.log(maxBy(-1, 2));
console.log(maxBy(-3, -2));

// 11.	mean，创建一个函数，接收一个二维数字数组，获取每个内部数组的平均值的平均值
logSplit(11);
const mean = R.pipe(R.map(R.mean), R.flatten, R.mean);
console.log(mean([[1, 3], [4]]));

// 12.	median，创建一个函数，接收一个数字数组，过滤出其中大于中位数的数字
logSplit(12);
// @ts-ignore
const median = R.chain(R.filter, R.pipe(R.median, R.lt));
// @ts-ignore
console.log(median([1, 2, 3, 4, 5]));

// 13.	memoizeWith，创建一个函数，接收一段字符串后，返回一个1-1000的随机数，并在之后输入相同的字符串时输出相同的结果
logSplit(13);
const memoizeWith = R.memoizeWith(R.identity, (n) => {
  console.log(n);
  return Math.floor(Math.random() * 1000);
});
console.log(memoizeWith("a"));
console.log(memoizeWith("a"));
// 14.	mergeRight、invertObj，创建一个函数，接收一个对象m，将对象m的属性和值互换后与m合并，并返回合并后的结果
logSplit(14);
const mergeRight: (obj: Record<string, any>) => Record<string, any> = R.chain(R.mergeRight, R.invertObj);
console.log(mergeRight({ a: 1, b: 2, c: 3 }));
// 15.	mergeAll、unapply，创建一个函数，接收对象a,b,c,…n为参数，返回这些对象合并后的结果
logSplit(15);
const mergeAll = R.unapply(R.mergeAll);
console.log(mergeAll({ a: 1, b: 2, c: 3 }, { d: 4, e: 5, f: 6 }));

// 16.	mergeDeepRight，创建一个函数，其效果与mergeDeepLeft一致
logSplit(16);
const mergeDeepRight = R.flip(R.mergeDeepRight);
console.log(mergeDeepRight({ a: 1, b: 2, c: 3 }, { c: 6 }));
// 17.	mergeWithKey，创建一个函数，用于合并两个对象，在合并相同属性的时候，若左边值布尔运算后为true则选择左边，否则选择右边
logSplit(17);
const mergeWithKey = R.mergeWithKey((k, l, r) => R.or(l, r));
console.log(mergeWithKey({ a: true, b: false, c: 3 }, { a: 1, b: 2, c: 6 }));
// 18.	min，创建一个函数，接收一个数字数组，获取其中最小值（不使用Math.min函数），若数字数组中值均大于0，则返回结果为0
logSplit(18);
const min = R.reduce(R.min, 0);
console.log(min([1, 2, 3, 4, 5]));
console.log(min([-1, -2, -3, -4, -5]));

// 19.	minBy，创建一个函数，接收两个字符串，返回其中长度小的那个
logSplit(19);
const minBy = R.minBy<string>(R.length);
console.log(minBy("a", "b1212"));

// 20.	module，创建一个函数，接收一个数字数组，返回数组总和与长度的求模结果
logSplit(20);
// @ts-ignore
const modulo = R.converge(R.modulo, [R.sum, R.length]);
// @ts-ignore
console.log(modulo([1, 2, 3, 3]));
// 好好学习 ，天天向上
