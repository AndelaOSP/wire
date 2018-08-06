const matchPositionToRoleId = (roles, position) => {
  let roleToMatch = roles.find(role => {
    return role.name === position;
  });
  return roleToMatch.id;
};

const matchLocationToLocationId = (locations, country) => {
  let locationToMatch = locations.find(location => {
    return location.country === country;
  });
  return locationToMatch.id;
};

module.exports = { matchPositionToRoleId, matchLocationToLocationId };
