import * as React from 'react';
export interface IButton {
    handle: () => void;
    customRender: React.ReactNode;
    side?: 'left' | 'right' | undefined;
}
export declare const Button: ({ handle, customRender, side }: IButton) => JSX.Element;
