import { Settings } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import ElectricBorder from "./ElectricBorder";
const DEFAULT_MODES = [
  { label: "Pomodoro", duration: 25 * 60 },
  { label: "Short Break", duration: 5 * 60 },
];

const PomodoroTimer = () => {
  const [modes, setModes] = useState(DEFAULT_MODES);
  const [mode, setMode] = useState(0);
  const [timeLeft, setTimeLeft] = useState(modes[0].duration);
  const [isActive, setIsActive] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [tempPomodoro, setTempPomodoro] = useState(25);
  const [tempShortBreak, setTempShortBreak] = useState(5);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [sessionCount, setSessionCount] = useState(1);

  useEffect(() => {
    setTimeLeft(modes[mode].duration);
    setIsActive(false);
  }, [mode, modes]);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      if (mode === 0) {
        setSessionCount((c) => c + 1);
        setMode(1);
      } else {
        setMode(0);
      }
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, timeLeft, mode]);

  const handleModeChange = (idx: number) => {
    setMode(idx);
    setTimeLeft(modes[idx].duration);
    setIsActive(false);
  };

  const toggleTimer = () => {
    setIsActive((a) => !a);
    setChaos((prev) => !prev);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(modes[mode].duration);
    if (mode === 0) setSessionCount(1);
    setChaos(false);
  };

  const saveSettings = () => {
    const newModes = [
      { label: "Pomodoro", duration: tempPomodoro * 60 },
      { label: "Short Break", duration: tempShortBreak * 60 },
    ];
    setModes(newModes);
    setTimeLeft(newModes[mode].duration);
    setShowSettings(false);
  };

  const cancelSettings = () => {
    setTempPomodoro(Math.floor(modes[0].duration / 60));
    setTempShortBreak(Math.floor(modes[1].duration / 60));
    setShowSettings(false);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };
  const [Chaos, setChaos] = useState(false);

  return (
    <div className="align-center ">
      <div className="min-h-auto min-w-120 mt-25 flex items-center justify-center bg-background relative">
        <ElectricBorder
          color="#34D399"
          speed={Chaos == false ? 0 : 2}
          chaos={Chaos == false ? 0 : 1.5}
          thickness={Chaos == false ? 0 : 4}
          style={{ borderRadius: Chaos == false ? 1 : 20 }}
        >
          <div className="bg-card min-w-120 bg-opacity-95 rounded-2xl px-8 pt-10 pb-6 shadow-lg max-w-md w-full flex flex-col items-center border border-border">
            <div>
              <div className="flex  justify-evenly gap-2 w-full mb-6">
                {modes.map((m, idx) => (
                  <button
                    key={m.label}
                    className={`px-4 py-1.5 rounded-md text-lg transition font-medium focus:outline-none ${
                      mode === idx
                        ? "bg-green-600 text-white opacity-100 font-semibold"
                        : "bg-transparent text-muted-foreground opacity-70 hover:text-muted-foreground hover:bg-green-50"
                    }`}
                    onClick={() => handleModeChange(idx)}
                    tabIndex={0}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
              <button
                className="absolute right-10 top-4 text-muted-foreground hover:text-foreground focus:outline-none"
                onClick={() => setShowSettings(true)}
              >
                <Settings />
              </button>
            </div>

            <div className="text-foreground text-[6rem] font-bold mb-6 tracking-widest select-none">
              {formatTime(timeLeft)}
            </div>

            <div className="flex gap-5 mb-5">
              <button
                className="bg-green-600 hover:bg-green-700  active:bg-green-800 text-white rounded-lg text-2xl font-semibold px-10 py-3 shadow-md transition focus:outline-none focus:ring-2 focus:ring-green-500"
                onClick={toggleTimer}
              >
                {isActive ? "Pause" : "Start"}
              </button>
              <button
                className="bg-green-100 hover:bg-green-200 active:bg-green-300 text-green-800 border border-green-300 rounded-lg text-2xl font-semibold px-10 py-3 shadow-md transition focus:outline-none focus:ring-2 focus:ring-green-500"
                onClick={resetTimer}
              >
                Reset
              </button>
            </div>
            <div className="text-foreground text-center mb-5">
              <div className="text-lg mt-1">
                {mode === 0 ? "Time to focus!" : "Take a break!"}
              </div>
            </div>
          </div>
        </ElectricBorder>
      </div>

      {showSettings && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-lg p-6 max-w-md w-full mx-4 shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-foreground">Settings</h2>
              <button
                onClick={() => setShowSettings(false)}
                className="text-muted-foreground hover:text-foreground transition-colors text-xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-muted-foreground">
                  Pomodoro (minutes):
                </label>
                <input
                  type="number"
                  value={tempPomodoro}
                  onChange={(e) => setTempPomodoro(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  min="1"
                  max="60"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-muted-foreground">
                  Short Break (minutes):
                </label>
                <input
                  type="number"
                  value={tempShortBreak}
                  onChange={(e) => setTempShortBreak(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  min="1"
                  max="30"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={saveSettings}
                  className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                >
                  Save
                </button>
                <button
                  onClick={cancelSettings}
                  className="flex-1 bg-muted text-muted-foreground px-4 py-2 rounded-md hover:bg-muted/80 focus:outline-none focus:ring-2 focus:ring-border transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PomodoroTimer;
