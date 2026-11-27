import { describe, expect, it } from "vitest";
import { hours, isOpenAt, type WeekHours } from "./hours";

const d = { open: "08:00", close: "02:00" };
const week: WeekHours = { 0: null, 1: d, 2: d, 3: d, 4: d, 5: d, 6: d };
// Belgrade is UTC+1 in winter.
describe("isOpenAt (Europe/Belgrade)", () => {
  it("open Monday 10:00", () =>
    expect(isOpenAt(week, new Date("2026-11-23T09:00:00Z"))).toBe(true));
  it("closed Monday 07:00", () =>
    expect(isOpenAt(week, new Date("2026-11-23T06:00:00Z"))).toBe(false));
  it("open Tuesday 01:30 from Monday's late shift", () =>
    expect(isOpenAt(week, new Date("2026-11-24T00:30:00Z"))).toBe(true));
  it("open Sunday 01:00 from Saturday, closed Sunday noon", () => {
    expect(isOpenAt(week, new Date("2026-11-29T00:00:00Z"))).toBe(true);
    expect(isOpenAt(week, new Date("2026-11-29T11:00:00Z"))).toBe(false);
  });
});

describe("DOT regular opening hours", () => {
  it("opens at 08:00 and closes at 22:00 on Monday", () => {
    expect(isOpenAt(hours, new Date("2026-11-23T06:59:00Z"))).toBe(false);
    expect(isOpenAt(hours, new Date("2026-11-23T07:00:00Z"))).toBe(true);
    expect(isOpenAt(hours, new Date("2026-11-23T20:59:00Z"))).toBe(true);
    expect(isOpenAt(hours, new Date("2026-11-23T21:00:00Z"))).toBe(false);
  });
  it("closes at midnight Friday and remains closed on Saturday and Sunday", () => {
    expect(isOpenAt(hours, new Date("2026-11-27T22:59:00Z"))).toBe(true);
    expect(isOpenAt(hours, new Date("2026-11-27T23:00:00Z"))).toBe(false);
    expect(isOpenAt(hours, new Date("2026-11-28T11:00:00Z"))).toBe(false);
    expect(isOpenAt(hours, new Date("2026-11-29T11:00:00Z"))).toBe(false);
  });
  it("uses Belgrade summer time rather than the visitor's timezone", () => {
    expect(isOpenAt(hours, new Date("2026-07-06T05:59:00Z"))).toBe(false);
    expect(isOpenAt(hours, new Date("2026-07-06T06:00:00Z"))).toBe(true);
  });
});
