"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
exports.CarouselView = React.memo(({ children, refCarousel, slideBoxOffset, leftButton, rightButton, }) => {
    return (React.createElement("div", { ref: refCarousel, className: "carousel carousel-wrap" },
        React.createElement("div", { className: "slideBox", style: slideBoxOffset }, children),
        leftButton,
        rightButton));
});
//# sourceMappingURL=CarouselView.js.map