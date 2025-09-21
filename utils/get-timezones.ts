export default () => {
  const timeZones = Intl.supportedValuesOf("timeZone");
  const now = new Date(); // Use a fixed date to ensure consistent offset for a given timezone

  const timeZoneData = timeZones.map((timeZone) => {
    try {
      // Get the offset string (e.g., "+01:00", "-05:00")
      const offsetString = new Intl.DateTimeFormat("en-US", {
        timeZone: timeZone,
        timeZoneName: "shortOffset",
      }).formatToParts(now).find((part) => part.type === "timeZoneName")!.value;

      // Parse the offset string into minutes for sorting
      let offsetMinutes = 0;
      const parts = offsetString.replace(/^[^+-]*/, "").split(":");

      if (parts.length === 2) {
        offsetMinutes = parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
      } else if (parts.length === 1) {
        offsetMinutes = parts[0] === "" ? 0 : (parseInt(parts[0], 10) * 60);
      }

      return {
        name: timeZone,
        offsetString: offsetString,
        offsetMinutes: offsetMinutes,
      };
    } catch (e) {
      // Handle cases where a timezone might not be valid or offset cannot be determined
      return null;
    }
  }).filter(Boolean); // Filter out any null entries from errors

  // Sort by offset in ascending order
  timeZoneData.sort((a, b) => {
    if (a!.offsetMinutes === b!.offsetMinutes) {
      return a!.name.localeCompare(b!.name);
    }

    return a!.offsetMinutes - b!.offsetMinutes;
  });

  return timeZoneData;
};
