export default (missions, key) => missions
  .findIndex((mission) => mission.flight_number === key);
