# react-carousel
This pure react carousel, without depending

This is a pure react carousel, without dependencies, without jquery, not a mixer-combine, without unnecessary functions, it is not a slider, the carousel does not know how to make coffee and bring Slippers :)

This is a carousel, written in typescript for react, has a very small weight, supports touch, fully responsive, supports content of different heights and widths, an infinite loop, and other functions that are necessary for the carousel.



## Installation
```
npm install react-just-carousel
// or 
yarn react-just-carousel
```

## Usage
#### React Component:
```
<div> 
    <Carousel>
        {testData.map((item, i) => (
             <ItemBlock key={i}/>
        ))}
    </Carousel>
</div>
```

### Style css:
```
import 'react-just-carousel/dist/styles.css'; // base style
```
##Props:

| Property          |    Type           | Default  |  Description               | 
|-------------------|:-----------------:|:--------:|:---------------------------|
| renderLeftButton  | React.ReactNode   | null     | Custom render button left  |
| renderRightButton | React.ReactNode   | null     | Custom render button right |
| isRelative        | boolean           | true    | disabling relative wrappers for buttons, only for custom render button |

