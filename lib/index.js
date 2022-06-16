"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ramda_1 = tslib_1.__importDefault(require("ramda"));
//@ts-ignore
const xLens = ramda_1.default.lens(ramda_1.default.prop('x'), ramda_1.default.assoc('y'));
// type Point = { x: number; y: number; };
// const xLens:R.Lens<Point, Point[string]> = R.lensProp('x');
//@ts-ignore
//=> 1
//@ts-ignore
//=> {x: 4, y: 2}
//@ts-ignore
console.log(ramda_1.default.view(xLens, { x: 1, y: 2 }), ramda_1.default.set(xLens, 4, { x: 1, y: 2 }), ramda_1.default.over(xLens, ramda_1.default.negate, { x: 1, y: 2 }));
