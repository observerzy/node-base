//变更函数调用者示例
function foo() {
    console.log(this.name);
}

// 测试
const obj = {
    name: "result",
};

Function.prototype.myCall = function (thisArg, ...args) {
    const fn = Symbol("fn"); // 声明一个独有的Symbol属性, 防止fn覆盖已有属性
    thisArg = thisArg || window; // 若没有传入this, 默认绑定window对象
    thisArg[fn] = this; // this指向调用call的对象,即我们要改变this指向的函数
    const result = thisArg[fn](...args); // 执行当前函数
    delete thisArg[fn]; // 删除我们声明的fn属性
    return result; // 返回函数执行结果
};

//测试
foo();
foo.myCall(obj); // 输出'result'
