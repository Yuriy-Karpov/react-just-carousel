"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const Button_1 = require("./Button");
exports.default = {
    title: 'Example/Button',
    component: Button_1.Button,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
};
const Template = (args) => react_1.default.createElement(Button_1.Button, Object.assign({}, args));
exports.Primary = Template.bind({});
exports.Primary.args = {
    primary: true,
    label: 'Button',
};
exports.Secondary = Template.bind({});
exports.Secondary.args = {
    label: 'Button',
};
exports.Large = Template.bind({});
exports.Large.args = {
    size: 'large',
    label: 'Button',
};
exports.Small = Template.bind({});
exports.Small.args = {
    size: 'small',
    label: 'Button',
};
//# sourceMappingURL=Button.stories.js.map