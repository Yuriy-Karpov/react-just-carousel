import * as React from 'react';
import {sideEnum} from './const';

import './styles.css';
import {Slide} from './components/Slide';
import {IElementSizeType, IOptions, sideEnumType} from './type';
import {MoveController} from './utils/moveController';
import {CarouselView} from './components/CarouselView';
import {Button} from './components/ButtonCarousel';


export const JustCarousel: React.FC<IOptions> = ({
                                                     children,
                                                     renderLeftButton,
                                                     renderRightButton,
                                                     isRelative = true,
                                                     marginBlock = 0,
                                                     onMoveSlide
                                                 }) => {
    const countChildren = React.Children.count(children);
    const elementSize: React.MutableRefObject<IElementSizeType> = React.useRef({});
    const refCarousel = React.useRef(null);
    const refSlideBox = React.useRef(null);
    const calcOffset = React.useRef(0);
    const moveController = React.useRef<MoveController>();

    const handleWindowResize = React.useCallback(() => {
        if (moveController.current) {
            moveController.current.calculateResize(refCarousel.current, elementSize.current, marginBlock);
        }
    }, []);

    React.useEffect(() => {
        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        }
    }, []);

    const move = React.useCallback((side: sideEnumType) => {
        if (!moveController.current) {
            moveController.current = new MoveController(refCarousel.current, elementSize.current, marginBlock);
        }
        const {offset, isLeftEnd, isRightEnd, offsetCount} = moveController.current.calculate(side, countChildren, marginBlock);
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
            refSlideBox.current.style.transform = `translateX(${calcOffset.current}px)`
        });

    }, [countChildren]);

    const handleRight = React.useCallback(() => {
        move(sideEnum.RIGHT);
    }, [countChildren]);
    const handleLeft = React.useCallback(() => {
        move(sideEnum.LEFT);
    }, [countChildren]);

    /**
     * ********** onTouchMove ********** *
     * TODO fix, move in hook
     */

    const firstFinger = 0;
    const touchStart = React.useRef(null);
    const touchSide = React.useRef<null | sideEnumType>(null);
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
                    touchSide.current = sideEnum.RIGHT;
                    // надо убрать анимацию с последнего элемента
                    const moveOffset = calcOffset.current - offsetAnimSlide;
                    window.requestAnimationFrame(() => {
                        refSlideBox.current.style.transform = `translateX(${moveOffset}px)`
                    });
                }
                if (!touchSide.current && moveX <= -15) {
                    touchSide.current = sideEnum.LEFT;
                    const moveOffset = calcOffset.current !== 0 ? calcOffset.current + offsetAnimSlide : calcOffset.current;
                    window.requestAnimationFrame(() => {
                        refSlideBox.current.style.transform = `translateX(${moveOffset}px)`
                    });
                }
                break;
            }
            case 'mouseup':
            case 'touchend': {
                if (touchSide.current) {
                    if (!moveController.current) {
                        // это надо исправить
                        moveController.current = new MoveController(refCarousel.current, elementSize.current, marginBlock);
                    }
                    const {offset, isLeftEnd, isRightEnd, offsetCount} = moveController.current.calculate(touchSide.current, countChildren, marginBlock);
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
                        refSlideBox.current.style.transform = `translateX(${calcOffset.current}px)`
                    });

                }
                break;
            }
            case 'touchcancel':
            default: {
                if (touchSide.current) {
                    touchSide.current = null;
                    refSlideBox.current.style.transform = `translateX(${calcOffset.current}px)`
                }

                break;
            }

        }
    }, [countChildren]);


    if (!children) {
        return null;
    }
    return (
        <CarouselView
            marginBlock={marginBlock}
            onTouchMove={onTouchMove}
            refCarousel={refCarousel}
            refSlideBox={refSlideBox}
            leftButton={<Button handle={handleLeft} customRender={renderLeftButton} side={sideEnum.LEFT}/>}
            rightButton={<Button handle={handleRight} customRender={renderRightButton} side={sideEnum.RIGHT}/>}
            isRelative={isRelative}
        >
            {React.Children.map(children, (child, i) => {
                return (
                    <Slide id={i} data={child} refSize={elementSize.current} marginBlock={marginBlock}/>
                );
            })}
        </CarouselView>
    );
};

