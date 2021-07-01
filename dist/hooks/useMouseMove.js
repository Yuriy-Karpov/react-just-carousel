"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const helper_1 = require("./helper");
exports.useMouseMove = ({ refCarousel, countChildren, moveController, calcOffset, refSlideBox, elementSize, marginBlock, onMoveSlide, stepMove, deadZone }) => {
    const touchStart = React.useRef(null);
    const touchSide = React.useRef(null);
    const isDownMouse = React.useRef(false);
    React.useLayoutEffect(() => {
        if (refCarousel && refCarousel.current) {
            refCarousel.current.addEventListener('mousedown', onStartHandler);
            refCarousel.current.addEventListener('mousemove', onMoveMouseHandler);
            refCarousel.current.addEventListener('mouseup', onEndMoveHandler);
            refCarousel.current.addEventListener('mouseleave', onEndMoveHandler);
            return () => {
                refCarousel.current.removeEventListener('mousedown', onStartHandler);
                refCarousel.current.removeEventListener('mousemove', onMoveMouseHandler);
                refCarousel.current.removeEventListener('mouseup', onEndMoveHandler);
                refCarousel.current.removeEventListener('mouseleave', onEndMoveHandler);
            };
        }
        return () => { };
    }, [countChildren, stepMove, marginBlock]);
    const onStartHandler = React.useCallback((e) => {
        touchStart.current = {
            x: e.screenX,
            y: e.screenY,
        };
        isDownMouse.current = true;
    }, [touchStart]);
    const onMoveMouseHandler = React.useCallback((e) => {
        if (!touchStart.current)
            return;
        if (!isDownMouse.current)
            return;
        const moveX = touchStart.current.x - e.screenX;
        const moveY = touchStart.current.y - e.screenY;
        if (Math.abs(moveX) >= deadZone.x && e.cancelable) {
            e.preventDefault();
        }
        helper_1.moveEvent({ moveX, moveY, deadZone, touchSide, calcOffset, refSlideBox });
    }, []);
    const onEndMoveHandler = React.useCallback((e) => {
        isDownMouse.current = false;
        if (touchSide.current) {
            helper_1.moveEndEvent({
                moveController,
                refCarousel,
                elementSize,
                marginBlock,
                touchSide,
                countChildren,
                stepMove,
                calcOffset,
                onMoveSlide,
                refSlideBox
            });
        }
    }, [countChildren, stepMove, marginBlock]);
};
//# sourceMappingURL=useMouseMove.js.map