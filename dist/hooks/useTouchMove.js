"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const helper_1 = require("./helper");
exports.useTouchMove = ({ refCarousel, countChildren, moveController, calcOffset, refSlideBox, elementSize, marginBlock, onMoveSlide, stepMove, deadZone }) => {
    const firstFinger = 0;
    const touchStart = React.useRef(null);
    const touchSide = React.useRef(null);
    React.useLayoutEffect(() => {
        if (refCarousel && refCarousel.current) {
            refCarousel.current.addEventListener('touchstart', onStartTouchHandler);
            refCarousel.current.addEventListener('touchmove', onMoveTouchHandler);
            refCarousel.current.addEventListener('touchend', onEndMoveHandler);
            refCarousel.current.addEventListener('touchcancel', onCancelMoveHandler);
            return () => {
                refCarousel.current.removeEventListener('touchstart', onStartTouchHandler);
                refCarousel.current.removeEventListener('touchmove', onMoveTouchHandler);
                refCarousel.current.removeEventListener('touchend', onEndMoveHandler);
                refCarousel.current.removeEventListener('touchcancel', onCancelMoveHandler);
            };
        }
        return () => { };
    }, [countChildren, stepMove, marginBlock]);
    const onStartTouchHandler = React.useCallback((e) => {
        touchStart.current = {
            x: e.touches[firstFinger].screenX,
            y: e.touches[firstFinger].screenY,
        };
    }, [touchStart]);
    const onMoveTouchHandler = React.useCallback((e) => {
        const moveX = touchStart.current.x - e.touches[firstFinger].screenX;
        const moveY = touchStart.current.y - e.touches[firstFinger].screenY;
        if (Math.abs(moveX) >= deadZone.x && e.cancelable) {
            e.preventDefault();
        }
        helper_1.moveEvent({ moveX, moveY, deadZone, touchSide, calcOffset, refSlideBox });
    }, []);
    const onEndMoveHandler = React.useCallback((e) => {
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
    const onCancelMoveHandler = React.useCallback((e) => {
        helper_1.cancelEvent({ touchSide, refSlideBox, calcOffset });
    }, []);
};
//# sourceMappingURL=useTouchMove.js.map