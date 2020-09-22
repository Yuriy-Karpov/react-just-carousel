import * as React from 'react';

export interface IButton {
    handle: () => void;
}

export const ButtonLeft = ({handle}: IButton) => {
    return (
        <div className="button left" onClick={handle}>
            <span>‹</span>
        </div>
    )
};

export const ButtonRight = ({handle}: IButton) => {
    return (
        <div className="button right" onClick={handle}>
            <span>›</span>
        </div>
    )
};
