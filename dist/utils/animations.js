"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformAnimation = (target, px) => {
    window.requestAnimationFrame(() => {
        target.style.transform = `translateX(${px}px)`;
    });
};
//# sourceMappingURL=animations.js.map