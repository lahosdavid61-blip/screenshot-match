// Opening hours: NOT publicly verified yet (kafici.rs: "Radno vreme ne znamo").
// Fill in per weekday (0 = Sunday) as "HH:MM" strings once the owner confirms.
// A close time earlier than or equal to open means it runs past midnight.
export type DayHours = { open: string; close: string } | null;
export type WeekHours = Record<0 | 1 | 2 | 3 | 4 | 5 | 6, DayHours>;

export const hours: WeekHours | null = null;

const toMin = (s: string) => {
  const [h = 0, m = 0] = s.split(":").map(Number);
  return h * 60 + m;
};

/** Weekday + minutes for a date in Europe/Belgrade. */
export function belgradeNow(date: Date): { day: number; min: number } {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Belgrade",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return {
    day: days.indexOf(get("weekday")),
    min: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

export function isOpenAt(week: WeekHours, date: Date): boolean {
  const { day, min } = belgradeNow(date);
  const today = week[day as keyof WeekHours];
  if (today) {
    const o = toMin(today.open),
      c = toMin(today.close);
    if (c > o ? min >= o && min < c : min >= o) return true;
  }
  const prev = week[((day + 6) % 7) as keyof WeekHours];
  if (prev) {
    const o = toMin(prev.open),
      c = toMin(prev.close);
    if (c <= o && min < c) return true;
  }
  return false;
}
