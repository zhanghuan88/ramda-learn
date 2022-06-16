import R from "ramda";

const logSplit = (number?: number) => console.log(`--------------------TITLE NO.${number ?? 0}--------------------`);
// 1.	innerJoin，创建一个函数，传入两个字符串数组，获取两个字符串数组中相同的字符串（可以有重复）
logSplit(1);
const innerJoin = R.innerJoin(R.equals);
console.log(innerJoin(["a", "c", "e", "c"], ["b", "c", "d"]));

// 2.	insert，创建一个函数，传入一个数字数组，在第一个小于10的数字前插入数字10
logSplit(2);
// @ts-ignore
const insert = R.chain(R.insert(R.__, 10), R.findIndex(R.gt(10)));
// @ts-ignore
console.log(insert([11, 12, 1, 2]));
// 3.	insertAll，创建一个函数，传入一个数字数组，在第一个大于10的数字之后插入数字1、2、3、4
logSplit(3);
// @ts-ignore
const insertAll = R.chain(R.insertAll(R.__, [1, 2, 3, 4]), R.pipe(R.findIndex(R.lt(10)), R.inc));
// @ts-ignore
console.log(insertAll([11, 12, 1, 2]));

// 4.	intersection，创建一个函数，传入两个字符串数组，获取两个数组中重复字符串的数量（不包含重复元素）
logSplit(4);
const intersection = R.pipe<[any[], any[]], any[], number>(R.intersection, R.length);
console.log(intersection(["a", "b", "c", "a"], ["a", "c", "d"]));
// 5.	intersperse，创建一个函数，接收一个数字数组，将这个数组的平均值作为分割元素插入该数组
logSplit(5);
const intersperse = R.chain(R.intersperse, R.mean);
console.log(intersperse([1, 2, 3, 4]));
// 6.	into，创建一个函数，接收字符串数组A和数字数组B，将数组A中能转为数字（使用parseInt）的字符串转成数字并添加到数组B中
logSplit(6);
const into = R.flip(R.into(R.__, R.pipe(R.filter(R.complement(isNaN)), R.map(parseInt))));
console.log(into(["1", "2", "c"], ["a", "b", "c"]));

// 7.	invert，创建一个函数，接收一个对象obj和一个任意类型值val，获取obj中值为val的属性的个数
logSplit(7);
// @ts-ignore
const invert = R.pipe(R.converge(R.prop, [R.nthArg(-1), R.invert]), R.length);
console.log(invert({ a: "A", b: "B", c: "C", d: "B" }, "B"));
// 8.	invertObj，创建一个函数，接收一个对象obj和一个任意类型值val，获取obj中值为val的一个属性名，没有则返回undefined
logSplit(8);
// @ts-ignore
const invertObj = R.converge(R.prop, [R.nthArg(-1), R.invertObj]);
// @ts-ignore
console.log(invertObj({ a: "A", b: "B", c: "C", d: "B" }, "B"));
// @ts-ignore
console.log(invertObj({ a: "A", b: "B", c: "C", d: "B" }, "F"));

// 9.	invoker，创建一个函数，参数只有两个数组，返回这两个数组合并之后的结果（顺序不限）
logSplit(9);
const invoker = R.invoker(1, "concat");
console.log(invoker(["a", "b"], ["c", "d"]));
// 10.	is，创建一个函数，接收一个值，判断其是否是一个Date实例
logSplit(10);
const is = R.is(Date);
console.log(is(new Date()));

// 11.	isEmpty，创建一个函数，接收一个数组，过滤掉其中的空值（值是否为空值用isEmpty函数）
logSplit(11);
const isEmpty = R.filter(R.complement(R.isEmpty));
console.log(isEmpty([1, 2, 3, 4, 5, 6, 7, 8, {}, 10]));

// 12.	isNil，创建一个函数，接收一个对象，删除其中所有值为null或undefined的属性
logSplit(12);
const isNil = R.filter(R.complement(R.isNil));
console.log(isNil({ a: 1, b: 2, c: 3, d: null, e: undefined }));
// 13.	join，创建一个函数，接收一个字符串数组strs，将strs用分隔字符-连接成一个字符串
logSplit(13);
const join = R.join("-");
console.log(join(["a", "b", "c"]));

// 14.	juxt，创建一个函数，接收数字a,b,c,...,n（参数个数任意），获取由这些数的总和、这些数的个数与这些数的平均值三项组成的数组
logSplit(14);
const juxt = R.unapply(R.juxt([R.sum, R.length, R.mean]));
// @ts-ignore
console.log(juxt(1, 2, 3));

// 15.	keys，创建一个函数，接收一个对象，获取此对象自身有的属性数量
logSplit(15);
const keys = R.pipe(R.keys, R.length);
console.log(keys({ a: 1, b: 2, c: 3 }));

// 16.	keysIn，创建一个函数，接收一个对象，获取此对象上非自身所有属性的数量
logSplit(16);
// @ts-ignore
const keysIn = R.converge(R.on(R.subtract, R.length), [R.keysIn, R.keys]);
const F = function() { // @ts-ignore
  this.x = "X";
};
F.prototype.y = "Y";
// @ts-ignore
console.log(keysIn(new F()));

// 17.	last，创建一个函数，接收一个数字数组，判断其最后一项是否是前面所有项之和
logSplit(17);
// @ts-ignore
const last = R.converge(R.equals, [R.pipe(R.init, R.sum), R.last]);
// @ts-ignore
console.log(last([1, 2, 3]));
// @ts-ignore
console.log(last([1, 2, 3, 4]));

// 18.	lastIndexOf、splitAt，创建一个函数，接收一个字符串数组，将这个字符串数组在最后一个值为字符串=的位置上分割为一个二维数组
logSplit(18);
const lastIndexOf = R.chain(R.splitAt, R.lastIndexOf("="));
console.log(lastIndexOf(["1", "2", "=", "4"]));

// 19.	length，创建一个函数，接收一个二维数组，获取这个二维数组中所有项的个数（一维数组的项数不计入）
logSplit(19);
const length = R.pipe(R.map(R.length), R.sum);
console.log(length([[1, 2, 3], [4, 5, 6]]));

// 20.	lens，创建一个数组平均值lens，该lens可以处理数字数组，读取lens时返回数组的平均值，设置lens时将数组的所有项设置为该值
logSplit(20);
const lens20 = R.lens(R.mean, (a, s) => R.map(R.always(a), s));
console.log(R.view(lens20, [1, 2, 3, 4]));
console.log(R.set(lens20, 3, [1, 2, 3, 4]));

// 好好学习 ，天天向上
