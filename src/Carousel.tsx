import * as React from 'react';
import {sideEnum} from './const';

import './styles.css';
import {Slide} from './components/Slide';
import {IElementSizeType, IOptions, sideEnumType} from './type';
import {MoveController} from './utils/moveController';
import {CarouselView} from './components/CarouselView';
import {Button} from './components/ButtonCarousel';


export const JustCarousel: React.FC<IOptions> = ({
    children,
    renderLeftButton,
    renderRightButton,
    isRelative = true,
}) => {
    const countChildren = React.Children.count(children);

    const elementSize: React.MutableRefObject<IElementSizeType> = React.useRef({});
    const refCarousel = React.useRef(null);
    const refSlideBox = React.useRef(null);
    const calcOffset = React.useRef(0);
    const moveController = React.useRef<MoveController>();

    const handleWindowResize = React.useCallback(() => {
        if (moveController.current) {
            moveController.current.calculateResize(refCarousel.current, elementSize.current);
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
            moveController.current = new MoveController(refCarousel.current, elementSize.current);
        }

        calcOffset.current = moveController.current.calculate(side, countChildren);
        //тут добавить тротлинг, или задержку и сумирование "нажатей" пользователя
        window.requestAnimationFrame(() => {
            refSlideBox.current.style.transform = `translateX(${calcOffset.current}px)`
        });

    }, []);

    const handleRight = React.useCallback(() => {
        move(sideEnum.RIGHT);
    }, []);
    const handleLeft = React.useCallback(() => {
        move(sideEnum.LEFT);
    }, []);

    /**
     * ********** onTouchMove ********** *
     * вытащить в отдельную хуку
     */
    const firstFinger = 0;
    const touchStart = React.useRef(null);
    const touchSide = React.useRef<null|sideEnumType>(null);
    const onTouchMove = React.useCallback((e) => {
        switch (e.type) {
            case 'touchstart': {
                touchStart.current = e.touches[firstFinger].screenX;
                break;
            }
            case 'touchmove': {
                e.stopPropagation();
                const moveX = touchStart.current - e.touches[firstFinger].screenX;
               if (!touchSide.current && moveX >= 15) {
                   touchSide.current = sideEnum.RIGHT;
                   // надо убрать анимацию с последнего элемента
                   const moveOffset = calcOffset.current - 50;
                   window.requestAnimationFrame(() => {
                       refSlideBox.current.style.transform = `translateX(${moveOffset}px)`
                   });
               }
               if (!touchSide.current && moveX <= -15) {
                   touchSide.current = sideEnum.LEFT;
                   const moveOffset = calcOffset.current !== 0 ? calcOffset.current + 50 : calcOffset.current;
                   window.requestAnimationFrame(() => {
                       refSlideBox.current.style.transform = `translateX(${moveOffset}px)`
                   });
               }
                break;
            }
            case 'touchend': {
                if (touchSide.current) {
                    if (!moveController.current) {
                        // это надо исправить
                        moveController.current = new MoveController(refCarousel.current, elementSize.current);
                    }

                    calcOffset.current = moveController.current.calculate(touchSide.current, countChildren);
                    touchSide.current = null;
                    window.requestAnimationFrame(() => {
                        refSlideBox.current.style.transform = `translateX(${calcOffset.current}px)`
                    });
                }
                break;
            }
            case 'touchcancel':
            default: {
                if (touchSide.current) {
                    touchSide.current = null;
                    refSlideBox.current.style.transform = `translateX(${calcOffset.current}px)`
                }
                break;
            }

        }
    }, []);


    if (!children) {
        return null;
    }
    console.log('RE-RENDER');
    return (
        <CarouselView
            onTouchMove={onTouchMove}
            refCarousel={refCarousel}
            refSlideBox={refSlideBox}
            leftButton={<Button handle={handleLeft} customRender={renderLeftButton} side={sideEnum.LEFT}/>}
            rightButton={<Button handle={handleRight} customRender={renderRightButton} side={sideEnum.RIGHT}/>}
            isRelative={isRelative}
        >
            {React.Children.map(children, (child, i) => {
                return (
                    <Slide id={i} data={child} refSize={elementSize.current}/>
                );
            })}
        </CarouselView>
    );
};

