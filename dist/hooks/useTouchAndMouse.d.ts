import * as React from 'react';
import { coorType, IElementSizeType, IMoveSlideEvent } from '../type';
import { MoveController } from '../utils/moveController';
import { Ref } from 'react';
export interface IUseTouchAndMouse {
    refCarousel: Ref<any>;
    countChildren: number;
    moveController: Ref<MoveController>;
    calcOffset: Ref<number>;
    refSlideBox: Ref<HTMLInputElement>;
    elementSize: React.MutableRefObject<IElementSizeType>;
    marginBlock: number;
    onMoveSlide?: (arg0: IMoveSlideEvent) => void;
    stepMove: number;
    deadZone: coorType;
}
export declare const useTouchAndMouse: ({ refCarousel, countChildren, moveController, calcOffset, refSlideBox, elementSize, marginBlock, onMoveSlide, stepMove, deadZone }: IUseTouchAndMouse) => void;
