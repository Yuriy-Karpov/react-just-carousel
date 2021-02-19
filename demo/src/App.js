import React, {useCallback, useState} from 'react';
import './App.css';
import {JustCarousel} from 'react-just-carousel';
import {SlideHeader} from './components/SlideHeader';
import {CustomBtnBlock} from './blocks/CustomBtn';
import {ItemBlock} from './components/ItemBlock';
import {testData} from './testData';
import {InstallBlock} from './blocks/InstallBlock';


function App() {
    const [num, setNum] = useState(4);
    const onClick = useCallback(()=>{
        if (num > 1) {
            setNum(1);
        } else {
            setNum(4);
        }

        console.log('switch')
    }, [num]);
    return (
        <div className="App">
            <header className="FirstLine">
                <menu className="menu">
                    <div className="menu__left">
                        <div className="logo">
                            <div className="logo__text">
                                ReactJust
                                <div className="logo__little">simple components</div>
                            </div>
                        </div>
                    </div>
                    <div className="menu__right">
                        <a className="menu__link link" href="https://github.com/Yuriy-Karpov/react-just-carousel">GitHub</a>
                        <a className="menu__link link" href="#example">Example</a>
                        <a className="menu__link link" href="#example">Doc</a>
                        <a className="menu__link link" href="#example">Download</a>
                    </div>
                </menu>
                <h1 className="title">React Just Carousel</h1>
                <p className="sub-title">This is a pure react carousel, without dependencies, without jquery, not a
                    mixer-combine, without unnecessary functions, it is not a slider, the carousel does not know how to
                    make coffee and bring Slippers :) </p>
                <p className="sub-title">This is a carousel, written in typescript for react, has a very small weight,
                    supports touch, fully
                    responsive, supports content of different heights and widths, an infinite loop, and other functions
                    that are necessary for the carousel.</p>
                <button onClick={onClick}>button</button>
                <div className="Carousel-wrap">
                    <JustCarousel stepMove={num}>
                        {testData.map((item, i) => (
                            <SlideHeader key={item.title} title={i + 1}/>
                        ))}
                    </JustCarousel>
                </div>
            </header>
            <section id="example" className="secondLine">
                <div className="container">
                    <h3>Carousel can work with blocks of different width and height</h3>
                    <div className="carousel-variant-2">
                        <JustCarousel marginBlock={10}>
                            {testData.map((item, i) => (
                                <ItemBlock key={item.title} title={item.title} width={item.width}/>
                            ))}
                        </JustCarousel>
                    </div>
                    <CustomBtnBlock/>
                    <InstallBlock id={"install"}/>
                </div>
            </section>
            <footer className={"footer"}>

            </footer>
        </div>
    );
}



export default App;
