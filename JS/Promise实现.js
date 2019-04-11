// 一、Promise 是一个异步操作返回的对象，用来传递异步操作的消息。
// Promise 介绍和使用详见： 认识并使用 Promise
// 二、根据自己对 Promise 的理解，实现一个Promise :
// Promise 有三种状态：Pending   初始态； Fulfilled 成功态；  Rejected  失败态。
function Promise(executor) {
    let self = this;
    self.status = 'pending'; //等待态
    self.value = undefined; //成功的返回值
    self.reason = undefined; //失败的原因

    function resolve(value) {
        if (self.status === 'pending') {
            self.status = 'resolved';
            self.value = value;
        }
    }

    function reject(reason) {
        if (self.status === 'pending') {
            self.status = 'rejected';
            self.reason = reason;
        }
    }
    try {
        executor(resolve, reject);
    } catch (e) {
        reject(e); // 捕获时发生异常，就直接失败
    }
}
//onFufiled 成功的回调
//onRejected 失败的回调
Promise.prototype.then = function (onFufiled, onRejected) {
    let self = this;
    if (self.status === 'resolved') {
        onFufiled(self.value);
    }
    if (self.status === 'rejected') {
        onRejected(self.reason);
    }
}
module.exports = Promise;


//测试一下子：
let Promise = require('./Promise');
let promise = new Promise(function (resolve, reject) {
    resolve(100);
})
promise.then(function (data) {
    console.log('data:', data);
}, function (err) {
    console.log('err:', err);
})
//输出： data: 100
//测试成功啦 鼓掌鼓掌~


// Promise实例可以多次then，当成功后会将 then 中的成功方法按顺序执行，可以先将then中成功的回调和失败的回调存到数组内。当成功的时候调用成功的数组即可。

self.onResolvedCallbacks = []; /* 存放then成功的回调*/
self.onRejectedCallbacks = []; /* 存放then失败的回调*/
function resolve(value) {
    if (self.status === 'pending') {
        self.status = 'resolved';
        self.value = value;
        self.onResolvedCallbacks.forEach(function (fn) {
            fn();
        })
    }
}

function reject(reason) {
    if (self.status === 'pending') {
        self.status = 'rejected';
        self.reason = reason;
        self.onRejectedCallbacks.forEach(function (fn) {
            fn();
        })
    }
}
if (self.status === 'pending') {
    self.onResolvedCallbacks.push(function () {
        onFufiled(self.value);
    })
    self.onRejectedCallbacks.push(function () {
        onRejected(self.reason);
    })
}


//三、 实现链式调用：
// 众所周知 Promise 的一大特点， 就是链式调用。 而 Promise 实现链式调用就是通过 then 方法返回一个新的 Promise。
// 如果第一个 then 中返回了一个结果， 会将 Promise 的结果继续传给下一个 then 中； 如果有错误则走下一个 then 的失败。
// 添加 resolvePromise 方法 处理链式调用问题
function resolvePromise(p2, x, resolve, reject) {
    if (p2 === x) {
        return reject(new TypeError('循环引用'));
    }
    if (x !== null || (typeof x === 'object' || typeof x === 'function')) {
        try {
            let then = x.then;
            if (typeof then === 'function') {
                then.call(x, function (y) {
                    resolvePromise(promise2, y, resolve, reject);
                }, function (err) {
                    reject(err);
                });
            } else {
                resolve(x);
            }
        } catch (e) {
            reject(e);
        }
    } else {
        resolve(x);
    }
}