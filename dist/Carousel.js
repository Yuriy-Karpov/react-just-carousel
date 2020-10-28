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
    const elementSize = React.useRef({});
    const refCarousel = React.useRef(null);
    const refSlideBox = React.useRef(null);
    const calcOffset = React.useRef(0);
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
        calcOffset.current = moveController.current.calculate(side, countChildren);
        //тут добавить тротлинг, или задержку и сумирование "нажатей" пользователя
        window.requestAnimationFrame(() => {
            refSlideBox.current.style.transform = `translateX(${calcOffset.current}px)`;
        });
    }, []);
    const handleRight = React.useCallback(() => {
        move(const_1.sideEnum.RIGHT);
    }, []);
    const handleLeft = React.useCallback(() => {
        move(const_1.sideEnum.LEFT);
    }, []);
    /**
     * ********** onTouchMove ********** *
     * вытащить в отдельную хуку
     */
    const firstFinger = 0;
    const touchStart = React.useRef(null);
    const touchSide = React.useRef(null);
    const onTouchMove = React.useCallback((e) => {
        switch (e.type) {
            case 'touchstart': {
                touchStart.current = e.touches[firstFinger].screenX;
                break;
            }
            case 'touchmove': {
                e.stopPropagation();
                const moveX = touchStart.current - e.touches[firstFinger].screenX;
                if (!touchSide.current && moveX >= 15) {
                    touchSide.current = const_1.sideEnum.RIGHT;
                    // надо убрать анимацию с последнего элемента
                    const moveOffset = calcOffset.current - 50;
                    window.requestAnimationFrame(() => {
                        refSlideBox.current.style.transform = `translateX(${moveOffset}px)`;
                    });
                }
                if (!touchSide.current && moveX <= -15) {
                    touchSide.current = const_1.sideEnum.LEFT;
                    const moveOffset = calcOffset.current !== 0 ? calcOffset.current + 50 : calcOffset.current;
                    window.requestAnimationFrame(() => {
                        refSlideBox.current.style.transform = `translateX(${moveOffset}px)`;
                    });
                }
                break;
            }
            case 'touchend': {
                if (touchSide.current) {
                    if (!moveController.current) {
                        // это надо исправить
                        moveController.current = new moveController_1.MoveController(refCarousel.current, elementSize.current);
                    }
                    calcOffset.current = moveController.current.calculate(touchSide.current, countChildren);
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
    }, []);
    if (!children) {
        return null;
    }
    console.log('RE-RENDER');
    return (React.createElement(CarouselView_1.CarouselView, { onTouchMove: onTouchMove, refCarousel: refCarousel, refSlideBox: refSlideBox, leftButton: React.createElement(ButtonCarousel_1.Button, { handle: handleLeft, customRender: renderLeftButton, side: const_1.sideEnum.LEFT }), rightButton: React.createElement(ButtonCarousel_1.Button, { handle: handleRight, customRender: renderRightButton, side: const_1.sideEnum.RIGHT }), isRelative: isRelative }, React.Children.map(children, (child, i) => {
        return (React.createElement(Slide_1.Slide, { id: i, data: child, refSize: elementSize.current }));
    })));
};
//# sourceMappingURL=Carousel.js.map