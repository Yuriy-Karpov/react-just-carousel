"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const Page_1 = require("./Page");
const HeaderStories = require("./Header.stories");
exports.default = {
    title: 'Example/Page',
    component: Page_1.Page,
};
const Template = (args) => react_1.default.createElement(Page_1.Page, Object.assign({}, args));
exports.LoggedIn = Template.bind({});
exports.LoggedIn.args = Object.assign({}, HeaderStories.LoggedIn.args);
exports.LoggedOut = Template.bind({});
exports.LoggedOut.args = Object.assign({}, HeaderStories.LoggedOut.args);
//# sourceMappingURL=Page.stories.js.map