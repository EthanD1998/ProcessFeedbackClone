const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars")

const livereload = require("livereload");
const connectLivereload = require("connect-livereload");
require("dotenv").config();

const app = express();

const liveReloadServer = livereload.createServer({ exts: ["js", "handlebars", "css"] });
liveReloadServer.watch([__dirname + "/views", __dirname + "/public"]);
app.use(connectLivereload());  // ← now app can be used

app.engine("handlebars", exphbs.engine({
    defaultLayout: "main"
}))
app.set("view engine", "handlebars");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/robots.txt", (req, res) => {
    res.sendFile(path.join(__dirname, "robots.txt"))
})

const mainRoutes = require("./routes/main");
app.use("/", mainRoutes);

app.use((req, res) => {
    res.status(404).render("404");
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server Running on http://localhost:${PORT}`);
})