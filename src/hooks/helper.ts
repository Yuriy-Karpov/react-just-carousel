import * as React from 'react';
import {sideEnum} from '../const';
import {MoveController} from '../utils/moveController';
import {coorType, IElementSizeType, IMoveSlideEvent, sideEnumType} from '../type';
import {MutableRefObject} from 'react';
import {transformAnimation} from '../utils/animations';

interface IMoveEvent {
    moveX: number;
    moveY: number;
    deadZone: coorType;
    touchSide: React.MutableRefObject<sideEnumType>;
    calcOffset: React.MutableRefObject<number>;
    refSlideBox: MutableRefObject<HTMLInputElement>;
}
export const moveEvent = ({
        moveX,
        moveY,
        deadZone,
        touchSide,
        calcOffset,
        refSlideBox
    }:IMoveEvent): void => {

    const offsetAnimSlide = 100;
    if (Math.abs(moveY) >= deadZone.y) {
       return
    }

    if (!touchSide.current && moveX >= 15) {
        touchSide.current = sideEnum.RIGHT;
        const moveOffset = calcOffset.current - offsetAnimSlide;
        transformAnimation(refSlideBox.current, moveOffset);
    }
    if (!touchSide.current && moveX <= -15) {
        touchSide.current = sideEnum.LEFT;
        const moveOffset = calcOffset.current !== 0 ? calcOffset.current + offsetAnimSlide : calcOffset.current + ( offsetAnimSlide/2);
        transformAnimation(refSlideBox.current, moveOffset);
    }
};

interface IMoveEndEvent {
    moveController: MutableRefObject<MoveController>;
    refCarousel: MutableRefObject<HTMLInputElement>;
    elementSize: React.MutableRefObject<IElementSizeType>;
    marginBlock: number;
    touchSide: React.MutableRefObject<sideEnumType>;
    countChildren: number
    stepMove: number;
    calcOffset: React.MutableRefObject<number>;
    onMoveSlide: (arg0: IMoveSlideEvent) => void;
    refSlideBox: MutableRefObject<HTMLInputElement>;
}
export const moveEndEvent = ({
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
    }: IMoveEndEvent): void => {
    if (!moveController.current) {
        moveController.current = new MoveController(refCarousel.current, elementSize.current, marginBlock);
    }
    const {
        offset,
        isLeftEnd,
        isRightEnd,
        offsetCount
    } = moveController.current.calculate(touchSide.current, countChildren, marginBlock, stepMove);

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
    transformAnimation(refSlideBox.current, calcOffset.current);
};

interface ICancelEvent {
    touchSide: React.MutableRefObject<sideEnumType>;
    refSlideBox: MutableRefObject<HTMLInputElement>;
    calcOffset: React.MutableRefObject<number>;
}
export const cancelEvent = ({
        touchSide,
        refSlideBox,
        calcOffset
    }:ICancelEvent) => {

    if (touchSide.current) {
        touchSide.current = null;
        transformAnimation(refSlideBox.current, calcOffset.current)
    }
};

