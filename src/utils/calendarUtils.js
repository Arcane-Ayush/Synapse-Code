// src/utils/calendarUtils.js

export function generateGoogleCalendarUrl(activity) {
  const { title, date, time, location, description } = activity;

  // Parse date and time to create start/end timestamps
  // Assuming date is "YYYY-MM-DD" and time is like "2:00 PM - 4:00 PM" or just "9:00 AM"

  const startTimeStr = time.split(" - ")[0];
  const endTimeStr = time.split(" - ")[1] || startTimeStr;

  const startDateTime = new Date(`${date} ${startTimeStr}`);
  let endDateTime = new Date(`${date} ${endTimeStr}`);

  if (!time.includes(" - ")) {
    // If no end time specified, assume 1 hour duration
    endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000);
  }

  const format = (d) => d.toISOString().replace(/-|:|\.\d\d\d/g, "");

  const start = format(startDateTime);
  const end = format(endDateTime);

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${start}/${end}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}&sf=true&output=xml`;
}

export function downloadIcsFile(activity) {
  const { title, date, time, location, description } = activity;

  const startTimeStr = time.split(" - ")[0];
  const endTimeStr = time.split(" - ")[1] || startTimeStr;

  const startDateTime = new Date(`${date} ${startTimeStr}`);
  let endDateTime = new Date(`${date} ${endTimeStr}`);

  if (!time.includes(" - ")) {
    endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000);
  }

  const format = (d) => d.toISOString().replace(/-|:|\.\d\d\d/g, "");

  const content = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    `DTSTART:${format(startDateTime)}`,
    `DTEND:${format(endDateTime)}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\n");

  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${title.replace(/\s+/g, "_")}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
