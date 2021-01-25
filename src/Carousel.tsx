import * as React from 'react';
import {sideEnum} from './const';

import './styles.css';
import {Slide} from './components/Slide';
import {IElementSizeType, IOptions, sideEnumType} from './type';
import {MoveController} from './utils/moveController';
import {CarouselView} from './components/CarouselView';
import {Button} from './components/ButtonCarousel';
import {useTouchAndMouse} from './hooks/useTouchAndMouse';


export const JustCarousel: React.FC<IOptions> = (
    {
        children,
        renderLeftButton,
        renderRightButton,
        isRelative = true,
        marginBlock = 0,
        onMoveSlide
    }) => {
    const countChildren = React.Children.count(children);
    const elementSize: React.MutableRefObject<IElementSizeType> = React.useRef({});
    const refCarousel = React.useRef(null);
    const refSlideBox = React.useRef(null);
    const calcOffset = React.useRef(0);
    const moveController = React.useRef<MoveController>();

    const handleWindowResize = React.useCallback(() => {
        if (moveController.current) {
            moveController.current.calculateResize(refCarousel.current, elementSize.current, marginBlock);
        }
    }, []);

    React.useEffect(() => {
        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        }
    }, []);

    const move = React.useCallback((side: sideEnumType) => {
        if (!moveController.current) {
            moveController.current = new MoveController(refCarousel.current, elementSize.current, marginBlock);
        }
        const {offset, isLeftEnd, isRightEnd, offsetCount} = moveController.current.calculate(side, countChildren, marginBlock);
        calcOffset.current = offset;
        if (onMoveSlide) {
            onMoveSlide({
                side,
                isLeftEnd,
                isRightEnd,
                offsetCount,
            });
        }
        window.requestAnimationFrame(() => {
            refSlideBox.current.style.transform = `translateX(${calcOffset.current}px)`
        });

    }, [countChildren, onMoveSlide]);

    const handleRight = React.useCallback(() => {
        move(sideEnum.RIGHT);
    }, [move]);
    const handleLeft = React.useCallback(() => {
        move(sideEnum.LEFT);
    }, [move]);


    /**
     * ********** onTouchMove ********** *
     */
    useTouchAndMouse({
        refCarousel,
        countChildren,
        moveController,
        calcOffset,
        refSlideBox,
        elementSize,
        marginBlock,
        onMoveSlide
    });

    if (!children) {
        return null;
    }
    return (
        <CarouselView
            marginBlock={marginBlock}
            refCarousel={refCarousel}
            refSlideBox={refSlideBox}
            leftButton={<Button handle={handleLeft} customRender={renderLeftButton} side={sideEnum.LEFT}/>}
            rightButton={<Button handle={handleRight} customRender={renderRightButton} side={sideEnum.RIGHT}/>}
            isRelative={isRelative}
        >
            {React.Children.map(children, (child, i) => {
                return (
                    <Slide id={i} data={child} refSize={elementSize.current} marginBlock={marginBlock}/>
                );
            })}
        </CarouselView>
    );
};

