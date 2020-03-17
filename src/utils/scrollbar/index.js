let lockSate = false;
const body = document.body;

const getScrollWidth = () => {
    const _get = function() {
        var outer = document.createElement('div');
        outer.style.visibility = 'hidden';
        outer.style.width = '100px';
        outer.style.msOverflowStyle = 'scrollbar';

        document.body.appendChild(outer);

        var widthNoScroll = outer.offsetWidth;
        outer.style.overflow = 'scroll';

        var inner = document.createElement('div');
        inner.style.width = '100%';
        outer.appendChild(inner);

        var widthWithScroll = inner.offsetWidth;

        outer.parentNode.removeChild(outer);
        return widthNoScroll - widthWithScroll;
    };
    return _get();
};

const getScrollTop = () => {
    return window.scrollY || document.documentElement.scrollTop;
};

const scrollLock = (lock, activeCb, inActiveCb) => {
    const _active = cb => {
        const winHeight = Math.max(
            document.documentElement.clientHeight,
            window.innerHeight || 0,
        );
        const scrollTop = getScrollTop();
        const scrollWidth = winHeight < body.clientHeight ? getScrollWidth : 0;
        body.dataset.scrollTop = scrollTop;
        body.style = `margin-top:-${scrollTop}px; padding-right:${scrollWidth}`;
        document.documentElement.classList.add('screen-lock');
        if (typeof cb === 'function') cb();
        lockSate = true;
    };
    const _inactive = cb => {
        const scrollTop = body.dataset.scrollTop;
        body.style.removeProperty('margin-top');
        body.style.removeProperty('padding-right');
        delete body.dataset.scrollTop;
        document.documentElement.classList.remove('screen-lock');
        window.scrollTo(0, scrollTop);
        if (typeof cb === 'function') cb();
        lockSate = false;
    };
    if (lock) {
        if (lockSate) {
            return 'active';
        } else {
            _active();
        }
    } else {
        if (lockSate) {
            _inactive(inActiveCb);
        } else {
            return 'inactive';
        }
    }
};

export { getScrollWidth, getScrollTop, scrollLock };
