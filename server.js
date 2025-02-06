const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { sequelize } = require("./models"); // Import the sequelize instance

dotenv.config();
const app = express();

const corsOptions = {
  origin: "*",
  credentials: true,
};

//import routes
const userRoute = require("./routes/user.route");
const peopleRoute = require("./routes/people.route");
const authRoute = require("./routes/auth.route");
const generalSettingsRoute = require("./routes/generalSetting.route");
const socialMediaRoute = require("./routes/socialMedia.route");
const pageRoute = require("./routes/page.route");
const menusRoute = require("./routes/menu.route");
const menuGroupRoute = require("./routes/menugroup.route");
const sectionRoute = require("./routes/section.route");
const imageRoute = require("./routes/image.route");
const pageSectionRoute = require("./routes/pageSection.route");
const footerRoute = require("./routes/footer.route");
const fieldRoute = require('./routes/field.route');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;

app.use(cors(corsOptions));
app.use(express.static("public"));

app.use("/api", authRoute);
app.use("/api/user", userRoute);
app.use("/api/people", peopleRoute);
app.use("/api/general_settings", generalSettingsRoute);
app.use("/api/socialMedia", socialMediaRoute);
app.use("/api/page", pageRoute);
app.use("/api/menus", menusRoute);
app.use("/api/menuGroup", menuGroupRoute);
app.use("/api/section", sectionRoute);
app.use("/api/image", imageRoute);
app.use("/api/pageSection", pageSectionRoute);
app.use("/api/footer", footerRoute);
app.use('/api/field', fieldRoute);

// Check database connection before starting the server
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected successfully.");

    // // Example of executing a raw query
    // try {
    //   const [results, metadata] = await sequelize.query("SELECT * FROM Users");
    //   console.log("Raw query results:", results);
    // } catch (error) {
    //   console.error("Error executing raw query:", error);
    // }

    app.listen(port, "0.0.0.0", () => {
      console.log(`Listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
