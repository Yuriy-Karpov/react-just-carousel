import * as React from 'react';
export declare type sideEnumType = 'left' | 'right';
export interface IOptions {
    children: React.ReactNode;
    renderLeftButton?: React.ReactNode;
    renderRightButton?: React.ReactNode;
    isRelative?: boolean;
    marginBlock?: number;
    onMoveSlide?: (arg0: IMoveSlideEvent) => void;
}
export interface IMoveSlideEvent {
    side: sideEnumType;
    isLeftEnd: boolean;
    isRightEnd: boolean;
    offsetCount: number;
}
export interface IElementSizeType {
    [key: number]: number;
}
