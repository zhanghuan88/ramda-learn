import R from "ramda";

const logSplit = (number?: number) => console.log(`--------------------TITLE NO.${number ?? 0}--------------------`);
// 1.	flatten，创建一个函数，接收一个字符串数组，将字符串数组中的字符串先按照&分离，再按=分离，最近再将结果用空格连接在一起，例如a=1&b=2&c=3 => a 1 b 2 c 3
logSplit(1);
const flatten = R.map(R.pipe(R.split("&"), R.map(R.split("=")), R.flatten, R.join(" ")));
console.log(flatten(["a=1&b=2&c=3"]));

// 2.	flip，创建divide函数的变种，使除数为第一个参数，被除数为第二个 参数
logSplit(2);
const divide = R.flip(R.divide);
console.log(divide(4, 2));

// 3.	forEach，创建一个函数，接收一个对象数组，将每个对象的list属性设置为该对象数组
logSplit(3);
const forEach = (arr: Record<string, any>[]) => {
  let list: Record<string, any>[] = [];
  R.forEach(item => {
    list = R.append(R.assoc("list", arr, item), list);
  })(arr);
  return list;
};
console.log(JSON.stringify(forEach([{ name: "a" }, { name: "b" }, { name: "c" }])));

// 4.	forEachObjIndexed，创建一个函数，接收一个对象，将对象的每个属性值都设置为key
logSplit(4);
const forEachObjIndexed = (obj: Record<string, any>) => {
  let newObj: Record<string, any> = {};
  R.forEachObjIndexed((value, key) => {
    newObj = R.assoc(key, "key", newObj);
  })(obj);
  return newObj;
};
console.log(forEachObjIndexed({ a: 1, b: 2, c: 3 }));
// 5.	fromPairs，创建一个函数，将$k1=$v1&$k2=$v2…这种格式的字符串转为对象，如果有重复的$k则取后面的值
logSplit(5);
// @ts-ignore
const fromPairs: (s: string) => Record<string, any> = R.pipe(R.split("&"), R.map(R.split("=")), R.fromPairs);
console.log(fromPairs("a=1&b=2&c=3"));
// 6.	groupBy，创建一个函数，将中文姓名（不考虑复姓）字符串数组按照姓氏进行分组
logSplit(6);
const groupBy = R.groupBy<string, string>(R.head);
console.log(groupBy(["李白", "李逵", "李商隐", "王羲之"]));
// 7.	groupWith，创建一个函数，接收一个书名字符串数组，将相邻且书名长度相同的字符串分在一起
logSplit(7);
// @ts-ignore
const groupWith = R.groupWith(R.eqBy(R.length));
console.log(groupWith(["a", "bbb", "ccc", "dd", "eee", "fR", "ggg"]));

// 8.	gt，创建一个函数，传入一个数字数组，过滤出其中大于200的 数字
logSplit(8);
const gt = R.filter(R.gt(R.__, 200));
console.log(gt([1, 200, 300, 400, 500, 600, 700, 800, 900, 1000]));

// 9.	gte，创建一个函数，传入一个数字数组，判断其中是否有一个大于等于1000的数字
logSplit(9);
const gte = R.any(R.gte(R.__, 1000));
console.log(gte([900, 1000]));
console.log(gte([900]));
// 10.	has，hasIn，创建一个函数，传入一个对象obj，判断其是否有every属性，当其是自身所有时返回2，原型链所有时返回1，没有时返回0
logSplit(10);
const has = R.cond([
  [R.has("every"), R.always(2)],
  [R.hasIn("every"), R.always(1)],
  [R.T, R.always(0)],
]);
console.log(has({ every: "every" }));
console.log(has([]));
console.log(has({ a: "every" }));
// 11.	hasPath，创建一个函数，传入一个数组，判断其第一项是否有属性start
logSplit(11);
const hasPath = R.hasPath(["0", "start"]);
console.log(hasPath([{ start: "start" }]));
console.log(hasPath([{ test: "start" }, { start: "start" }]));

// 12.	head，创建一个函数，传入一个姓名（不考虑复姓）字符串数组，获取其中数量最多的姓氏
logSplit(12);
const head = R.pipe(R.groupWith(R.eqBy(R.head)), R.sortBy(R.length), R.last, R.head, R.head);
// @ts-ignore
console.log(head(["李白", "李逵", "李商隐", "王羲之"]));
// 13.	identical，创建一个函数，传入一个字符串数组，过滤出其中非NaN的字符串
logSplit(13);
const identical = R.filter(R.pipe(Number, R.complement(R.identical(NaN))));
console.log(identical(["1", "2", "3", "4", "5", "6", "7", "8", "9", "x'x"]));

// 14.	identity，创建一个函数，传入一个字符串数组 ，按照字符串本身的字符串值进行排序
logSplit(14);
const identity = R.sortBy(R.identity);
console.log(identity(["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]));
// 15.	ifElse，创建一个函数，接收一个数字，如果其小于0则返回0，如果其大于100则返回100
logSplit(15);
const ifElse = R.ifElse(R.lt(R.__, 0), R.always(0), R.ifElse(R.gt(R.__, 100), R.always(100), R.identity));
console.log(ifElse(-1));
console.log(ifElse(1));
console.log(ifElse(101));

// 16.	inc，使用此函数与递归写一个 n*(n+1)*(n+2)*...(m-1)*m的函数
logSplit(16);
const inc = (n: number, m: number): number => {
  if (R.gte(n, m)) return n;
  return n * inc(R.inc(n), m);
};
console.log(inc(1, 4));
console.log(inc(3, 3));
console.log(inc(5, 3));

// 17.	includes，创建一个函数，传入一个二维数组，判断数组中每一个数组都没有undefined或null
logSplit(17);
const includes: (arr: Array<Array<any>>) => boolean = R.all(R.all(R.complement(R.includes(R.__, [undefined, null]))));
console.log(includes([[1, 2, 3], [4, 5, 6], [7, 8, 9]]));
console.log(includes([[1, 2, 3], [4, 5, 6], [null, 8, 9]]));

// 18.	indexBy，创建一个函数，传入一个人员对象数组，按照人员对象的姓名(name)+编号(id)作为key，将数组转为对象
logSplit(18);
// @ts-ignore
const indexBy = R.indexBy(R.converge(R.concat, [R.prop("name"), R.prop("id")]));
// @ts-ignore
console.log(indexBy([{ name: "张三", id: "1212" }, { name: "李四", id: "1212" }, { name: "王五", id: "2324" }]));
// 19.	indexOf，创建一个函数，接收一个字符串数组，去除其中start字符串之前的内容
logSplit(19);
const indexOf = R.chain(R.drop, R.indexOf("start"));
console.log(indexOf(["12", "12", "start", "d"]));
// 20.	init，创建一个函数， 传入一个字符串数组，如果数组的最后一位为字符$，则删除该最后一项
logSplit(20);
// @ts-ignore
const init = R.ifElse(R.pipe(R.last, R.equals("$")), R.init, R.identity);
console.log(init(["a", "b", "c", "$"]));

// 好好学习 ，天天向上

