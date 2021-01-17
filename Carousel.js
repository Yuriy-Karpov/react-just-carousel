"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const const_1 = require("./const");
require("./styles.css");
const Slide_1 = require("./components/Slide");
const moveController_1 = require("./utils/moveController");
const CarouselView_1 = require("./components/CarouselView");
const ButtonCarousel_1 = require("./components/ButtonCarousel");
exports.JustCarousel = ({ children, renderLeftButton, renderRightButton, isRelative = true, marginBlock = 0, onMoveSlide }) => {
    const countChildren = React.Children.count(children);
    const elementSize = React.useRef({});
    const refCarousel = React.useRef(null);
    const refSlideBox = React.useRef(null);
    const calcOffset = React.useRef(0);
    const moveController = React.useRef();
    const handleWindowResize = React.useCallback(() => {
        if (moveController.current) {
            moveController.current.calculateResize(refCarousel.current, elementSize.current, marginBlock);
        }
    }, []);
    React.useEffect(() => {
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);
    const move = React.useCallback((side) => {
        if (!moveController.current) {
            moveController.current = new moveController_1.MoveController(refCarousel.current, elementSize.current, marginBlock);
        }
        const { offset, isLeftEnd, isRightEnd, offsetCount } = moveController.current.calculate(side, countChildren, marginBlock);
        calcOffset.current = offset;
        if (onMoveSlide) {
            onMoveSlide({
                side,
                isLeftEnd,
                isRightEnd,
                offsetCount,
            });
        }
        window.requestAnimationFrame(() => {
            refSlideBox.current.style.transform = `translateX(${calcOffset.current}px)`;
        });
    }, [countChildren, onMoveSlide]);
    const handleRight = React.useCallback(() => {
        move(const_1.sideEnum.RIGHT);
    }, [move]);
    const handleLeft = React.useCallback(() => {
        move(const_1.sideEnum.LEFT);
    }, [move]);
    /**
     * ********** onTouchMove ********** *
     * TODO fix, move in hook
     */
    const firstFinger = 0;
    const touchStart = React.useRef(null);
    const touchSide = React.useRef(null);
    const offsetAnimSlide = 100;
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
    if (!children) {
        return null;
    }
    return (React.createElement(CarouselView_1.CarouselView, { marginBlock: marginBlock, onTouchMove: onTouchMove, refCarousel: refCarousel, refSlideBox: refSlideBox, leftButton: React.createElement(ButtonCarousel_1.Button, { handle: handleLeft, customRender: renderLeftButton, side: const_1.sideEnum.LEFT }), rightButton: React.createElement(ButtonCarousel_1.Button, { handle: handleRight, customRender: renderRightButton, side: const_1.sideEnum.RIGHT }), isRelative: isRelative }, React.Children.map(children, (child, i) => {
        return (React.createElement(Slide_1.Slide, { id: i, data: child, refSize: elementSize.current, marginBlock: marginBlock }));
    })));
};
//# sourceMappingURL=Carousel.js.map