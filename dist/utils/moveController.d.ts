import { IElementSizeType, sideEnumType } from '../type';
export declare class MoveController {
    private count;
    private offset;
    private prevOffset;
    private end;
    private widthCarousel;
    private fullWidth;
    private sized;
    constructor(carouselDiv: HTMLDivElement, sized: IElementSizeType, marginBlock: number);
    calculateResize(carouselDiv: HTMLDivElement, sized: IElementSizeType, marginBlock: number): void;
    calculate(side: sideEnumType, countChildren: number, marginBlock: number): number;
}
