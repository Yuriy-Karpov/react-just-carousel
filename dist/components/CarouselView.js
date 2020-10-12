"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
exports.CarouselView = React.memo(({ children, refCarousel, slideBoxOffset, leftButton, rightButton, isRelative }) => {
    return (React.createElement("div", { className: `rj-carousel${isRelative ? ' rj-carousel_relative' : ''}` },
        React.createElement("div", { ref: refCarousel, className: "rj-carousel__wrap" },
            React.createElement("div", { className: "rj-carousel__slide-box", style: slideBoxOffset }, children)),
        leftButton,
        rightButton));
});
//# sourceMappingURL=CarouselView.js.map