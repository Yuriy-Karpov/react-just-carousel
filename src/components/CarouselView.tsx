import * as React from 'react';

interface ICarouselView {
    children: React.ReactNode;
    refCarousel: React.RefObject<HTMLDivElement>;
    slideBoxOffset: React.CSSProperties,
    leftButton: React.ReactNode;
    rightButton: React.ReactNode;
    isRelative: boolean;
}

export const CarouselView = React.memo((
    {
        children,
        refCarousel,
        slideBoxOffset,
        leftButton,
        rightButton,
        isRelative
    }: ICarouselView) => {
    return (
        <div className={`rj-carousel${isRelative ? ' rj-carousel_relative' : ''}`}>
            <div ref={refCarousel} className="rj-carousel__wrap">
                <div className="rj-carousel__slide-box" style={slideBoxOffset}>
                    {children}
                </div>
            </div>
            {leftButton}
            {rightButton}
        </div>
    )
});
