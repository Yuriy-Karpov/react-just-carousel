import * as React from 'react';
export interface IOptions {
    children: React.ReactNode;
    renderLeftButton?: React.ReactNode;
    renderRightButton?: React.ReactNode;
    isRelative?: boolean;
}
export declare type sideEnumType = 'left' | 'right';
export interface IElementSizeType {
    [key: number]: number;
}
export declare type StateCarouselType = {
    offset: number;
    count: number;
    prevOffset: number;
    end: boolean;
};
