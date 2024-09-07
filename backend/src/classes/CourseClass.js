const UserClass = require("./UserClass");

class CourseClass extends Parse.Object {
    static parseClassName = "Course";
    title;
    slug;
    shortDesc;
    overview;
    latestPrice;
    beforePrice;
    lessons;
    duration;
    image;
    accessTime;
    requirements;
    whatYouWillLearn;
    whoIsThisCourseFor;
    userId;
    catId;
    approved;
    inHomePage;
    inHomePageSetAt;
    isClass;

    constructor() {
        // Pass the ClassName to the Parse.Object constructor
        super(CourseClass.parseClassName);
    }

    static async createCourse(course) {
        const newCourse = new CourseClass()
        Object.entries(course).forEach(([key, value]) => {
            if (key !== "userid")
            newCourse.set(key, value);
        });
        newCourse.set("userId",Parse.User.current());
        const res = await newCourse.save();
        return res.toJSON();
    }

    static async updateCourse(objectId, course) {
        const newCourse = await CourseClass.getCourseByObjectId(objectId);
        Object.entries(course).forEach(([key, value]) => {
            if (key !== "userid")
                newCourse.set(key, value);
        });
        const res = await newCourse.save();
        return res.toJSON();
    }

    static async deleteCourse(objectId) {
        const course = await CourseClass.getCourseByObjectId(objectId);
        const res = await course.destroy();
        return res.toJSON();
    }

    static async getCourseByObjectId(objectId) {
        const query = new Parse.Query(CourseClass);
        return await query.get(objectId);
    }
}

module.exports = CourseClass;


