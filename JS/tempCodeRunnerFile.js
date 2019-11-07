function fn1(time) {
    //写法一
    text = () => {
        console.log(1);
        console.log(this);

        setTimeout(() => {
            console.log(2);
            console.log(this);
        }, time * 1000)
    }
    text()
    //写法二
    var text2 = (time => {
        console.log(3);
        console.log(this);
        () => {
            console.log(4);
            console.log(this);
            setTimeout(() => {
                console.log(5);
                console.log(this);
            }, time * 1000)
        }
    })(time);

}
fn1(1)