import { useEffect, useState } from "react";

/**
 * Hook to manage retry countdown logic.
 * @param nextAllowedAttempt - Timestamp for the next allowed attempt.
 * @returns An object containing `countdown` and a boolean `isDisabled`.
 */
export const useRetryCountdown = (nextAllowedAttempt: number) => {
    const [countdown, setCountdown] = useState<number>(0);

    useEffect(() => {
        const calculateCountdown = () => {
            const waitTime = Math.max(0, Math.ceil((nextAllowedAttempt - Date.now()) / 1000));
            setCountdown(waitTime);
        };

        calculateCountdown(); // Initial calculation

        // Update the countdown every second
        const interval = setInterval(() => {
            calculateCountdown();
        }, 1000);

        return () => clearInterval(interval); // Clean up the interval
    }, [nextAllowedAttempt]);

    return {
        countdown,
        isDisabled: countdown > 0, // Button should be disabled if countdown is active
    };
};
