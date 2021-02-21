import * as React from 'react';
import {coorType, IElementSizeType, IMoveSlideEvent, sideEnumType} from '../type';
import {sideEnum} from '../const';
import {MoveController} from '../utils/moveController';
import {MutableRefObject} from 'react';

export interface IUseTouchAndMouse {
    refCarousel: MutableRefObject<HTMLInputElement>,
    countChildren: number,
    moveController: MutableRefObject<MoveController>,
    calcOffset: MutableRefObject<number>,
    refSlideBox: MutableRefObject<HTMLInputElement>,
    elementSize: React.MutableRefObject<IElementSizeType>,
    marginBlock: number,
    onMoveSlide?: (arg0: IMoveSlideEvent) => void;
    stepMove: number;
    deadZone: coorType
}


export const useTouchAndMouse = (
    {
        refCarousel,
        countChildren,
        moveController,
        calcOffset,
        refSlideBox,
        elementSize,
        marginBlock,
        onMoveSlide,
        stepMove,
        deadZone
    }: IUseTouchAndMouse) => {
    const firstFinger = 0;
    const touchStart = React.useRef<null | coorType>(null);
    const touchSide = React.useRef<null | sideEnumType>(null);
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
            }
        }
        return () => {}
    }, [countChildren, stepMove, marginBlock]);

    const onTouchMove = React.useCallback((e) => {
        switch (e.type) {
            case 'mousedown':
            case 'touchstart': {
                touchStart.current = {
                    x: e.touches[firstFinger].screenX,
                    y: e.touches[firstFinger].screenY,
                };
                break;
            }
            case 'mousemove':
            case 'touchmove': {
                const moveX = touchStart.current.x - e.touches[firstFinger].screenX;
                const moveY = touchStart.current.y - e.touches[firstFinger].screenY;

                if (Math.abs(moveX) >= deadZone.x && e.cancelable) {
                    e.preventDefault();
                }
                if (Math.abs(moveY) >= deadZone.y) {
                    break
                }

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
                    const {offset, isLeftEnd, isRightEnd, offsetCount} = moveController.current.calculate(touchSide.current, countChildren, marginBlock, stepMove);
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
    }, [countChildren, stepMove, marginBlock]);
};
