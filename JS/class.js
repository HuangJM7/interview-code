//不用 class 如何实现继承？用 class 又如何实现？

//不用 class 这样实现

function Animal(color) {
    this.color = color
}
Animal.prototype.move = function () {} // 动物可以动
function Dog(color, name) {
    Animal.call(this, color) // 或者 Animal.apply(this, arguments)
    this.name = name
}
// 下面三行实现 Dog.prototype.__proto__ = Animal.prototype
function temp() {}
temp.prototye = Animal.prototype
Dog.prototype = new temp()

Dog.prototype.constuctor = Dog // 这行看不懂就算了，面试官也不问
Dog.prototype.say = function () {
    console.log('汪')
}

var dog = new Dog('黄色', '阿黄')


//用 class 就简单了
class Animal {
    constructor(color) {
        this.color = color
    }
    move() {}
}
class Dog extends Animal {
    constructor(color, name) {
        super(color)
        this.name = name
    }
    say() {}
}