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

// Pricing page
router.get("/pricing", (req, res) => {
    res.render("pricing", {
        title: "Pricing",
        page: "pricing"
    });
});

// Attribution Page
router.get("/Attribution", (req, res) => {
    res.render("attribution", {
        title: "Attribution",
        page: "attribution"
    });
})

// privacy policy
router.get('/privacy', (req, res) => {
    res.render("privacy", {
        title: "Privacy Policy",
        page: "privacy policy"
    });
});

const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

router.post("/contact", async (req, res) => {
    const { honeypot } = req.body;

    if (honeypot) {
        return res.redirect("/contact");
    }

    const { name, email, confirmEmail, subject, message } = req.body;

    if (!name || !email || !confirmEmail || !subject || !message) {
        return res.render("contact", {
            title: "Contact",
            error: "All fields are required."
        });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        return res.render("contact", {
            title: "Contact",
            error: "Please enter a valid email address."
        });
    }

    if (email !== confirmEmail) {
        return res.render("contact", {
            title: "Contact",
            error: "Emails do not match."
        });
    }

    try {
        // Send message to you
        await resend.emails.send({
            from: "Website Contact Form <onboarding@resend.dev>",
            to: process.env.EMAIL_USER,
            reply_to: email,
            subject: `New Contact Message from ${name}: ${subject}`,
            text: `
            Name: ${name}
            Email: ${email}
            Subject: ${subject}
            
            Message:
            ${message}
            `
        });

        /* commented out unless we want to setup a domain
        // Send automatic reply to the person who filled out the form
        await resend.emails.send({
            from: "Website Contact Form <onboarding@resend.dev>",
            to: email,
            subject: "We got your message",
            text: `Hi ${name},
            
            We received your message and will reply soon.
            Thank you.`
        });
        */
        return res.render("contact", {
            title: "Contact",
            success: "Message sent successfully!"
        });

    } catch (err) {
        console.error("Contact form email error:", {
            message: err.message,
            name: err.name,
            statusCode: err.statusCode
        });

        return res.render("contact", {
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