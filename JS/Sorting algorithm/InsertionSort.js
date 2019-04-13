function insertionSort(array) {
    //Object.prototype.toString.call()返回类型"[object Array]" 进行类型判断
    if (Object.prototype.toString.call(array).slice(8, -1) === 'Array') {

        for (var i = 1; i < array.length; i++) {
            var key = array[i];
            var j = i - 1;
            //
            while (j >= 0 && array[j] > key) {
                array[j + 1] = array[j];
                j--;
            }
            array[j + 1] = key;
        }
        return array;
    } else {
        return 'array is not an Array!';
    }
}
//改进插入排序： 查找插入位置时使用二分查找的方式
function binaryInsertionSort(array) {
    if (Object.prototype.toString.call(array).slice(8, -1) === 'Array') {

        for (var i = 1; i < array.length; i++) {
            var key = array[i],
                left = 0,
                right = i - 1;
            while (left <= right) {
                var middle = parseInt((left + right) / 2);
                if (key < array[middle]) {
                    right = middle - 1;
                } else {
                    left = middle + 1;
                }
            }
            for (var j = i - 1; j >= left; j--) {
                array[j + 1] = array[j];
            }
            array[left] = key;
        }
        return array;
    } else {
        return 'array is not an Array!';
    }
}