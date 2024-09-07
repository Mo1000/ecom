const express = require("express");
const cors = require("cors");
const { ParseServer } = require("parse-server");
const ParseDash = require("parse-dashboard");
const auth = require("./routes/auth/index.js");
const logger = require('./logger/index.js');
const dotenv = require("dotenv");
const CourseClass = require("./classes/CourseClass");
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
const appId = "appId";
const javascriptKey = "jskey";
const appName = "eLearning";
const serverURL = "http://localhost:1337/api";
const masterKey = "masterkey";
const port = 1337;
const server = new ParseServer({
  databaseURI: "mongodb://localhost:27017/eLearning",
  appId,
  restAPIKey: "apikey",
  cloud: "./src/clouds/index.js",
  masterKey,
  javascriptKey,
  port,
  mountPath: "/rest",
  directAccess: true,
  enforcePrivateUsers: true,
  allowClientClassCreation: true,
  enableAnonymousUsers: true,
  preventLoginWithUnverifiedEmail: true,
  allowPublic: true,
  appName,
});



const dashboard = new ParseDash(
  {
    apps: [
      {
        masterKey,
        serverURL,
        appId,
        appName,
        javascriptKey,
      },
    ],
    users: [
      {
        user: "admin",
        pass: "admin",
        apps: [{ appId, masterKey }],
      },
    ],
  }
  //options
);
app.use("/auth", auth)
app.use("/api", server);
app.use("/dash", dashboard);


app.listen(1337, async function () {
  logger.info("parse-server running on port 1337.");
});
