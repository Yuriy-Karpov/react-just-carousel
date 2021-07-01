"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const const_1 = require("./const");
require("./styles.css");
const Slide_1 = require("./components/Slide");
const moveController_1 = require("./utils/moveController");
const CarouselView_1 = require("./components/CarouselView");
const ButtonCarousel_1 = require("./components/ButtonCarousel");
const useTouchMove_1 = require("./hooks/useTouchMove");
const useMouseMove_1 = require("./hooks/useMouseMove");
const animations_1 = require("./utils/animations");
exports.JustCarousel = ({ children, renderLeftButton, renderRightButton, isRelative = true, marginBlock = 0, onMoveSlide, stepMove = 1, deadZoneTouchX = 5, deadZoneTouchY = 5, }) => {
    const countChildren = React.Children.count(children);
    const elementSize = React.useRef({});
    const refCarousel = React.useRef(null);
    const refSlideBox = React.useRef(null);
    const calcOffset = React.useRef(0);
    const moveController = React.useRef();
    const handleWindowResize = React.useCallback(() => {
        if (moveController.current) {
            const offset = moveController.current.calculateResize(refCarousel.current, elementSize.current, marginBlock);
            animations_1.transformAnimation(refSlideBox.current, offset);
        }
    }, [marginBlock, children]);
    React.useEffect(() => {
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, [marginBlock, children]);
    const move = React.useCallback((side) => {
        if (!moveController.current) {
            moveController.current = new moveController_1.MoveController(refCarousel.current, elementSize.current, marginBlock);
        }
        const { offset, isLeftEnd, isRightEnd, offsetCount } = moveController.current.calculate(side, countChildren, marginBlock, stepMove);
        calcOffset.current = offset;
        if (onMoveSlide) {
            onMoveSlide({
                side,
                isLeftEnd,
                isRightEnd,
                offsetCount,
            });
        }
        animations_1.transformAnimation(refSlideBox.current, calcOffset.current);
    }, [countChildren, onMoveSlide, stepMove, marginBlock]);
    const handleRight = React.useCallback(() => {
        move(const_1.sideEnum.RIGHT);
    }, [move, stepMove, marginBlock]);
    const handleLeft = React.useCallback(() => {
        move(const_1.sideEnum.LEFT);
    }, [move, stepMove, marginBlock]);
    /**
     * ********** onTouchMove ********** *
     */
    useTouchMove_1.useTouchMove({
        refCarousel,
        countChildren,
        moveController,
        calcOffset,
        refSlideBox,
        elementSize,
        marginBlock,
        onMoveSlide,
        stepMove,
        deadZone: {
            x: deadZoneTouchX,
            y: deadZoneTouchY
        },
    });
    useMouseMove_1.useMouseMove({
        refCarousel,
        countChildren,
        moveController,
        calcOffset,
        refSlideBox,
        elementSize,
        marginBlock,
        onMoveSlide,
        stepMove,
        deadZone: {
            x: deadZoneTouchX,
            y: deadZoneTouchY
        },
    });
    if (!children) {
        return null;
    }
    return (React.createElement(CarouselView_1.CarouselView, { marginBlock: marginBlock, refCarousel: refCarousel, refSlideBox: refSlideBox, leftButton: React.createElement(ButtonCarousel_1.Button, { handle: handleLeft, customRender: renderLeftButton, side: const_1.sideEnum.LEFT }), rightButton: React.createElement(ButtonCarousel_1.Button, { handle: handleRight, customRender: renderRightButton, side: const_1.sideEnum.RIGHT }), isRelative: isRelative }, React.Children.map(children, (child, i) => {
        return (React.createElement(Slide_1.Slide, { id: i, data: child, refSize: elementSize.current, marginBlock: marginBlock }));
    })));
};
//# sourceMappingURL=Carousel.js.map