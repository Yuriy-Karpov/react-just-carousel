import * as React from 'react';
import { MoveController } from '../utils/moveController';
import { coorType, IElementSizeType, IMoveSlideEvent, sideEnumType } from '../type';
import { MutableRefObject } from 'react';
interface IMoveEvent {
    moveX: number;
    moveY: number;
    deadZone: coorType;
    touchSide: React.MutableRefObject<sideEnumType>;
    calcOffset: React.MutableRefObject<number>;
    refSlideBox: MutableRefObject<HTMLInputElement>;
}
export declare const moveEvent: ({ moveX, moveY, deadZone, touchSide, calcOffset, refSlideBox }: IMoveEvent) => void;
interface IMoveEndEvent {
    moveController: MutableRefObject<MoveController>;
    refCarousel: MutableRefObject<HTMLInputElement>;
    elementSize: React.MutableRefObject<IElementSizeType>;
    marginBlock: number;
    touchSide: React.MutableRefObject<sideEnumType>;
    countChildren: number;
    stepMove: number;
    calcOffset: React.MutableRefObject<number>;
    onMoveSlide: (arg0: IMoveSlideEvent) => void;
    refSlideBox: MutableRefObject<HTMLInputElement>;
}
export declare const moveEndEvent: ({ moveController, refCarousel, elementSize, marginBlock, touchSide, countChildren, stepMove, calcOffset, onMoveSlide, refSlideBox }: IMoveEndEvent) => void;
interface ICancelEvent {
    touchSide: React.MutableRefObject<sideEnumType>;
    refSlideBox: MutableRefObject<HTMLInputElement>;
    calcOffset: React.MutableRefObject<number>;
}
export declare const cancelEvent: ({ touchSide, refSlideBox, calcOffset }: ICancelEvent) => void;
export {};
