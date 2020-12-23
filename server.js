const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const htmlRoutes = require("./routes/html-routes");
// const apiRoutes = require("./routes/api-routes");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

app.use(htmlRoutes);
// app.use(apiRoutes);

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});