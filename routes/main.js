const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

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

router.post("/contact", async (req, res) => {
    const { name, email, subject, message } = req.body;

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // send to you
        await transporter.sendMail({
            from: `"Website Contact Form" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            replyTo: email,
            subject: `New Contact Message from ${name}: ${subject}`,
            text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`
        });
        

        // auto reply
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "We got your message",
            text: `Hi ${name}, we received your message and will reply soon.`
        });

        res.render("contact", {
            title: "Contact",
            success: "Message sent successfully!"
        });

    } catch (err) {
        console.log(err);

        res.render("contact", {
            title: "Contact",
            error: "Something went wrong. Try again."
        });
    }
});

/*team page*/
router.get("/team", (req, res) => {
    const teamMembers = [
        {
            name: "Ethan Doll",
            role: "Developer",
            cardClass: "team-card blue"
        },
        {
            name: "Fares Jaha",
            role: "Developer",
            cardClass: "team-card purple"
        },
        {
            name: "Max Hsu",
            role: "Developer",
            cardClass: "team-card light-blue"
        },
        {
            name: "Sameer Yadav",
            role: "Developer",
            cardClass: "team-card green"
        }
    ];

    res.render("team", {
        title: "Team",
        page: "team",
        teamMembers
    });
});
module.exports = router;