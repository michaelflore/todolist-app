import { useEffect, useState } from "react";

function BatteryStatus() {
    const [isCharging, setIsCharging] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {

        let cleanup: undefined | (() => void);

        (
            async () => {
                try {
                    const battery = await (navigator as any).getBattery();

                    function batteryChangeHandler() {
                        setIsCharging(battery.charging);
                    }

                    batteryChangeHandler();

                    battery.addEventListener("chargingchange", batteryChangeHandler);

                    cleanup = () => battery.removeEventListener("chargingchange", batteryChangeHandler);

                } catch (e) {
                    console.error(e)
                    setError(true);
                }
            }
        )();

        return () => {
            if(cleanup) {
                cleanup();
            }

        };

    }, []);

    return (
        <div>
            Battery is charging: {isCharging ? "yes" : "no"}
            {
                error && (
                    <p>{"There was an error."}</p>
                )
            }
        </div>
    )
}

export default BatteryStatus;
