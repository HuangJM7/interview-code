//递归的方式，频繁自调用。长度为n的数组调用2*n-1次，栈小的浏览器发生栈溢出错误
function merge(left, right) {
    var result = [];
    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            //把left的左子树推出一个，然后push进result数组里
            result.push(left.shift());
        } else {
            //把right的右子树推出一个，然后push进result数组里
            result.push(right.shift());
        }
    }
    //经过上面一次循环，只能左子列或右子列一个不为空，或者都为空
    return result.concat(left, right);
}
function mergeSort(arr) {
    // 设置终止的条件，
    if (arr.length < 2) {
        return arr;
    }
    //设立中间值，~~两次取反去掉小数部分
    //第1个和middle个之间为左子列
    //第middle+1到最后为右子列
    var mid = ~~(a.length / 2),
        left = a.slice(0, mid),
        right = a.slice(mid);
    //采用递归
    return merge(mergeSort(left), mergeSort(right));
}

//用代码去测试递归调用时浏览器的栈大小限制
var cnt = 0;
try {
    (function () {
        cnt++;
        arguments.callee();
    })();
} catch (e) {
    console.log(e.message, cnt);
}
// chrome: Maximum call stack size exceeded 35992
// firefox: too much recursion 11953

//迭代方式解决栈溢出错误
function merge(left, right) {
    var result = [];
    while (left.length && right.length) {
        if (left[0] < right[0])
            result.push(left.shift());
        else
            result.push(right.shift());
    }
    return result.concat(left, right);
}

function mergeSort(a) {
    if (a.length === 1)
        return a;
    var work = [];
    for (var i = 0, len = a.length; i < len; i++)
        work.push([a[i]]);

    work.push([]); // 如果数组长度为奇数

    for (var lim = len; lim > 1; lim = ~~((lim + 1) / 2)) {
        for (var j = 0, k = 0; k < lim; j++, k += 2)
            work[j] = merge(work[k], work[k + 1]);
        work[j] = []; // 如果数组长度为奇数
    }
    return work[0];
}