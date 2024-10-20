const logger = require('../../../logger');
const UserClass = require('../../../classes/UserClass');
const { setRolesBySuperAdmin } = require('../../../functions/super_admin');
const { ROLES } = require('../../../constants');
Parse.Cloud.define(
  'createRole',
  async (req) => {
    logger.info('=== Create Role===');
    const body = req?.params;
    console.log('test');
    // return await setRolesBySuperAdmin();
  },
  {
    requireUserKeys: {
      accType: {
        options: ROLES.SUPERADMIN,
        error: 'Only super admin can perform this action',
      },
    },
    requireUser: true,
  },
);
