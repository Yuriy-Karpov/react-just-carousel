import {IElementSizeType, sideEnumType} from '../type';
import {sideEnum} from '../const';

export class MoveController {
    private count = 0;
    private offset = 0;
    private prevOffset = 0;
    private end = false;
    private widthCarousel: number;
    private fullWidth: number;
    private sized: IElementSizeType;

    constructor(carouselDiv: HTMLDivElement, sized: IElementSizeType, marginBlock: number) {
        this.calculateResize(carouselDiv, sized, marginBlock);
    }

    public calculateResize(carouselDiv: HTMLDivElement, sized: IElementSizeType, marginBlock: number) {
        this.sized = sized;
        this.widthCarousel = carouselDiv.clientWidth;


        this.fullWidth = Object.values(sized).reduce(
            (pre, current) => {
                return pre + current + (marginBlock * 2);
            }, 0
        );
    }

    public calculate(side: sideEnumType, countChildren: number, marginBlock: number) {
        if (side === sideEnum.RIGHT && this.count < countChildren && !this.end) {
            const widthItem = this.sized[this.count];
            const offsetAndSlider = Math.abs(this.offset) + this.widthCarousel + widthItem + (marginBlock * 2);
            if (offsetAndSlider >= this.fullWidth) {
                this.offset = -(this.fullWidth - this.widthCarousel);
                this.end = true;
            } else {
                this.offset = this.offset - (widthItem + (marginBlock * 2));
                this.prevOffset = this.offset;
            }

            this.count++;


            return {offset: this.offset, isRightEnd: this.end, isLeftEnd: false, offsetCount: this.count};
        }

        if (side === sideEnum.LEFT && this.count > 0) {
            this.count--;
            const widthItem = this.sized[this.count];
            if (this.end) {
                this.offset = this.prevOffset;
                this.end = false;
            } else {
                this.offset = this.offset + (widthItem + (marginBlock * 2));
            }


            this.prevOffset = this.offset;
            const isLeftEnd = this.count === 0;
            return {offset: this.offset, isRightEnd: this.end, isLeftEnd: isLeftEnd, offsetCount: this.count};
        }
        const isLeftEnd = this.count === 0;
        return {offset: this.offset, isRightEnd: this.end, isLeftEnd: isLeftEnd, offsetCount: this.count};
    }
}

