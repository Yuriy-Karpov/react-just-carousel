"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
exports.ButtonLeft = ({ handle }) => {
    return (React.createElement("div", { className: "button left", onClick: handle },
        React.createElement("span", null, "\u2039")));
};
exports.ButtonRight = ({ handle }) => {
    return (React.createElement("div", { className: "button right", onClick: handle },
        React.createElement("span", null, "\u203A")));
};
//# sourceMappingURL=ButtonCarousel.js.map