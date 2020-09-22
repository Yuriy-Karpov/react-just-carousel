import * as React from 'react';

interface ISlide {
    data: React.ReactNode;
    id: number;
    size: Object;
}

export function Slide({data, id, size}:ISlide) {
    const measuredRef = React.useCallback(node => {
        if (node !== null) {
            size[id] = node.getBoundingClientRect().width;
        }
    }, []);
    return (
        <div ref={measuredRef} className="itemSlide">
            {data}
        </div>
    );
}

