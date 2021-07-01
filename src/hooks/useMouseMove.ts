import * as React from 'react';
import {coorType, IElementSizeType, IMoveSlideEvent, sideEnumType} from '../type';
import {MoveController} from '../utils/moveController';
import {MutableRefObject} from 'react';
import {moveEndEvent, moveEvent} from './helper';

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


export const useMouseMove = (
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

    const touchStart = React.useRef<null | coorType>(null);
    const touchSide = React.useRef<null | sideEnumType>(null);
    const isDownMouse = React.useRef<boolean>(false);

    React.useLayoutEffect(() => {
        if (refCarousel && refCarousel.current) {

            refCarousel.current.addEventListener('mousedown', onStartHandler);
            refCarousel.current.addEventListener('mousemove', onMoveMouseHandler);
            refCarousel.current.addEventListener('mouseup', onEndMoveHandler);
            refCarousel.current.addEventListener('mouseleave', onEndMoveHandler);
            return () => {
                refCarousel.current.removeEventListener('mousedown', onStartHandler);
                refCarousel.current.removeEventListener('mousemove', onMoveMouseHandler);
                refCarousel.current.removeEventListener('mouseup', onEndMoveHandler);
                refCarousel.current.removeEventListener('mouseleave', onEndMoveHandler);
            }
        }
        return () => {}
    }, [countChildren, stepMove, marginBlock]);


    const onStartHandler = React.useCallback((e) => {
        touchStart.current = {
            x: e.screenX,
            y: e.screenY,
        };
        isDownMouse.current = true;
    }, [touchStart]);

    const onMoveMouseHandler = React.useCallback((e) => {

        if (!touchStart.current) return;
        if (!isDownMouse.current) return;

        const moveX = touchStart.current.x - e.screenX;
        const moveY = touchStart.current.y - e.screenY;

        if (Math.abs(moveX) >= deadZone.x && e.cancelable) {
            e.preventDefault();
        }
        moveEvent({moveX, moveY, deadZone, touchSide, calcOffset, refSlideBox});
    }, []);

    const onEndMoveHandler = React.useCallback((e) => {
        isDownMouse.current = false;
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

};
