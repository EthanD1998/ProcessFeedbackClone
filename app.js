const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars")

const app = express();

app.engine("handlebars", exphbs.engine({
    defaultLayout: "main"
}))
app.set("view engine", "handlebars");

app.use(express.static(path.join(__dirname, "public")));

app.get("/robots.txt", (req, res) => {
    res.sendFile(path.join(__dirname, "robots.txt"))
})

const mainRoutes = require("./routes/main");
app.use("/", mainRoutes);

app.use((req, res) => {
    res.status(404).render("404");
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server Running on http://localhost:${PORT}`);
})