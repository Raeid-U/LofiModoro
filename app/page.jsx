"use client";
import React, { useEffect, useState } from "react";
import TimerTab from "../components/TimerTab";
import Timer from "../components/Timer";
import Log from "../components/Log";
import MusicPlayer from "../components/MusicPlayer";
import { FaHistory } from "react-icons/fa";
import { supabase } from "../lib/supabase";

const timers = [
  {
    name: "Pomodoro Sprint",
    duration: 25,
    bg: "bg-pomodoro",
    category: "work",
  },
  {
    name: "Small Break",
    duration: 5,
    bg: "bg-small-break",
    category: "small_break",
  },
  {
    name: "Long Break",
    duration: 15,
    bg: "bg-long-break",
    category: "long_break",
  },
];

export default function Home() {
  const [selectedTimer, setSelectedTimer] = useState(timers[0]);
  const [isLogOpen, setIsLogOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [runStartUtc, setRunStartUtc] = useState(null);

  useEffect(() => {
    let mounted = true;
    supabase.auth
      .getUser()
      .then(({ data }) => mounted && setUser(data?.user ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const openLog = () => setIsLogOpen(true);
  const closeLog = () => setIsLogOpen(false);

  const handleStart = () => {
    if (!runStartUtc) setRunStartUtc(Date.now());
  };

  const logSprint = async ({ endUtc, category }) => {
    if (!user) {
      setIsLogOpen(true);
      return;
    }
    if (!runStartUtc || !endUtc) return;
    const { error } = await supabase.from("sprints").insert({
      user_id: user.id,
      category,
      start_time_utc: runStartUtc,
      end_time_utc: endUtc,
    });
    if (error) console.error("Failed to insert sprint:", error);
  };

  const handleComplete = async () => {
    await logSprint({ endUtc: Date.now(), category: selectedTimer.category });
    setRunStartUtc(null);
  };
  const handleStopEarly = async () => {
    await logSprint({ endUtc: Date.now(), category: selectedTimer.category });
    setRunStartUtc(null);
  };
  const handleAbandon = () => setRunStartUtc(null);

  const canSwitch = runStartUtc == null;

  return (
    <div className={`page-shell ${selectedTimer.bg}`}>
      <div className="w-full max-w-5xl grid gap-6 lg:grid-cols-2">
        {/* Left: Timer panel */}
        <div className="panel panel-wide">
          {/* Header row fixes overlap: tabs on left, icon on right */}
          <div className="panel-header">
            <div className="flex flex-wrap space-x-4 overflow-x-scroll">
              {timers.map((t) => (
                <TimerTab
                  key={t.name}
                  timer={t}
                  isSelected={selectedTimer.name === t.name}
                  onClick={() => {
                    if (canSwitch) setSelectedTimer(t);
                  }}
                />
              ))}
            </div>
            <button
              className="text-neutral-300 hover:text-white"
              onClick={openLog}
              aria-label={
                user ? "View your sprint history" : "Log in to view history"
              }
              title={
                user ? "View your sprint history" : "Log in to view history"
              }
            >
              <FaHistory size={20} />
            </button>
          </div>

          {/* Timer */}
          <Timer
            timer={selectedTimer}
            onStart={handleStart}
            onComplete={handleComplete}
            onStopEarly={handleStopEarly}
            onAbandon={handleAbandon}
            disableSwitchHint={!canSwitch}
          />
        </div>

        {/* Right: Music / player panel */}
        <div className="panel panel-narrow">
          <MusicPlayer />
        </div>
      </div>

      {isLogOpen && <Log onClose={closeLog} user={user} />}
    </div>
  );
}
