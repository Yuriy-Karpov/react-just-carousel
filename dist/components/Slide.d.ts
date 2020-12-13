import * as React from 'react';
interface ISlide {
    data: React.ReactNode;
    id: number;
    refSize: Object;
    marginBlock: number;
}
export declare function Slide({ data, id, refSize, marginBlock, }: ISlide): JSX.Element;
export {};
