"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const const_1 = require("../const");
exports.moveToSlide = (side, { state, countChildren, elementSize, widthCarousel, fullWidth, }) => {
    const { count, offset } = state;
    if (side === const_1.sideEnum.RIGHT && count < countChildren && !state.end) {
        const widthItem = elementSize[count];
        const offsetAndSlider = Math.abs(offset) + widthCarousel + widthItem;
        if (offsetAndSlider >= fullWidth) {
            return {
                offset: -(fullWidth - widthCarousel),
                count: count + 1,
                prevOffset: offset,
                end: true
            };
        }
        return Object.assign({}, state, { offset: offset - widthItem, count: count + 1, prevOffset: offset });
    }
    if (side === const_1.sideEnum.LEFT && count > 0) {
        const widthItem = elementSize[count - 1];
        if (state.end) {
            return Object.assign({}, state, { offset: state.prevOffset, count: count - 1, prevOffset: offset, end: false });
        }
        return Object.assign({}, state, { offset: offset + widthItem, count: count - 1, prevOffset: offset });
    }
    return state;
};
//# sourceMappingURL=moveToSlide.js.map