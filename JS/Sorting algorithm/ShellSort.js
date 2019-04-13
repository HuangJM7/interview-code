function shellSort(arr) {
    var len = arr.length;
    var gap = 1;
    while (gap < len / 3) {
        gap = 3 * gap + 1; //动态设置间隔
    }
    while (gap >= 1) {
        for (var i = gap; i < len; i++) {
            for (var j = i; j >= gap && arr[j] < arr[j - gap]; j -= gap) {
                //交换使用es6解构赋值
                [arr[j],arr[j - gap]] = [arr[j - gap],arr[j]]  
            }
        }
        gap = (gap - 1) / 3;
    }
}



function shellSort(arr) {
    var len = arr.length,
        temp,
        gap = 1;
    while (gap < len / 5) { //动态定义间隔序列
        gap = gap * 5 + 1;
    }
    for (gap; gap > 0; gap = Math.floor(gap / 5)) {
        for (var i = gap; i < len; i++) {
            temp = arr[i];
            for (var j = i - gap; j >= 0 && arr[j] > temp; j -= gap) {
                arr[j + gap] = arr[j];
            }
            arr[j + gap] = temp;
        }
    }
    return arr;
}