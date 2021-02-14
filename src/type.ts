import * as React from 'react';

export type sideEnumType = 'left' | 'right';

export interface IOptions {
    children: React.ReactNode;
    renderLeftButton?: React.ReactNode;
    renderRightButton?: React.ReactNode;
    isRelative?: boolean;
    marginBlock?: number;
    onMoveSlide?: (arg0: IMoveSlideEvent) => void;
    stepMove?: number;
    deadZoneTouchX?: number;
    deadZoneTouchY?: number;
}

export interface IMoveSlideEvent {
    side: sideEnumType;
    isLeftEnd: boolean;
    isRightEnd: boolean;
    offsetCount: number;
}

export interface IElementSizeType {
    [key: number]: number
}

export type coorType = {
    x: number;
    y: number;
}
