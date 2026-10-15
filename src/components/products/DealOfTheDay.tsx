import { useEffect, useRef, useState } from "react";

function generateDealDuration() {
  //   const hours = Math.floor(Math.random() * 10) + 1;
  //   return hours * 60 * 60 * 1000;
  return 60 * 1000;
}

// const DAY_MS = 24 * 60 * 60 * 1000;
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

function DealOfTheDay() {
  const [schedule, setSchedule] = useState(getDealSchedule);
  const [now, setNow] = useState(Date.now());
  const rolloverInProgress = useRef(false);

  const remainingMs = Math.max(
    0,
    schedule.cycleStart + schedule.durationMs - now,
  );

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

    const elapsedCycles = Math.floor((now - schedule.cycleStart) / DAY_MS);

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
    <>
      <section>
        <h2>DEAL of the day</h2>
        <p>Wireless Headphones - 30% off</p>
        <p>Limited-time offer!</p>
        <p>
          {hours}hrs : {minutes}min : {seconds}secs left
        </p>
        <p>Use Coupon code: LIMITEDOFF</p>
      </section>
    </>
  );
}

export default DealOfTheDay;
