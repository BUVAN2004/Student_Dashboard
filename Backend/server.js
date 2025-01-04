const express = require("express");
const dotenv = require("dotenv").config({ path: "./.env" });
const cors = require("cors");
const connectDB = require("./DatabaseConnection");
const asyncHandler = require("express-async-handler");
const errorHandler = require("./errorHandler");
const skillScore = require('./RankCalculator')
const schedule = require('node-schedule');
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
connectDB();

// skillScore();
// (* * * * * *) => (second(optional) minute hour day_of_month month Day_of_the_week)
schedule.scheduleJob('0 0 * * *', () => {
  console.log("Running skillScore function...");
  skillScore();
});

app.post("/api/login", require("./Auth"));
app.use("/api/homepage", require("./Routes/homepage.routes"));
app.use("/api/facultypage", require("./Routes/facultypage.routes"));
app.use("/api/dashboard", require("./Routes/dashboard.routes"));
app.use("/api/placementUpdates", require("./Routes/placement.routes"));
app.use("/api/upload_resume", require("./Routes/multer.route"));
app.use("/api/download_resume", require("./Routes/multer.route"));


app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
