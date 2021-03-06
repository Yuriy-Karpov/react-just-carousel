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
    calculateResize(carouselDiv: HTMLDivElement, sized: IElementSizeType, marginBlock: number): number;
    calculate(side: sideEnumType, countChildren: number, marginBlock: number, stepMove: number): {
        offset: number;
        isRightEnd: boolean;
        isLeftEnd: boolean;
        offsetCount: number;
    };
}
