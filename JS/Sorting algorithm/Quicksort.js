var quickSort = function (arr) {
    if (arr.length <= 1) {
        return arr;
    }
    //在数据集之中，选择一个元素作为"基准"（pivot）。
    var pivotIndex = Math.floor(arr.length / 2);
    //splice删除pivot值并返回数组,用[0]返回值,
    var pivot = arr.splice(pivotIndex, 1)[0];
    var left = [];
    var right = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return quickSort(left).concat([pivot], quickSort(right));
};