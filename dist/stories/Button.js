"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
require("./button.css");
/**
 * Primary UI component for user interaction
 */
exports.Button = (_a) => {
    var { primary = false, size = 'medium', backgroundColor, label } = _a, props = __rest(_a, ["primary", "size", "backgroundColor", "label"]);
    const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
    return (react_1.default.createElement("button", Object.assign({ type: "button", className: ['storybook-button', `storybook-button--${size}`, mode].join(' '), style: { backgroundColor } }, props), label));
};
//# sourceMappingURL=Button.js.map