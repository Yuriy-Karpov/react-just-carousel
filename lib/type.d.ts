import * as React from 'react';
export interface IOptions {
    children: React.ReactNode;
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
