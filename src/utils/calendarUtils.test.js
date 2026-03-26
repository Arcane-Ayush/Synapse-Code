import { describe, it, expect, vi, beforeEach } from "vitest";
import { generateGoogleCalendarUrl, downloadIcsFile } from "./calendarUtils";

const sample = {
  title: "Intro to React Workshop",
  date: "2026-02-15",
  time: "2:00 PM - 4:00 PM",
  location: "Lab 301",
  description: "Kickstart your frontend journey",
};

describe("calendarUtils", () => {
  it("generates Google Calendar URL", () => {
    const url = generateGoogleCalendarUrl(sample);
    expect(url).toContain("calendar.google.com");
    expect(url).toContain("action=TEMPLATE");
    expect(url).toContain(encodeURIComponent(sample.title));
  });

  beforeEach(() => {
    vi.stubGlobal("URL", {
      createObjectURL: vi.fn(() => "blob:mock"),
    });
    const appendChild = vi.fn();
    const removeChild = vi.fn();
    const click = vi.fn();
    vi.spyOn(document, "createElement").mockReturnValue({
      setAttribute: vi.fn(),
      click,
    });
    vi.spyOn(document.body, "appendChild").mockImplementation(appendChild);
    vi.spyOn(document.body, "removeChild").mockImplementation(removeChild);
  });

  it("creates and clicks link to download ICS", () => {
    downloadIcsFile(sample);
    expect(URL.createObjectURL).toHaveBeenCalled();
  });

  it("handles single start time by adding default duration", () => {
    const url = generateGoogleCalendarUrl({ ...sample, time: "9:00 AM" });
    expect(url).toContain("dates=");
  });
});
