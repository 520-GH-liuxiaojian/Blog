function bindEvent(element, type, selector, fn) {
    if(fn == null) {
        fn = selector
        selector = null
    }
    // ********
}

bindEvent(ele, 'click', '#div1', fn)
bindEvent(ele, 'click', fn)
