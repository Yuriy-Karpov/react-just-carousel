import {JustCarousel} from 'react-just-carousel';
import {ButtonLeft, ButtonRight} from '../components/Button';
import React from 'react';
import {ItemBlock} from '../components/ItemBlock';
import {testData} from '../testData';

const example =
    `<JustCarousel
    leftBtn={<ButtonLeft/>}
    rightBtn={<ButtonRight/>}
    isRelative={false}
>
    {testData.map((item, i) => (
        <ItemBlock key={i} title={item.title} width={item.width}/>
    ))}
</JustCarousel>`;

export const CustomBtnBlock = () => {
    return <>
        <h3>Custom button</h3>
        <p>It is possible to pass your buttons, and disabling relative wrappers for buttons</p>
        <div className="carousel-variant--custom-btn">
            <JustCarousel
                marginBlock={15}
                renderLeftButton={<ButtonLeft/>}
                renderRightButton={<ButtonRight/>}
                isRelative={false}
            >
                {testData.map((item, i) => (
                    <ItemBlock key={i} title={item.title} width={item.width}/>
                ))}
            </JustCarousel>
            <pre className="code-one-type">
                {example}
            </pre>
        </div>
    </>;
};
