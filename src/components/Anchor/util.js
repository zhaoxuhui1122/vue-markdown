import Vue from "vue";
const isServer = Vue.prototype.$isServer;
// Find components downward

export function findComponentsDownward(context, componentName) {
    return context.$children.reduce((components, child) => {
        if (child.$options.name === componentName) components.push(child);
        const foundChilds = findComponentsDownward(child, componentName);
        return components.concat(foundChilds);
    }, []);
}

// scrollTop animation
export function scrollTop(el, from = 0, to, duration = 500, endCallback) {
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame =
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(callback) {
                return window.setTimeout(callback, 1000 / 60);
            };
    }
    const difference = Math.abs(from - to);
    const step = Math.ceil((difference / duration) * 50);

    function scroll(start, end, step) {
        if (start === end) {
            endCallback && endCallback();
            return;
        }

        let d = start + step > end ? end : start + step;
        if (start > end) {
            d = start - step < end ? end : start - step;
        }

        if (el === window) {
            window.scrollTo(d, d);
        } else {
            el.scrollTop = d;
        }
        window.requestAnimationFrame(() => scroll(d, end, step));
    }
    scroll(from, to, step);
}

export const sharpMatcherRegx = /#([^#]+)$/;

export const dimensionMap = {
    xs: "480px",
    sm: "576px",
    md: "768px",
    lg: "992px",
    xl: "1200px",
    xxl: "1600px"
};


/* istanbul ignore next */
export const on = (function() {
    if (!isServer && document.addEventListener) {
        return function(element, event, handler, useCapture = false) {
            if (element && event && handler) {
                element.addEventListener(event, handler, useCapture);
            }
        };
    } else {
        return function(element, event, handler) {
            if (element && event && handler) {
                element.attachEvent("on" + event, handler);
            }
        };
    }
})();

/* istanbul ignore next */
export const off = (function() {
    if (!isServer && document.removeEventListener) {
        return function(element, event, handler, useCapture = false) {
            if (element && event) {
                element.removeEventListener(event, handler, useCapture);
            }
        };
    } else {
        return function(element, event, handler) {
            if (element && event) {
                element.detachEvent("on" + event, handler);
            }
        };
    }
})();
