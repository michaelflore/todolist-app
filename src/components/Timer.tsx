import { useEffect, useState } from "react";

function Timer() {
    const [time, setTime] = useState(0);
    const [inter, setInter] = useState(1000);

    useEffect(() => {

        const int = setInterval(() => {
            setTime(time => time + 1);
        }, inter);

        return () => {
            clearInterval(int);
        };

    }, [inter]);

    const addInt = () => {
        setInter(inter => inter + 100);
    }

    const subInt = () => {
        setInter(inter => inter - 100);
    }

    return (
        <div>
            <h2>Timer {time} seconds</h2>
            <button onClick={addInt}>Add</button>
            <button onClick={subInt}>Decrease</button>
        </div>
    )
}

export default Timer;
