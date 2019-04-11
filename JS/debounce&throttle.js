//必考：手写函数防抖和函数节流
//节流throttle（CD）
function throttle(fn, delay) {
    let canUse = true
    return function () {
        if (canUse) {
            fn.apply(this, arguments)
            canUse = false
            setTimeout(() => canUse = true, delay)
        }
    }
}
const throttled = throttle(() => console.log('hi'))
throttled()
throttled()

// 防抖debounce（最后一次请求后延迟执行）
function debounce(fn, delay) {
    let timerId = null
    return function () {
        const context = this
        if (timerId) {
            window.clearTimeout(timerId)
        }
        timerId = setTimeout(() => {
            fn.apply(context, arguments)
            timerId = null
        }, delay)
    }
}
const debounced = debounce(() => console.log('hi'))
debounced()
debounced()