import * as React from 'react';
import { IElementSizeType, IMoveSlideEvent } from '../type';
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
}
export declare const useTouchAndMouse: ({ refCarousel, countChildren, moveController, calcOffset, refSlideBox, elementSize, marginBlock, onMoveSlide }: IUseTouchAndMouse) => void;
