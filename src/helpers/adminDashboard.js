const matchPositionToRoleId = (roles, position) => {
  const roleToMatch = roles.find(role => role.name === position);
  return roleToMatch.id;
};

const matchLocationToLocationId = (locations, country) => {
  const locationToMatch = locations.find(location => location.country === country);
  return locationToMatch.id;
};

module.exports = { matchPositionToRoleId, matchLocationToLocationId };
