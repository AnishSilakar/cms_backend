const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { sequelize } = require("./models"); // Import the sequelize instance
const globalRoutes = require('./routes/global.route');

dotenv.config();
const app = express();

const corsOptions = {
  origin: "*",
  credentials: true,
};


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;

app.use(cors(corsOptions));
app.use(express.static("public"));

app.use('/api', globalRoutes);


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
