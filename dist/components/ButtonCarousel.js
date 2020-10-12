"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const const_1 = require("../const");
exports.Button = ({ handle, customRender, side }) => {
    return (React.createElement("div", { className: "rj-carousel__btn-handle", onClick: handle }, customRender ? customRender : React.createElement("div", { className: `rj-carousel__btn-default rj-carousel__btn-default_${side}` },
        side === const_1.sideEnum.LEFT || React.createElement("span", null, "\u203A"),
        side === const_1.sideEnum.RIGHT || React.createElement("span", null, "\u2039"))));
};
//# sourceMappingURL=ButtonCarousel.js.map