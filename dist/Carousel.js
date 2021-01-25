"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const const_1 = require("./const");
require("./styles.css");
const Slide_1 = require("./components/Slide");
const moveController_1 = require("./utils/moveController");
const CarouselView_1 = require("./components/CarouselView");
const ButtonCarousel_1 = require("./components/ButtonCarousel");
const useTouchAndMouse_1 = require("./hooks/useTouchAndMouse");
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
     */
    useTouchAndMouse_1.useTouchAndMouse({
        refCarousel,
        countChildren,
        moveController,
        calcOffset,
        refSlideBox,
        elementSize,
        marginBlock,
        onMoveSlide
    });
    if (!children) {
        return null;
    }
    return (React.createElement(CarouselView_1.CarouselView, { marginBlock: marginBlock, refCarousel: refCarousel, refSlideBox: refSlideBox, leftButton: React.createElement(ButtonCarousel_1.Button, { handle: handleLeft, customRender: renderLeftButton, side: const_1.sideEnum.LEFT }), rightButton: React.createElement(ButtonCarousel_1.Button, { handle: handleRight, customRender: renderRightButton, side: const_1.sideEnum.RIGHT }), isRelative: isRelative }, React.Children.map(children, (child, i) => {
        return (React.createElement(Slide_1.Slide, { id: i, data: child, refSize: elementSize.current, marginBlock: marginBlock }));
    })));
};
//# sourceMappingURL=Carousel.js.map