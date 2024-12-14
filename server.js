const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();

//import routes
const userRoute = require('./routes/user.route');
const peopleRoute = require('./routes/people.route')
const authRoute = require('./routes/auth.route')

app.use(express.json());
app.use(express.urlencoded({extended: true}));
const port = process.env.PORT || 3000;

app.use("/api", authRoute);
app.use("/api/user", userRoute);
app.use("/api/people", peopleRoute);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})