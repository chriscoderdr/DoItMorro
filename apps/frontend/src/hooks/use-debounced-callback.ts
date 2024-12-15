import { useRef, useCallback } from "react";

function useDebouncedCallback<T extends (...args: any[]) => void>(callback: T, delay: number): T {
    const timer = useRef<NodeJS.Timeout | null>(null);

    const debouncedFunction = useCallback(
        (...args: Parameters<T>) => {
            if (timer.current) {
                clearTimeout(timer.current);
            }
            timer.current = setTimeout(() => {
                callback(...args);
            }, delay);
        },
        [callback, delay],
    );

    return debouncedFunction as T;
}

export default useDebouncedCallback;
