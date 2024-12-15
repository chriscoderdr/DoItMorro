function debounce(func: (...args: any[]) => void, delay: number) {
    let timer: NodeJS.Timeout;
    const debounced = (...args: any[]) => {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), delay);
    };
    debounced.cancel = () => clearTimeout(timer); // Add cancel method
    return debounced;
}

export { debounce };
