import * as React from 'react';
import {sideEnum} from '../const';

export interface IButton {
    handle: () => void;
    customRender: React.ReactNode;
    side?: 'left' | 'right' | undefined
}


export const Button = ({handle, customRender, side}: IButton) => {
    return (
        <div className={"rj-carousel__btn-handle"} onClick={handle}>
            {customRender ? customRender : <div className={`rj-carousel__btn-default rj-carousel__btn-default_${side}`}>
                {side === sideEnum.LEFT || <span>›</span>}
                {side === sideEnum.RIGHT || <span>‹</span>}
            </div>}
        </div>
    )
};
