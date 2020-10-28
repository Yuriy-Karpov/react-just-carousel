import * as React from 'react';

export interface IOptions {
    children: React.ReactNode;
    renderLeftButton?: React.ReactNode;
    renderRightButton?: React.ReactNode;
    isRelative?: boolean;
}

export type sideEnumType = 'left' | 'right';

export interface IElementSizeType {
    [key: number]: number
}
