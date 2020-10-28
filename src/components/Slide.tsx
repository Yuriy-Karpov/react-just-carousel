import * as React from 'react';

interface ISlide {
    data: React.ReactNode;
    id: number;
    refSize: Object;
}

export function Slide({data, id, refSize}:ISlide) {
    const measuredRef = React.useCallback(node => {
        if (node !== null) {
            refSize[id] = node.getBoundingClientRect().width;
        }
    }, []);
    return (
        <div ref={measuredRef} className="rj-carousel__slide">
            {data}
        </div>
    );
}

