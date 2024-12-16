import React, { useEffect, useState, useRef } from "react";
import { NoInternetView } from "@/components/common/no-internet-indicator";
import { LoadingView } from "@/components/common/loading-view";
import useInternetStatus from "@/hooks/use-internet-status"; // Custom hook for checking internet status

interface WithLoadingAndErrorProps {
    isLoadingData: boolean;
    isError: boolean;
    refetch: () => Promise<void>;
    minimumLoadingTime?: number; // Optional: Customize minimum loading time
}

const withLoadingAndError = <P extends object>(
    WrappedComponent: React.ComponentType<P>,
): React.FC<P & WithLoadingAndErrorProps> => {
    const HOC: React.FC<P & WithLoadingAndErrorProps> = ({
        isLoadingData,
        isError,
        refetch,
        minimumLoadingTime = 500, // Default to 500ms
        ...props
    }) => {
        const isConnected = useInternetStatus(); // Use the custom hook
        const [isRetrying, setIsRetrying] = useState<boolean>(false);
        const [showLoading, setShowLoading] = useState<boolean>(false);
        const loadingStartRef = useRef<number | null>(null);
        let timeoutId: NodeJS.Timeout;

        // Handle loading display with a minimum duration
        useEffect(() => {
            if (isLoadingData) {
                if (loadingStartRef.current === null) {
                    loadingStartRef.current = Date.now();
                }
                setShowLoading(true);
            } else if (showLoading && loadingStartRef.current !== null) {
                const elapsed = Date.now() - loadingStartRef.current;
                if (elapsed < minimumLoadingTime) {
                    timeoutId = setTimeout(() => {
                        setShowLoading(false);
                        loadingStartRef.current = null;
                    }, minimumLoadingTime - elapsed);
                } else {
                    setShowLoading(false);
                    loadingStartRef.current = null;
                }
            }

            return () => {
                if (timeoutId) clearTimeout(timeoutId);
            };
        }, [isLoadingData, showLoading, minimumLoadingTime]);

        // Retry handler with controlled loading state
        const handleRetry = async () => {
            setIsRetrying(true);
            try {
                await refetch();
            } catch (error) {
                console.error("Error during retry:", error);
            } finally {
                setIsRetrying(false);
            }
        };

        if (showLoading) {
            return <LoadingView message="Loading data..." />;
        }

        if (isRetrying) {
            return <LoadingView message="Retrying..." />;
        }

        if (isError || !isConnected) {
            return (
                <NoInternetView
                    isConnected={isConnected}
                    hasError={isError}
                    errorMessage={
                        !isConnected
                            ? "You’re offline. Check your internet connection and try again."
                            : "Failed to load data. Please try again."
                    }
                    onRetry={handleRetry}
                />
            );
        }

        return <WrappedComponent {...(props as P)} />;
    };

    return HOC;
};

export { withLoadingAndError };
