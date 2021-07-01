import * as React from 'react';
import { coorType, IElementSizeType, IMoveSlideEvent } from '../type';
import { MoveController } from '../utils/moveController';
import { MutableRefObject } from 'react';
export interface IUseTouchAndMouse {
    refCarousel: MutableRefObject<HTMLInputElement>;
    countChildren: number;
    moveController: MutableRefObject<MoveController>;
    calcOffset: MutableRefObject<number>;
    refSlideBox: MutableRefObject<HTMLInputElement>;
    elementSize: React.MutableRefObject<IElementSizeType>;
    marginBlock: number;
    onMoveSlide?: (arg0: IMoveSlideEvent) => void;
    stepMove: number;
    deadZone: coorType;
}
export declare const useMouseMove: ({ refCarousel, countChildren, moveController, calcOffset, refSlideBox, elementSize, marginBlock, onMoveSlide, stepMove, deadZone }: IUseTouchAndMouse) => void;
