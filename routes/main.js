const express = require("express");
const router = express.Router();

// Home page
router.get("/", (req, res) => {
    res.render("home", {
        title: "Process Feedback Clone",
        page: "home"
    });
});


// Contact Page
router.get("/contact", (req, res) => {
    res.render("contact", {
        title: "Contact",
        page: "contact"
    });
});

module.exports = router;