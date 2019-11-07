//二分搜索（英语：binary search），也称折半搜索（英语：half-interval search）
//将有序数据集进行对半分割，并检查每个分区的中间元素
Array.prototype.binary_search = function (low, high, khey) {
    if (low > high)
        return -1;
    var mid = parseInt((high + low) / 2);
    if (this[mid] > khey)
        return this.binary_search(low, mid - 1, khey);
    if (this[mid] < khey)
        return this.binary_search(mid + 1, high, khey);
    return mid;
};