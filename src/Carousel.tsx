// import React, { useState, useCallback, useRef } from "react";
import * as React from 'react';
import {sideEnum} from './const';

import './styles.css';
import {Slide} from './components/Slide';
import {IElementSizeType, IOptions, sideEnumType} from './type';
import {MutableRefObject} from 'react';
import {moveToSlide} from './utils/moveToSlide';
import {CarouselView} from './components/CarouselView';
import {ButtonRight, ButtonLeft} from './components/ButtonCarousel';


export const Carousel = (options: IOptions) => {
    const {children} = options;

    if (!children) {
        return null;
    }
    const countChildren = React.Children.count(children);

    const [state, setState] = React.useState({
        count: 0,
        offset: 0,
        prevOffset: 0,
        end: false
    });
    const elementSize: MutableRefObject<IElementSizeType> = React.useRef({});
    const refCarousel = React.useRef(null);
    // const refSlider = React.useRef(null); //?


    const move = (side: sideEnumType) => {
        const widthCarousel = refCarousel.current.clientWidth;
        //TODO тут надо перещитывать если есть изменения в props
        const fullWidth = Object.values(elementSize.current).reduce(
            (pre, current) => {
                return pre + current;
            }, 0
        );
        const newState = moveToSlide(side, {
            state,
            countChildren,
            elementSize: elementSize.current,
            widthCarousel,
            fullWidth
        });
        setState(newState)
    };

    const handleRight = () => {
        move(sideEnum.RIGHT);
    };
    const handleLeft = () => {
        move(sideEnum.LEFT);
    };

    const slideBoxOffset = {
        transform: `translateX(${state.offset}px)`
    };

    return (
        <CarouselView
            refCarousel={refCarousel}
            slideBoxOffset={slideBoxOffset}
            leftButton={<ButtonLeft handle={handleLeft}/>}
            rightButton={<ButtonRight handle={handleRight}/>}
        >
            {React.Children.map(children, (child, i) => {
                return (
                    <Slide id={i} data={child} size={elementSize.current}/>
                );
            })}
        </CarouselView>
    );
};

