//基本冒泡排序
function bubbleSort(arr) {
    var len = arr.length;
    for (var i = 0; i < len; i++) {
        for (var j = 0; j < len - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) { //相邻元素两两对比
                var temp = arr[j + 1]; //元素交换
                arr[j + 1] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}

//改进设置标志性变量pos,用于记录每趟排序中最后一次进行交换的位置。
//由于pos位置之后的数据已经有序,故下一趟排序时只要扫描到pos位置即可。
function bubbleSort2(arr) {
    var i = arr.length - 1; //初始时,最后位置保持不变
    while (i > 0) {
        var pos = 0; //每趟开始时,无记录交换
        for (var j = 0; j < i; j++) {
            if (arr[j] > arr[j + 1]) {
                pos = j; //记录交换的位置
                var tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
            }
        }
        i = pos; //为下一趟排序作准备
    }
    return arr;
}

//每趟排序中进行正向和反向两遍冒泡的方法一次可以得到两个最终值(最大者和最小者)
function bubbleSort3(arr3) {
    var low = 0;
    var high = arr.length - 1; //设置变量的初始值
    var tmp, j;
    while (low < high) {
        for (j = low; j < high; ++j) //正向冒泡,找到最大者
            if (arr[j] > arr[j + 1]) {
                tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
            }
            -- high; //修改high值, 前移一位
        for (j = high; j > low; --j) //反向冒泡,找到最小者
            if (arr[j] < arr[j - 1]) {
                tmp = arr[j];
                arr[j] = arr[j - 1];
                arr[j - 1] = tmp;
            }
            ++ low; //修改low值,后移一位
    }
    return arr3;
}