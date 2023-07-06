const allRoles = {
  user: [],
  admin: ['getUsers', 'manageUsers', 'manageCategories', 'manageProducts'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
