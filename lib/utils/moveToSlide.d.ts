import { IElementSizeType, sideEnumType, StateCarouselType } from '../type';
interface IMoveSlide {
    state: StateCarouselType;
    countChildren: number;
    elementSize: IElementSizeType;
    widthCarousel: number;
    fullWidth: number;
}
export declare const moveToSlide: (side: sideEnumType, { state, countChildren, elementSize, widthCarousel, fullWidth, }: IMoveSlide) => StateCarouselType;
export {};
