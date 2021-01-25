"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
exports.CarouselView = React.memo(({ children, refCarousel, refSlideBox, leftButton, rightButton, isRelative, marginBlock }) => {
    return (React.createElement("div", { className: `rj-carousel${isRelative ? ' rj-carousel_relative' : ''}` },
        React.createElement("div", { ref: refCarousel, className: "rj-carousel__wrap", style: { margin: `0 -${marginBlock}px` } },
            React.createElement("div", { ref: refSlideBox, className: "rj-carousel__slide-box" }, children)),
        leftButton,
        rightButton));
});
//# sourceMappingURL=CarouselView.js.map