import * as React from 'react';

interface ISlide {
    data: React.ReactNode;
    id: number;
    refSize: Object;
    marginBlock: number;
}

export function Slide(
    {
        data,
        id,
        refSize,
        marginBlock,
    }: ISlide) {
    const measuredRef = React.useCallback(node => {
        if (node !== null) {
            refSize[id] = node.getBoundingClientRect().width;
        }
    }, []);
    return (
        <div ref={measuredRef} className="rj-carousel__slide" style={{margin: `0 ${marginBlock}px 0 ${marginBlock}px`}}>
            {data}
        </div>
    );
}

