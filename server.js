const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
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

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
