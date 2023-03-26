require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const passportConfig = require("./passport/passport");
const passport = require("passport");
const fileUpload = require("express-fileupload");
const cookieSession = require("cookie-session");

const auth = require("./routes/auth");

//for swagger documentation
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//cookie session
app.use(
  cookieSession({
    maxAge: 3 * 24 * 60 * 60 * 1000,
    keys: ["thisislcotokenkey"], // dotenv
  })
);

//regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//cookies and file middleware
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

//temp check
app.set("view engine", "ejs");

//OAuth
app.get("/", (req, res) => {
  res.render("home");
});

//morgan middleware
app.use(morgan("tiny"));

//import all routes here
const home = require("./routes/home");
const user = require("./routes/user");
const product = require("./routes/product");
const payment = require("./routes/payment");
const order = require("./routes/order");

//router middleware
app.use("/api/v1", home);
app.use("/api/v1", user);
app.use("/api/v1", product);
app.use("/api/v1", order);
app.use("/auth", auth);

app.get("/signuptest", (req, res) => {
  res.render("signupform");
});

//export app js
module.exports = app;
