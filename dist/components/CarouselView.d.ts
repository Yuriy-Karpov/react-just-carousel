import * as React from 'react';
interface ICarouselView {
    children: React.ReactNode;
    refCarousel: React.RefObject<HTMLDivElement>;
    refSlideBox: React.RefObject<HTMLDivElement>;
    leftButton: React.ReactNode;
    rightButton: React.ReactNode;
    isRelative: boolean;
    marginBlock: number;
}
export declare const CarouselView: React.MemoExoticComponent<({ children, refCarousel, refSlideBox, leftButton, rightButton, isRelative, marginBlock }: ICarouselView) => JSX.Element>;
export {};
