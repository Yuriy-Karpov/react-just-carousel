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
## Props:

| Property          | Required |    Type           | Default  |  Description               | 
|-------------------|:--------:|:-----------------:|:--------:|:---------------------------|
| renderLeftButton  | no       | React.ReactNode   | null     | Custom render button left  |
| renderRightButton | no       | React.ReactNode   | null     | Custom render button right |
| isRelative        | no       | boolean           | true    | Disabling relative wrappers for buttons, only for custom render button |
| marginBlock       | no       | number            | 0       | You can make your own indents between slides in css and not use this property, but you can use this property, thanks to this property, the slips of the extreme slides will be "eaten", if there are no complex design ideas, I advise you to use this property for the margin between slides. |
| onMoveSlide       | no       | (arg0: IMoveSlideEvent) => void; | null    | it is triggered every time the slide is switched and returns an object with the following content as a parameter for the callback function: IMoveSlideEvent |
| stepMove          | no       | number | 1    |  by how many slides to flip through |
| deadZoneTouchX          | no       | number | 5    | for fine-tuning touch events, dead zones when no events are processed |
| deadZoneTouchY          | no       | number | 5    | for fine-tuning touch events, dead zones when no events are processed |


### IMoveSlideEvent
| Property   |  type        | Description |
|------------|:------------:|:-----------:|
| side       | sideEnumType | the direction of the carousel, enum 'left' or 'right'|
| isLeftEnd  | boolean      | end of the carousel to the left |
| isRightEnd | boolean      | end of the carousel to the right |
| offsetCount| number       | offset of the number of slides  |
