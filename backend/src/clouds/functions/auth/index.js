const logger = require('../../../logger');
const UserClass = require('../../../classes/UserClass');
const { ROLES } = require('../../../constants');

// Parse.Cloud.beforeSave(
//   Parse.User,
//   () => {
//     // any additional beforeSave logic here
//   },
//   {
//     fields: {
//       accType: {
//         default: ROLES.STUDENT,
//         constant: true,
//       },
//     },
//   },
// );
Parse.Cloud.define('signUp', async (req) => {
  logger.info('===signUp start===');

  const body = req?.params;
  return await UserClass.signUp(body);
});

Parse.Cloud.define('login', async (req) => {
  logger.info('===login start===');
  const { email, password } = req?.params;
  return await UserClass.loginWithEmail(email, password);
});
