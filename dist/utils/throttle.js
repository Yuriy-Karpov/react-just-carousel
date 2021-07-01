"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            inThrottle = true;
            func.apply(context, args);
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}
exports.throttle = throttle;
//# sourceMappingURL=throttle.js.map