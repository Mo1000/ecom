const logger = require('../logger');

class UserClass extends Parse.User {

    static parseClassName = "_User";
    firstName;
    lastName;
    email;
    password;
    gender;
    designation;
    bio;
    profilePhoto;
    location;
    phone;
    resetPasswordToken;
    resetPasswordSendAt;
    resetPasswordAt;
    website;
    twitter;
    facebook;
    linkedin;
    youtube;
    role;
    emailConfirmed;

    constructor() {
        super(
            UserClass.parseClassName
        );
    }





    static async signUp(newUser) {
        const user = new UserClass();

        Object.entries(newUser).forEach(([key, value]) => {
            user.set(key, value);
        })
        try {
            const res = await user.signUp();
            return res.toJSON();
        }
        catch (e) {
            logger.error("Error: " + e.code + " " + e.message);
            throw new Error(e.message);
        }
    }

    static async login(username, password) {
        try {
            const res = await Parse.User.logIn(username, password);
            return res.authenticated();
        }
        catch (e) {
            throw new Error(e.message);
        }
    }
}

module.exports = UserClass;
