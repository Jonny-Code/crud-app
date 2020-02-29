const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config({ path: "./config/config.env" });

connectDB();

const PORT = process.env.PORT || 1337;

const documents = require("./routes/document");

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1/documents", documents);

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
