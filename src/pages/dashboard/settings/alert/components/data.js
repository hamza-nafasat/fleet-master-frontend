const getRuleEngineParameters = (type) => {
  if (!type) return [];
  if (type == "gps") {
    return [
      { type: "speed-alert" },
      { type: "sudden-stop" },
      { type: "two-detection" },
      { type: "tire-pressure" },
      { type: "sensor-offline" },
      { type: "idle-engine" },
      { type: "damage-alert" },
    ];
  }
};

export { getRuleEngineParameters };
