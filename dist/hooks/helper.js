"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const const_1 = require("../const");
const moveController_1 = require("../utils/moveController");
const animations_1 = require("../utils/animations");
exports.moveEvent = ({ moveX, moveY, deadZone, touchSide, calcOffset, refSlideBox }) => {
    const offsetAnimSlide = 100;
    if (Math.abs(moveY) >= deadZone.y) {
        return;
    }
    if (!touchSide.current && moveX >= 15) {
        touchSide.current = const_1.sideEnum.RIGHT;
        const moveOffset = calcOffset.current - offsetAnimSlide;
        animations_1.transformAnimation(refSlideBox.current, moveOffset);
    }
    if (!touchSide.current && moveX <= -15) {
        touchSide.current = const_1.sideEnum.LEFT;
        const moveOffset = calcOffset.current !== 0 ? calcOffset.current + offsetAnimSlide : calcOffset.current + (offsetAnimSlide / 2);
        animations_1.transformAnimation(refSlideBox.current, moveOffset);
    }
};
exports.moveEndEvent = ({ moveController, refCarousel, elementSize, marginBlock, touchSide, countChildren, stepMove, calcOffset, onMoveSlide, refSlideBox }) => {
    if (!moveController.current) {
        moveController.current = new moveController_1.MoveController(refCarousel.current, elementSize.current, marginBlock);
    }
    const { offset, isLeftEnd, isRightEnd, offsetCount } = moveController.current.calculate(touchSide.current, countChildren, marginBlock, stepMove);
    calcOffset.current = offset;
    if (onMoveSlide) {
        onMoveSlide({
            side: touchSide.current,
            isLeftEnd,
            isRightEnd,
            offsetCount,
        });
    }
    touchSide.current = null;
    animations_1.transformAnimation(refSlideBox.current, calcOffset.current);
};
exports.cancelEvent = ({ touchSide, refSlideBox, calcOffset }) => {
    if (touchSide.current) {
        touchSide.current = null;
        animations_1.transformAnimation(refSlideBox.current, calcOffset.current);
    }
};
//# sourceMappingURL=helper.js.map