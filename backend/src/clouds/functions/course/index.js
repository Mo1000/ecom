const CourseService = require('../../../classes/CourseClass');
const logger = require('../../../logger');
const { isPrivateRoute } = require('../../../utils/parse');
const { ROLES } = require('../../../constants');
Parse.Cloud.define('deleteCourse', async (request) => {
  logger.info('===deleteProduct start===');

  const { objectId } = request.params;
  return await CourseService.deleteCourse(objectId);
});

Parse.Cloud.define(
  'createCourse',
  async (req) => {
    logger.info('===Create Course start===');
    return await CourseService.createCourse(req.user, req.params.course);
  },
  {
    fields: {
      title: {
        required: true,
        type: String,
        options: (val) => val.length > 3,
        error: 'Course must be less than 3 characters',
      },
    },
    requireUserKeys: {
      roles: {
        options: (val) => val.includes(ROLES.INSTRUCTOR),
        error: 'Only instructor can create course',
      },
    },
    requireUser: true,
    requireAnyUserRoles: [ROLES.INSTRUCTOR],
  },
);

Parse.Cloud.define('updateCourse', async (request) => {
  logger.info('===UpdateProduct start===');
  const { objectId, course } = request.params;
  return await CourseService.updateCourse(objectId, course);
});
