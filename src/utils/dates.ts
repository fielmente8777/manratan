/**
 * Calendar-date helpers that stay in the guest's local time zone.
 *
 * `date.toISOString()` converts to UTC first, so in India (UTC+5:30) a date picked
 * as 10 Nov at local midnight became "2026-11-09". These helpers format and parse
 * plain YYYY-MM-DD strings without any time-zone shift.
 */

const pad = (n: number) => String(n).padStart(2, "0");

/** 2026-11-10 for a Date that falls on 10 Nov in local time. */
export function toLocalISODate(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** Local-midnight Date for a YYYY-MM-DD string, or null if it isn't one. */
export function fromLocalISODate(s?: string | null): Date | null {
  if (!s) return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (!m) return null;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return Number.isNaN(d.getTime()) ? null : d;
}

export function addDays(d: Date, days: number): Date {
  const out = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  out.setDate(out.getDate() + days);
  return out;
}

export function startOfToday(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

/** Whole nights between two local dates (0 if check-out is not after check-in). */
export function nightsBetween(checkIn: Date, checkOut: Date): number {
  const ms = addDays(checkOut, 0).getTime() - addDays(checkIn, 0).getTime();
  return Math.max(0, Math.round(ms / 86_400_000));
}

/** "Tue, 10 Nov" */
export function formatShort(d: Date): string {
  return d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });
}
