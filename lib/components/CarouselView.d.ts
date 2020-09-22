import * as React from 'react';
interface ICarouselView {
    children: React.ReactNode;
    refCarousel: React.RefObject<HTMLDivElement>;
    slideBoxOffset: React.CSSProperties;
    leftButton: React.ReactNode;
    rightButton: React.ReactNode;
}
export declare const CarouselView: React.MemoExoticComponent<({ children, refCarousel, slideBoxOffset, leftButton, rightButton, }: ICarouselView) => JSX.Element>;
export {};
