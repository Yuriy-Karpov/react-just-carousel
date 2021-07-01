"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function debounce(func, wait, immediate = false) {
    let timeout;
    return function executedFunction() {
        // @ts-ignore
        const context = this;
        const args = arguments;
        const later = function () {
            timeout = null;
            if (!immediate)
                func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow)
            func.apply(context, args);
    };
}
exports.debounce = debounce;
//# sourceMappingURL=debounce.js.map