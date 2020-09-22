"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import React, { useState, useCallback, useRef } from "react";
const React = require("react");
const const_1 = require("./const");
require("./styles.css");
const Slide_1 = require("./components/Slide");
const moveToSlide_1 = require("./utils/moveToSlide");
const CarouselView_1 = require("./components/CarouselView");
const ButtonCarousel_1 = require("./components/ButtonCarousel");
exports.Carousel = (options) => {
    const { children } = options;
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
    const elementSize = React.useRef({});
    const refCarousel = React.useRef(null);
    // const refSlider = React.useRef(null); //?
    const move = (side) => {
        const widthCarousel = refCarousel.current.clientWidth;
        //TODO тут надо перещитывать если есть изменения в props
        const fullWidth = Object.values(elementSize.current).reduce((pre, current) => {
            return pre + current;
        }, 0);
        const newState = moveToSlide_1.moveToSlide(side, {
            state,
            countChildren,
            elementSize: elementSize.current,
            widthCarousel,
            fullWidth
        });
        setState(newState);
    };
    const handleRight = () => {
        move(const_1.sideEnum.RIGHT);
    };
    const handleLeft = () => {
        move(const_1.sideEnum.LEFT);
    };
    const slideBoxOffset = {
        transform: `translateX(${state.offset}px)`
    };
    return (React.createElement(CarouselView_1.CarouselView, { refCarousel: refCarousel, slideBoxOffset: slideBoxOffset, leftButton: React.createElement(ButtonCarousel_1.ButtonLeft, { handle: handleLeft }), rightButton: React.createElement(ButtonCarousel_1.ButtonRight, { handle: handleRight }) }, React.Children.map(children, (child, i) => {
        return (React.createElement(Slide_1.Slide, { id: i, data: child, size: elementSize.current }));
    })));
};
//# sourceMappingURL=Carousel.js.map