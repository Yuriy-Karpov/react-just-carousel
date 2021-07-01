import React from 'react';

import {Meta} from '@storybook/react';
import {JustCarousel} from '../Carousel';

import {testData} from '../../demo/src/testData';
import {ItemBlock} from '../../demo/src/components/ItemBlock';


export const Primary = () => {
    <JustCarousel marginBlock={10}>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>2</div>
    </JustCarousel>;
};

export default {
    component: JustCarousel,
    title: 'Components/JustCarousel',
}
