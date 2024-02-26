const express = require("express");
const app = express();
const path = require("path");
const { port: p } = require("./config/constants");
const { logSuccess, logError } = require("./middleware/logger");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { credentials, corsOptions } = require("./config/origins");
const db = require("./config");

const port = p || 3000;

app.use(logSuccess);

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.use("/v1/auth", require("./app/v1/auth/router"));
app.use("/v1/user", require("./app/v1/user/router"));
app.use("/v1/product", require("./app/v1/product/router"));

app.all("/*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) res.sendFile(path.join(__dirname, "views", "404.html"));
  else if (req.accepts("json")) res.json({ message: "404 Not Found" });
  else res.type("txt").send("404 Not Found");
});

app.use(logError);

db.then(() => {
  console.log(`connect to mongodb`);
  app.listen(port, () => console.log(`App is runngin on port ${port}`));
}).catch((err) => console.log(err));
