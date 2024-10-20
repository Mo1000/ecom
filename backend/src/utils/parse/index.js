const { ROLES } = require('../../constants');
const isPrivateRoute = (req) => {
  if (!req.user) {
    throw new Error('You are not authorized to perform this action');
  }
};

const addRole = async (user, nameRole = ROLES.STUDENT) => {
  const userRole = await new Parse.Query(Parse.Role)
    .equalTo('name', nameRole)
    .first({ useMasterKey: true });

  userRole.getUsers().add(user);
  userRole?.save(null, { useMasterKey: true });
};

const setRoleAcl = (nameRole) => {
  let roleACL = new Parse.ACL();

  if (nameRole === ROLES.SUPERADMIN) {
    roleACL.setPublicWriteAccess(true);
    roleACL.setPublicWriteAccess(true);
  } else if (nameRole === ROLES.ADMIN) {
    roleACL.setRoleReadAccess(ROLES.ADMIN, true);
    roleACL.setRoleWriteAccess(ROLES.ADMIN, true);
  } else if (nameRole === ROLES.INSTRUCTOR) {
    roleACL.setRoleReadAccess(ROLES.INSTRUCTOR, true);
    roleACL.setRoleWriteAccess(ROLES.INSTRUCTOR, true);
  } else if (nameRole === ROLES.STUDENT) {
    roleACL.setRoleReadAccess(ROLES.STUDENT, true);
    roleACL.setRoleWriteAccess(ROLES.STUDENT, true);
  }
  return roleACL;
};
module.exports = { isPrivateRoute, addRole, setRoleAcl };
