"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const const_1 = require("./const");
require("./styles.css");
const Slide_1 = require("./components/Slide");
const moveController_1 = require("./utils/moveController");
const CarouselView_1 = require("./components/CarouselView");
const ButtonCarousel_1 = require("./components/ButtonCarousel");
exports.JustCarousel = ({ children, renderLeftButton, renderRightButton, isRelative = true, }) => {
    const countChildren = React.Children.count(children);
    const [offset, setOffset] = React.useState(0);
    const elementSize = React.useRef({});
    const refCarousel = React.useRef(null);
    const moveController = React.useRef();
    const handleWindowResize = React.useCallback(() => {
        if (moveController.current) {
            moveController.current.calculateResize(refCarousel.current, elementSize.current);
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
            moveController.current = new moveController_1.MoveController(refCarousel.current, elementSize.current);
        }
        setOffset(moveController.current.calculate(side, countChildren));
    }, []);
    const handleRight = React.useCallback(() => {
        move(const_1.sideEnum.RIGHT);
    }, []);
    const handleLeft = React.useCallback(() => {
        move(const_1.sideEnum.LEFT);
    }, []);
    const slideBoxOffset = React.useMemo(() => ({
        transform: `translateX(${offset}px)`
    }), [offset]);
    if (!children) {
        return null;
    }
    return (React.createElement(CarouselView_1.CarouselView, { refCarousel: refCarousel, slideBoxOffset: slideBoxOffset, leftButton: React.createElement(ButtonCarousel_1.Button, { handle: handleLeft, customRender: renderLeftButton, side: const_1.sideEnum.LEFT }), rightButton: React.createElement(ButtonCarousel_1.Button, { handle: handleRight, customRender: renderRightButton, side: const_1.sideEnum.RIGHT }), isRelative: isRelative }, React.Children.map(children, (child, i) => {
        return (React.createElement(Slide_1.Slide, { id: i, data: child, refSize: elementSize.current }));
    })));
};
//# sourceMappingURL=Carousel.js.map