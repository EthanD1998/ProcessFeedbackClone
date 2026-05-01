const form = document.querySelector(".contact-form");

if (form) {
    form.addEventListener("submit", function (e) {
        const email = document.querySelector("#email").value.trim();
        const confirmEmail = document.querySelector("#confirmEmail").value.trim();
        const button = document.querySelector("button");
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        let oldMessage = document.querySelector(".client-error-msg");
        if (oldMessage) oldMessage.remove();


        if (!emailPattern.test(email)) {
            e.preventDefault();

            const errorMessage = document.createElement("p");
            errorMessage.className = "client-error-msg";
            errorMessage.innerText = "Please enter a valid email address, like name@example.com.";

            form.prepend(errorMessage);
            return;
        }

        if (email !== confirmEmail) {
            e.preventDefault();

            const errorMessage = document.createElement("p");
            errorMessage.className = "client-error-msg";
            errorMessage.innerText = "Emails do not match. Please check both email fields.";

            form.prepend(errorMessage);
            return;
        }

        button.disabled = true;
        button.innerText = "Sending...";

        setTimeout(() => {
            form.reset();
            button.disabled = false;
            button.innerText = "Send Message";
        }, 2000);
    });
}