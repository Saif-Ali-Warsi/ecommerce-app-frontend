import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

function generateDealDuration() {
  // const hours = Math.floor(Math.random() * 10) + 1;
  // return hours * 60 * 60 * 1000;
  return 120 * 1000;
}

const DAY_MS = 60 * 100;
const PAUSE_DURATION_MS = 60 * 1000;
const DEAL_STORAGE_KEY = "dealSchedule";

function getDealSchedule() {
  try {
    const savedSchedule = localStorage.getItem(DEAL_STORAGE_KEY);

    if (savedSchedule) {
      const schedule = JSON.parse(savedSchedule);

      if (
        typeof schedule.cycleStart === "number" &&
        typeof schedule.durationMs === "number" &&
        Number.isFinite(schedule.cycleStart) &&
        Number.isFinite(schedule.durationMs) &&
        schedule.durationMs >= 60 * 60 * 1000 &&
        schedule.durationMs <= 10 * 60 * 60 * 1000
      ) {
        return schedule;
      }
    }
  } catch {
    // Saved data is invalid; create a fresh schedule.
  }

  const schedule = {
    cycleStart: Date.now(),
    durationMs: generateDealDuration(),
  };

  localStorage.setItem(DEAL_STORAGE_KEY, JSON.stringify(schedule));

  return schedule;
}

type DealOfTheDayProps = {
  children: ReactNode;
};

// Fixed: Only destructure `children` from props
function DealOfTheDay({ children }: DealOfTheDayProps) {
  const [schedule, setSchedule] = useState(getDealSchedule);
  const [now, setNow] = useState(Date.now());
  const rolloverInProgress = useRef(false);

  const remainingMs = Math.max(
    0,
    schedule.cycleStart + schedule.durationMs - now,
  );

  // Calculated internally
  const hours = Math.floor(remainingMs / (60 * 60 * 1000));
  const minutes = Math.floor((remainingMs % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((remainingMs % (60 * 1000)) / 1000);

  const isDealActive = now < schedule.cycleStart + schedule.durationMs;

  useEffect(() => {
    const timerId = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  useEffect(() => {
    const nextDealStart =
      schedule.cycleStart + schedule.durationMs + PAUSE_DURATION_MS;

    if (now < nextDealStart) {
      return;
    }

    if (rolloverInProgress.current) {
      return;
    }

    rolloverInProgress.current = true;

    const newSchedule = {
      cycleStart: nextDealStart,
      durationMs: generateDealDuration(),
    };

    localStorage.setItem(DEAL_STORAGE_KEY, JSON.stringify(newSchedule));

    setSchedule(newSchedule);
    rolloverInProgress.current = false;
  }, [now, schedule]);

  if (!isDealActive) {
    return null;
  }

  return (
    <section className="bg-[#191C24] p-6 sm:p-8 rounded-3xl shadow-[-8px_-8px_20px_#222631,8px_8px_20px_#101217] max-w-3xl mx-auto border-0">
      {/* Header Badge */}
      <div className="text-center mb-6">
        <div className="inline-block px-4 py-1.5 bg-[#191C24] text-[#d9a79c] text-xs font-extrabold uppercase tracking-widest rounded-full shadow-[inset_2px_2px_5px_#101217,inset_-2px_-2px_5px_#222631]">
          Deal of the Day
        </div>
      </div>

      {/* Responsive Grid: 1 column on mobile, 2 columns on medium screens and up */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Children content split into left and right inside parent usage */}
        {children}

        {/* Countdown Timer (Spans full width across columns at the bottom) */}
        <div className="md:col-span-2 mt-2 p-4 bg-[#191C24] rounded-2xl shadow-[inset_3px_3px_7px_#101217,inset_-3px_-3px_7px_#222631] flex items-center justify-center gap-3">
          <span className="text-xs uppercase tracking-wider text-[#8A93A5] font-semibold">
            Ends In:
          </span>
          <p className="text-lg font-extrabold text-[#CFD4DC] tracking-wider drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
            <span className="text-[#d9a79c]">
              {String(hours).padStart(2, "0")}
            </span>
            h :{" "}
            <span className="text-[#d9a79c]">
              {String(minutes).padStart(2, "0")}
            </span>
            m :{" "}
            <span className="text-[#d9a79c]">
              {String(seconds).padStart(2, "0")}
            </span>
            s
          </p>
        </div>
      </div>
    </section>
  );
}

export default DealOfTheDay;
