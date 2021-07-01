export const transformAnimation = (target: HTMLInputElement, px: number) => {
    window.requestAnimationFrame(() => {
        target.style.transform = `translateX(${px}px)`
    });
};
