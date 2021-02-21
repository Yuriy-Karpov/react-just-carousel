export function debounce(func: Function, wait:number, immediate: boolean = false): Function {
    let timeout: null|number;
    return function executedFunction() {
        // @ts-ignore
        const context = this;
        const args = arguments;

        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };

        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}
