//必考 Promise、Promise.all、Promise.race 分别怎么用？
//Promise 用法
function fn() {
    return new Promise((resolve, reject) => {
        成功时调用 
        resolve(数据)

        失败时调用 
        reject(错误)
    })
}
fn().then(success, fail).then(success2, fail2)

//Promise.all 用法
Promise.all([promise1, promise2]).then(success1, fail1)
promise1和promise2都成功才会调用success1

// Promise.race 用法
Promise.race([promise1, promise2]).then(success1, fail1)
promise1和promise2只要有一个成功就会调用success1

// 认识并使用 Promise
// 一、了解 Promise：
// Promise 是一个异步操作返回的对象，用来传递异步操作的消息。
// 可以解决的问题：
// 解决了回调地狱问题，不会导致难以维护；
// 合并多个异步请求，节约时间。
// Promise 有三种状态：
// Pending Promise 对象实例创建时的初始态；
// Fulfilled 成功时的状态；
// Rejected 失败时的状态。

//二、使用 Promise：
//Promise.then()：用来指定 Promise 对象的状态改变时要执行的操作。

let promise = new Promise(function (resolve, reject) {
    resolve('成功');
    //reject('失败');
})

promise.then(function (data) {
    console.log('data: ', data);
},function (err) {
    console.log('err: ', err);
})


//Promise.all()：接收一个数组，数组内是 Promise 实例，必须都成功呢才表示成功。
//Promise.race()：接收一个数组，数组内是 Promise 实例，最早返回的对象成功了，就变为成功态，如果失败了，就改变状态为失败态。
let fs = require('fs');
function read(url){
    return new Promise(function(resolve, reject){
        fs.readFile(url,'utf8',function(err, data){
            if(err) reject( err);
            resolve( data);
        })
    })
}

Promise.all([read('1.txt'), read('2.txt')]).then(function (data) {
    console.log(data);
},function (err) {
    console.log('err: ', err);
})

Promise.race([read('1.txt'), read('2.txt')]).then(function (data) {
    console.log(data);
},function (err) {
    console.log('err: ', err);
})

//Promise.resolve()：返回一个 Promise 实例，这个 Promise 实例处于 resolve 状态。
Promise.resolve([1,2,3]).then(function(data){
    console.log(data);
});
//输出：[ 1, 2, 3 ]


//Promise.reject()：返回一个 Promise 实例，这个 Promise 实例处于 reject 状态。
Promise.reject([1,2,3]).then(null,function(err){
    console.log('err',err)
});
//输出：err [ 1, 2, 3 ]