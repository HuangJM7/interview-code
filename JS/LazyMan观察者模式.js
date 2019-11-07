// LazyMan的深入解析和实现
// https://www.jianshu.com/p/f1b7cb456d37

// 采用模块模式来编写代码
(function (window, undefined) {
    // 变量taskList，存储队列信息
    var taskList = [];
    // LazyMan类,具有eat、sleep、sleepFrist等行为
    // 触发一次行为，就在taskList中记录一次，并返回当前对象，以支持链式调用。
    function LazyMan() {};
    LazyMan.prototype.eat = function (str) {
        subscribe("eat", str);
        return this;
    };
    LazyMan.prototype.sleep = function (num) {
        subscribe("sleep", num);
        return this;
    };
    LazyMan.prototype.sleepFirst = function (num) {
        subscribe("sleepFirst", num);
        return this;
    };
    // 订阅方法的调用方式设计：subscribe("lazyMan", "Hank")
    // 用一个param变量来组织好需要存储的信息，然后push进taskList中，缓存起来。
    // 特别的，如果是sleepFirst，则放置在队列头部。
    function subscribe() {
        var param = {},
            args = Array.prototype.slice.call(arguments);
        if (args.length < 1) {
            throw new Error("subscribe 参数不能为空!");
        }
        param.msg = args[0];
        param.args = args.slice(1); // 函数的参数列表
        if (param.msg == "sleepFirst") {
            taskList.unshift(param);
        } else {
            taskList.push(param);
        }
    }
    // 发布方法
    // 将队列中的存储信息读取出来，交给run方法去执行
    function publish() {
        if (taskList.length > 0) {
            run(taskList.shift());
        }
    }

    // run方法，用于识别要调用哪个具体方法，是一个总的控制台
    // 这个方法有点像鸭式辨型接口，所以注释叫鸭子叫。
    function run(option) {
        var msg = option.msg,
            args = option.args;
        switch (msg) {
            case "lazyMan":
                lazyMan.apply(null, args);
                break;
            case "eat":
                eat.apply(null, args);
                break;
            case "sleep":
                sleep.apply(null, args);
                break;
            case "sleepFirst":
                sleepFirst.apply(null, args);
                break;
            default:
                ;
        }
    }
    // 具体方法
    function lazyMan(str) {
        lazyManLog("Hi!This is " + str + "!");
        publish();
    }

    function eat(str) {
        lazyManLog("Eat " + str + "~");
        publish();
    }

    function sleep(num) {
        setTimeout(function () {
            lazyManLog("Wake up after " + num);
            publish();
        }, num * 1000);

    }

    function sleepFirst(num) {
        setTimeout(function () {
            lazyManLog("Wake up after " + num);
            publish();
        }, num * 1000);
    }
    // 输出文字
    function lazyManLog(str) {
        console.log(str);
    }
    // 暴露接口LazyMan，让外部可以调用
    window.LazyMan = function (str) {
        subscribe("lazyMan", str);
        setTimeout(function () {
            publish();
        }, 0);
        return new LazyMan();
    };
})(window);