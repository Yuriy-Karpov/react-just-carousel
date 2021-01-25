"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const const_1 = require("../const");
const moveController_1 = require("../utils/moveController");
exports.useTouchAndMouse = ({ refCarousel, countChildren, moveController, calcOffset, refSlideBox, elementSize, marginBlock, onMoveSlide }) => {
    const firstFinger = 0;
    const touchStart = React.useRef(null);
    const touchSide = React.useRef(null);
    const offsetAnimSlide = 100;
    React.useLayoutEffect(() => {
        if (refCarousel && refCarousel.current) {
            refCarousel.current.addEventListener('touchstart', onTouchMove);
            refCarousel.current.addEventListener('touchmove', onTouchMove);
            refCarousel.current.addEventListener('touchend', onTouchMove);
            refCarousel.current.addEventListener('touchcancel', onTouchMove);
            return () => {
                refCarousel.current.removeEventListener('touchstart', onTouchMove);
                refCarousel.current.removeEventListener('touchmove', onTouchMove);
                refCarousel.current.removeEventListener('touchend', onTouchMove);
                refCarousel.current.removeEventListener('touchcancel', onTouchMove);
            };
        }
    }, [countChildren]);
    const onTouchMove = React.useCallback((e) => {
        switch (e.type) {
            case 'mousedown':
            case 'touchstart': {
                touchStart.current = e.touches[firstFinger].screenX;
                break;
            }
            case 'mousemove':
            case 'touchmove': {
                const moveX = touchStart.current - e.touches[firstFinger].screenX;
                if (Math.abs(moveX) >= 5 && e.cancelable) {
                    e.preventDefault();
                }
                if (!touchSide.current && moveX >= 15) {
                    touchSide.current = const_1.sideEnum.RIGHT;
                    // надо убрать анимацию с последнего элемента
                    const moveOffset = calcOffset.current - offsetAnimSlide;
                    window.requestAnimationFrame(() => {
                        refSlideBox.current.style.transform = `translateX(${moveOffset}px)`;
                    });
                }
                if (!touchSide.current && moveX <= -15) {
                    touchSide.current = const_1.sideEnum.LEFT;
                    const moveOffset = calcOffset.current !== 0 ? calcOffset.current + offsetAnimSlide : calcOffset.current;
                    window.requestAnimationFrame(() => {
                        refSlideBox.current.style.transform = `translateX(${moveOffset}px)`;
                    });
                }
                break;
            }
            case 'mouseup':
            case 'touchend': {
                if (touchSide.current) {
                    if (!moveController.current) {
                        // это надо исправить
                        moveController.current = new moveController_1.MoveController(refCarousel.current, elementSize.current, marginBlock);
                    }
                    const { offset, isLeftEnd, isRightEnd, offsetCount } = moveController.current.calculate(touchSide.current, countChildren, marginBlock);
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
                    window.requestAnimationFrame(() => {
                        refSlideBox.current.style.transform = `translateX(${calcOffset.current}px)`;
                    });
                }
                break;
            }
            case 'touchcancel':
            default: {
                if (touchSide.current) {
                    touchSide.current = null;
                    refSlideBox.current.style.transform = `translateX(${calcOffset.current}px)`;
                }
                break;
            }
        }
    }, [countChildren]);
};
//# sourceMappingURL=useTouchAndMouse.js.map