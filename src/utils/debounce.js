export function debounce(callback, delay) {
    let timer;

    function debounced(...args) {
        clearTimeout(timer);

        timer = setTimeout(() => {
            callback(...args);
        }, delay);
    }

    // Cancel a pending function call
    debounced.cancel = () => {
        clearTimeout(timer);
        timer = null;
    };

    return debounced;
}
