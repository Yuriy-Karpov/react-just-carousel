import * as React from 'react';

interface ICarouselView {
    children: React.ReactNode;
    refCarousel: React.RefObject<HTMLDivElement>;
    slideBoxOffset: React.CSSProperties,
    leftButton: React.ReactNode;
    rightButton: React.ReactNode;
}
export const CarouselView = React.memo((
    {
        children,
        refCarousel,
        slideBoxOffset,
        leftButton,
        rightButton,
    }:ICarouselView) => {
    return (
        <div ref={refCarousel} className="carousel carousel-wrap">
            <div className="slideBox" style={slideBoxOffset}>
                {children}
            </div>
            {leftButton}
            {rightButton}
        </div>
    )
});
