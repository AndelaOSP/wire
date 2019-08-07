const getUserName = email => {
  let username = {};
  const [firstName, lastName] = email.split('@')[0].split('.');
  const first = firstName[0].toUpperCase() + firstName.substr(1, firstName.length);
  const last = lastName[0].toUpperCase() + lastName.substr(1, lastName.length);
  username = `${first} ${last}`;
  return username;
};

const getRandomImageUrl = () => {
  const randomNum = Math.floor(Math.random() * 9);
  return `https://randomuser.me/api/portraits/lego/${randomNum}.jpg`;
};

const matchRoleIdToName = (roles, roleId) => {
  let role = roles.find(role => {
    return role.id === roleId;
  });
  return role.name;
};

const matchLocationIdToLocation = (locations, locationId) => {
  let location = locations.find(location => {
    return location.id === locationId;
  });
  let userLocation = Object.assign({}, location);
  delete userLocation.id;
  return userLocation;
};

module.exports = { getUserName, getRandomImageUrl, matchRoleIdToName, matchLocationIdToLocation };
