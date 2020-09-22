import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Carousel} from 'react-just-carousel';

const testData = [
    {title: 'slide#1', width: 150},
    {title: 'slide#2', width: 160},
    {title: 'slide#3', width: 100},
    {title: 'slide#4', width: 200},
    {title: 'slide#5', width: 180},
    {title: 'slide#6', width: 120},
    {title: 'slide#7', width: 230},
    {title: 'slide#8', width: 150},
    {title: 'slide#10', width: 100},
    {title: 'slide#11', width: 60},
    {title: 'slide#12', width: 180},
    {title: 'slide#13', width: 210}
];

function App() {
    return (
        <div className="App">
            {/*<header className="App-header">*/}
            {/*    <img src={logo} className="App-logo" alt="logo"/>*/}
            {/*</header>*/}
            <div className="Container">
                <Carousel>
                    {testData.map((item, i) => (
                        <ItemBlock key={i} title={item.title} width={item.width}/>
                    ))}
                </Carousel>
            </div>
        </div>
    );
}

function ItemBlock({title, width}) {
    return (
        // <div className="ItemBlock" style={{width}}>
        <div className="ItemBlock" >
            <span className="ItemBlock-title">{title}</span>
            <img src={logo} className="ItemBlock-logo" alt="logo"/>
        </div>
    );
}


export default App;
