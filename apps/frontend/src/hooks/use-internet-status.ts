import { useState, useEffect } from "react";

const useInternetStatus = (pingUrl = "https://google.com/", interval = 5000) => {
    const [isConnected, setIsConnected] = useState<boolean>(true);

    useEffect(() => {
        let isMounted = true;

        const checkInternetConnection = async () => {
            try {
                const response = await fetch(pingUrl, {
                    method: "HEAD",
                    cache: "no-cache",
                });
                if (isMounted) {
                    setIsConnected(response.ok);
                }
            } catch {
                if (isMounted) {
                    setIsConnected(false);
                }
            }
        };

        // Initial check
        // checkInternetConnection();

        // Set up periodic checks
        // const intervalId = setInterval(checkInternetConnection, interval);

        return () => {
            isMounted = false;
            // clearInterval(intervalId);
        };
    }, [pingUrl, interval]);

    return isConnected;
};

export default useInternetStatus;
