const getReindeerDistance = (reindeer: string) => {
  const raceTime = 2503;
  const parts = reindeer.split(' ');
  const flightTime = parseInt(parts[6]);
  const restAndFlight = flightTime + parseInt(parts[13]);
  const fullCycles = Math.floor(raceTime / restAndFlight);
  const remainingTime = raceTime - restAndFlight * fullCycles;
  const extraFlying = Math.min(remainingTime - flightTime, flightTime);
  const timeFlying = fullCycles * flightTime + extraFlying;
  const distanceFlown = timeFlying * parseInt(parts[3]);
  return distanceFlown;
};
