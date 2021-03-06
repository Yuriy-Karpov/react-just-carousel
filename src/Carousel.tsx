import * as React from 'react';
import {sideEnum} from './const';

import './styles.css';
import {Slide} from './components/Slide';
import {IElementSizeType, IOptions, sideEnumType} from './type';
import {MoveController} from './utils/moveController';
import {CarouselView} from './components/CarouselView';
import {Button} from './components/ButtonCarousel';
import {useTouchMove} from './hooks/useTouchMove';
import {useMouseMove} from './hooks/useMouseMove';
import {transformAnimation} from './utils/animations';


export const JustCarousel: React.FC<IOptions> = (
    {
        children,
        renderLeftButton,
        renderRightButton,
        isRelative = true,
        marginBlock = 0,
        onMoveSlide,
        stepMove = 1,
        deadZoneTouchX = 5,
        deadZoneTouchY = 5,
    }) => {
    const countChildren = React.Children.count(children);
    const elementSize: React.MutableRefObject<IElementSizeType> = React.useRef({});
    const refCarousel = React.useRef<HTMLInputElement>(null);
    const refSlideBox = React.useRef(null);
    const calcOffset = React.useRef(0);
    const moveController = React.useRef<MoveController>();

    const handleWindowResize = React.useCallback(() => {
        if (moveController.current) {
            const offset = moveController.current.calculateResize(refCarousel.current, elementSize.current, marginBlock);
            transformAnimation(refSlideBox.current, offset);
        }


    }, [marginBlock, children]);

    React.useEffect(() => {
        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        }
    }, [marginBlock, children]);

    const move = React.useCallback((side: sideEnumType) => {
        if (!moveController.current) {
            moveController.current = new MoveController(refCarousel.current, elementSize.current, marginBlock);
        }
        const {offset, isLeftEnd, isRightEnd, offsetCount} = moveController.current.calculate(side, countChildren, marginBlock, stepMove);
        calcOffset.current = offset;
        if (onMoveSlide) {
            onMoveSlide({
                side,
                isLeftEnd,
                isRightEnd,
                offsetCount,
            });
        }
        transformAnimation(refSlideBox.current, calcOffset.current);

    }, [countChildren, onMoveSlide, stepMove, marginBlock]);

    const handleRight = React.useCallback(() => {
        move(sideEnum.RIGHT);
    }, [move, stepMove, marginBlock]);
    const handleLeft = React.useCallback(() => {
        move(sideEnum.LEFT);
    }, [move, stepMove, marginBlock]);


    /**
     * ********** onTouchMove ********** *
     */

    useTouchMove({
        refCarousel,
        countChildren,
        moveController,
        calcOffset,
        refSlideBox,
        elementSize,
        marginBlock,
        onMoveSlide,
        stepMove,
        deadZone: {
            x: deadZoneTouchX,
            y: deadZoneTouchY
        },
    });

    useMouseMove({
        refCarousel,
        countChildren,
        moveController,
        calcOffset,
        refSlideBox,
        elementSize,
        marginBlock,
        onMoveSlide,
        stepMove,
        deadZone: {
            x: deadZoneTouchX,
            y: deadZoneTouchY
        },
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

