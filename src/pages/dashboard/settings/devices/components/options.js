const devicesOptions = [
  { name: "GPS", value: "gps" },
  { name: "Video", value: "video" },
  { name: "Seat Belt", value: "seatBelt" },
  { name: "Fule", value: "fule" },
  { name: "Temperature", value: "temperature" },
  { name: "Air Conditioner", value: "airConditioner" },
  { name: "Engine", value: "engine" },
];

const alertsTypesAccordingDevice = (device) => {
  const deviceOptions = {
    gps: [
      { parameter: "infence" },
      { parameter: "outfence" },
      { parameter: "speed-alert" },
      { parameter: "tire-pressure" },
    ],
    video: [{ parameter: "remove-sd-card" }],
    seatBelt: [{ parameter: "detach-seat-belt" }, { parameter: "damage-seat-belt" }],
    fule: [{ parameter: "fule-leakage" }, { parameter: "low-fule" }],
    temperature: [
      { parameter: "high-temperature" },
      { parameter: "high-humidity" },
      { parameter: "low-temperature" },
      { parameter: "low-humidity" },
    ],
    airConditioner: [{ parameter: "on/off-alert" }, { parameter: "dust-alert" }],
    engine: [{ parameter: "engine-overheat" }, { parameter: "engine-damage" }, { parameter: "idle-engine" }],
  };
  if (device) return deviceOptions[device];
  return [];
};

export { devicesOptions, alertsTypesAccordingDevice };
