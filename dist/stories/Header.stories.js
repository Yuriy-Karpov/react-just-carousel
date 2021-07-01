"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const Header_1 = require("./Header");
exports.default = {
    title: 'Example/Header',
    component: Header_1.Header,
};
const Template = (args) => react_1.default.createElement(Header_1.Header, Object.assign({}, args));
exports.LoggedIn = Template.bind({});
exports.LoggedIn.args = {
    user: {},
};
exports.LoggedOut = Template.bind({});
exports.LoggedOut.args = {};
//# sourceMappingURL=Header.stories.js.map