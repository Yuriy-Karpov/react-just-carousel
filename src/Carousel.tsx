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

    const [offset, setOffset] = React.useState(0);

    const elementSize: React.MutableRefObject<IElementSizeType> = React.useRef({});
    const refCarousel = React.useRef(null);
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

        setOffset(moveController.current.calculate(side, countChildren));
    }, []);

    const handleRight = React.useCallback(() => {
        move(sideEnum.RIGHT);
    }, []);
    const handleLeft = React.useCallback(() => {
        move(sideEnum.LEFT);
    }, []);

    const slideBoxOffset = React.useMemo(() => ({
        transform: `translateX(${offset}px)`
    }), [offset]);

    if (!children) {
        return null;
    }

    return (
        <CarouselView
            refCarousel={refCarousel}
            slideBoxOffset={slideBoxOffset}
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

