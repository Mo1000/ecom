const { ROLES } = require('../../constants');
const { setRoleAcl } = require('../../utils/parse');

async function setRolesBySuperAdmin() {
  const setRoles = async (nameRole, studentRole) => {
    const userRole = await new Parse.Query(Parse.Role)
      .equalTo('name', nameRole)
      .first({ useMasterKey: true });

    if (!userRole) {
      const roleACL = setRoleAcl(nameRole);

      const role = new Parse.Role(nameRole, roleACL);

      if (nameRole === ROLES.ADMIN || nameRole === ROLES.INSTRUCTOR) {
        if (studentRole) role.getRoles().add(studentRole);
      }

      role?.save(null, { useMasterKey: true });
      return role;
    }
    return userRole;
  };

  setRoles(ROLES.STUDENT).then((studentRole) => {
    Object.values(ROLES)
      .filter((item) => item !== ROLES.STUDENT)
      .map(async (nameRole) => {
        await setRoles(nameRole, studentRole);
      });
  });
}

module.exports = { setRolesBySuperAdmin };
