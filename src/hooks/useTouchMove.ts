import * as React from 'react';
import {coorType, IElementSizeType, IMoveSlideEvent, sideEnumType} from '../type';
import {MoveController} from '../utils/moveController';
import {MutableRefObject} from 'react';
import {cancelEvent, moveEndEvent, moveEvent} from './helper';

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


export const useTouchMove = (
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
            }
        }
        return () => {}
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
        moveEvent({moveX, moveY, deadZone, touchSide, calcOffset, refSlideBox});
    }, []);


    const onEndMoveHandler = React.useCallback((e) => {
        if (touchSide.current) {
            moveEndEvent({
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
            })
        }
    },[countChildren, stepMove, marginBlock]);

    const onCancelMoveHandler = React.useCallback((e) => {
        cancelEvent({touchSide, refSlideBox, calcOffset})
    }, []);
};
