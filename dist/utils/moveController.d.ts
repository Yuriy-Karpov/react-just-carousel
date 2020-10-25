import { IElementSizeType, sideEnumType } from '../type';
export declare class MoveController {
    private count;
    private offset;
    private prevOffset;
    private end;
    private widthCarousel;
    private fullWidth;
    private sized;
    constructor(carouselDiv: HTMLDivElement, sized: IElementSizeType);
    calculateResize(carouselDiv: HTMLDivElement, sized: IElementSizeType): void;
    calculate(side: sideEnumType, countChildren: number): number;
}
