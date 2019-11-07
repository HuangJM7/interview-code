function Lazyman(name) {
    return new _Lazyman(name);
}

class _Lazyman {
    constructor(name) {
        this.tasks = []; //设置任务队列
        let task = (name => () => {
            console.log(`Hi! This is ${name} !`);
            this.next();
        })(name);
        this.tasks.push(task);
        //通过settimeout的方法，将执行函数放入下一个事件队列中，从而达到先注册事件，后执行的目的

        setTimeout(() => {
            this.next();
        }, 0);

    }
    //尾调用函数，一个任务执行完然后再调用下一个任务
    next() {
        let task = this.tasks.shift();
        task && task();
    }

    eat(food) {
        let task = (food => () => {
            console.log(`Eat ${food}`);
            this.next();
        })(food);
        this.tasks.push(task);
        return this;
    }
    sleep(time) {
        this._sleepWrapper(time, false);
        return this; // 链式调用
    }

    sleepFirst(time) {
        this._sleepWrapper(time, true);
        return this;
    }

    _sleepWrapper(time, first) {
        //两种写法,区别
        const task = () => {
            setTimeout(() => {
                console.log(`Wake up after ${time}`);
                this.next();
            }, time * 1000)
        }

        let task = (time => () => {
            setTimeout(() => {
                console.log(`Wake up after ${time} s!`);
                this.next();
            }, time * 1000)
        })(time);

        if (first) {
            this.tasks.unshift(task); // sleepFirst函数放到任务队列顶部
        } else {
            this.tasks.push(task); // 放到任务队列尾部
        }
    }
}


Lazyman('aa').eat("aaa")

