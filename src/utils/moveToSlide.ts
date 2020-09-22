import {IElementSizeType, sideEnumType, StateCarouselType} from '../type';
import {sideEnum} from '../const';

interface IMoveSlide {
    state: StateCarouselType
    countChildren: number;
    elementSize: IElementSizeType;
    widthCarousel: number;
    fullWidth: number;
}

export const moveToSlide = (side: sideEnumType, {
    state,
    countChildren,
    elementSize,
    widthCarousel,
    fullWidth,
    // toSlide = 1
}: IMoveSlide): StateCarouselType => {
    const {count, offset} = state;

    if (side === sideEnum.RIGHT && count < countChildren && !state.end) {
        const widthItem = elementSize[count];
        const offsetAndSlider = Math.abs(offset) + widthCarousel + widthItem;
        if (offsetAndSlider >= fullWidth) {
            return {
                offset: -(fullWidth - widthCarousel),
                count: count + 1,
                prevOffset: offset,
                end: true
            };
        }
        return {
            ...state,
            offset: offset - widthItem,
            count: count + 1,
            prevOffset: offset
        };
    }
    if (side === sideEnum.LEFT && count > 0) {
        const widthItem = elementSize[count - 1];
        if (state.end) {
            return {
                ...state,
                offset: state.prevOffset,
                count: count - 1,
                prevOffset: offset,
                end: false
            };
        }
        return {
            ...state,
            offset: offset + widthItem,
            count: count - 1,
            prevOffset: offset
        };
    }
    return state;
};
