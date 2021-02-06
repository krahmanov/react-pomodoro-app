import React, { useState, useRef } from "react";

// Simple helper function
const padTime = (time) => {
  return time.toString().padStart(2, "0");
};

const App = () => {
  // States
  const [title, setTitle] = useState("Pomodoro!");
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef(null)

  // Functions
  const startTimer = () => {
    if (intervalRef.current !== null) return
    setIsRunning(true)

    setTitle("Good fortune favors the daring")
    intervalRef.current = setInterval(() => {
      setTimeLeft(timeLeft => {
        if (timeLeft >= 1) return timeLeft - 1

        resetTimer()
        return 0
      });
    }, 1000);
  };

  const stopTimer=()=>{
    if (intervalRef.current === null) return

    setIsRunning(false)
    clearInterval(intervalRef.current)
    intervalRef.current = null
    setTitle('If you do not like how things are, change them')
  }

  const resetTimer =()=>{
    clearInterval(intervalRef.current)

    setIsRunning(false)
    intervalRef.current = null
    setTitle("It always seems impossible until it's done")
    setTimeLeft(25 * 60)
  }

  // Computed
  const minutes = padTime(Math.floor(timeLeft / 60));
  const seconds = padTime(timeLeft - minutes * 60);

  return (
    <div className="app">
      <h2>{title}</h2>

      <div className="timer">
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>

      <div className="buttons">
        {!isRunning && <button onClick={startTimer}>Start</button>}
        {isRunning && <button onClick={stopTimer}>Stop</button>}
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
};

export default App;
