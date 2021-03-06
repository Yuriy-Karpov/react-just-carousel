"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const helper_1 = require("./helper");
exports.useTouchAndMouse = ({ refCarousel, countChildren, moveController, calcOffset, refSlideBox, elementSize, marginBlock, onMoveSlide, stepMove, deadZone }) => {
    const firstFinger = 0;
    const touchStart = React.useRef(null);
    const touchSide = React.useRef(null);
    const isDownMouse = React.useRef(false);
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
    const onMoveTouchHandler = React.useCallback((e) => {
        const moveX = touchStart.current.x - e.touches[firstFinger].screenX;
        const moveY = touchStart.current.y - e.touches[firstFinger].screenY;
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
    const onCancelMoveHandler = React.useCallback((e) => {
        helper_1.cancelEvent({ touchSide, refSlideBox, calcOffset });
    }, []);
};
//# sourceMappingURL=useTouchAndMouse.js.map