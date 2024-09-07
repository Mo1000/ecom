const CourseService = require("../../../classes/CourseClass");
const logger = require("../../../logger");

Parse.Cloud.define("deleteCourse", async (request) => {
    logger.info("===deleteProduct start===");

    const { objectId } = request.params;
    return await CourseService.deleteCourse(objectId);
});

Parse.Cloud.define("updateCourse", async (request) => {
    logger.info("===UpdateProduct start===");
    const {objectId, course} = request.params;

    return await CourseService.updateCourse(objectId, course);
});

