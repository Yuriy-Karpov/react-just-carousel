"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import React, { useState, useCallback, useRef } from "react";
const React = require("react");
const const_1 = require("./const");
require("./styles.css");
const Slide_1 = require("./components/Slide");
const moveSlide = (side, { state, countChildren, elementSize, widthCarousel, fullWidth }) => {
    const { count, offset } = state;
    if (side === const_1.sideEnum.RIGHT && count < countChildren && !state.end) {
        const widthItem = elementSize[count];
        const offsetAndSlider = Math.abs(offset) + widthCarousel + widthItem;
        if (offsetAndSlider >= fullWidth) {
            return ({
                offset: -(fullWidth - widthCarousel),
                count: count + 1,
                prevOffset: offset,
                end: true
            });
        }
        return (Object.assign({}, state, { offset: offset - widthItem, count: count + 1, prevOffset: offset }));
    }
    if (side === const_1.sideEnum.LEFT && count > 0) {
        const widthItem = elementSize[count - 1];
        if (state.end) {
            return (Object.assign({}, state, { offset: state.prevOffset, count: count - 1, prevOffset: offset, end: false }));
        }
        return (Object.assign({}, state, { offset: offset + widthItem, count: count - 1, prevOffset: offset }));
    }
    return state;
};
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
    const refSlider = React.useRef(null);
    const move = (side) => {
        const widthCarousel = refCarousel.current.clientWidth;
        // тут надо перещитывать если есть изменения в props
        const fullWidth = Object.values(elementSize).reduce((pre, current) => {
            return pre + current;
        }, 0);
        const newState = moveSlide(side, {
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
    return (React.createElement("div", { ref: refCarousel, className: "Carousel" },
        React.createElement("div", { ref: refSlider, className: "slideBox", style: slideBoxOffset }, React.Children.map(children, (child, i) => {
            return (React.createElement(Slide_1.Slide, { id: i, data: child, size: elementSize.current }));
        })),
        React.createElement("button", { className: "left", onClick: handleLeft }, "left"),
        React.createElement("button", { className: "right", onClick: handleRight }, "right")));
};
//# sourceMappingURL=Carousel.js.map