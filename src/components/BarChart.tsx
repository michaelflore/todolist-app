import { useState, useEffect } from 'react';

export function BarChart() {

    const [theTimer, setTheTimer] = useState<number | null>(null);
    const [goal] = useState(10);
    const [points, setPoints] = useState(0);
    const [going, setGoing] = useState(false);
    const [resetTimerBtn, setResetTimerBtn] = useState(true);

    console.log(theTimer)

    const addPoints = () => {
        setPoints(points => points + 1);
    }

    const startTimer = () => {

        const timer = window.setInterval(() => {
            addPoints();
        }, 1000);

        setTheTimer(timer);

        setGoing(true);
        setResetTimerBtn(false);
    }

    const stopTimer = () => {

        setTheTimer(theTimer => {
            if(theTimer !== null) {
                clearInterval(theTimer);
            }

            return null;
        });

        setGoing(false);
    }

    const resetTimer = () => {
        setPoints(0);
        stopTimer();
        setResetTimerBtn(true);
    }

    const resetPoints = () => {
        setPoints(0);
    }

    useEffect(() => {

        if(points === 10) {
            stopTimer();
        }
        
    }, [points]);

    useEffect(() => {
        startTimer();

        return () => {
            stopTimer();
        }
    }, []);

    const contStyle = {
        height: `100px`,
        backgroundColor: 'black'
    };

    const barStyle = {
        width: '10px',
        height: `${points}0px`,
        backgroundColor: 'green',
        margin: 'auto'
    };

    return (
        <div>
            <h1>BarChart</h1>
            <p>
                Goal: {goal} points
            </p>
            {
                (points === goal) ? (
                    <div>GOAL!</div>
                ) : (
                    <p>
                        Total Points: {points} points
                    </p>
                )
            }
            <div style={contStyle}>
                <div style={barStyle}></div>
            </div>
            <div>
                {
                    (points < goal) ? (
                        <div>
                            <button
                                onClick={addPoints}
                            >
                                Add points
                            </button>
                            <button
                                onClick={startTimer}
                            >
                                Start Timer
                            </button>
                            <button
                                disabled={going === false}
                                onClick={stopTimer}
                            >
                                Stop Timer
                            </button>
                            <button
                                disabled={resetTimerBtn}
                                onClick={resetTimer}
                            >
                                Reset Timer
                            </button>
                        </div>
                    ) : (
                        <div>
                            <button
                                onClick={resetPoints}
                            >
                                Reset Points
                            </button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default BarChart;
