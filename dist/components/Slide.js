"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
function Slide({ data, id, size }) {
    const measuredRef = React.useCallback(node => {
        if (node !== null) {
            size[id] = node.getBoundingClientRect().width;
        }
    }, []);
    return (React.createElement("div", { ref: measuredRef, className: "rj-carousel__slide" }, data));
}
exports.Slide = Slide;
//# sourceMappingURL=Slide.js.map