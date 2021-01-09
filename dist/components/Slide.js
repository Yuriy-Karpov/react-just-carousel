"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
function Slide({ data, id, refSize, marginBlock, }) {
    const measuredRef = React.useCallback(node => {
        if (node !== null) {
            refSize[id] = node.getBoundingClientRect().width;
        }
    }, []);
    return (React.createElement("div", { ref: measuredRef, className: "rj-carousel__slide", style: { margin: `0 ${marginBlock}px 0 ${marginBlock}px` } }, data));
}
exports.Slide = Slide;
//# sourceMappingURL=Slide.js.map