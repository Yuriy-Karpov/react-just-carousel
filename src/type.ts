import * as React from 'react';

export interface IOptions {
    children: React.ReactNode;
}

export type sideEnumType = 'left' | 'right';

export interface IElementSizeType {
    [key: number]: number
}


export type StateCarouselType = {
    offset: number;
    count: number;
    prevOffset: number;
    end: boolean;
}
