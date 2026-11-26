document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    const response = document.getElementById("contactResponse");
    if (!form || !response) return;

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("contactName").value.trim();
        const emailInput = document.getElementById("contactEmail");
        const email = emailInput.value.trim();
        const message = document.getElementById("contactMessage").value.trim();

        if (!name || !email || !emailInput.checkValidity() || !message) {
            response.textContent = "Please enter a valid name, email address and message.";
            response.setAttribute("role", "alert");
            return;
        }

        const contactMessage = {
            name: name,
            email: email,
            message: message,
            date: new Date().toLocaleString("en-IN")
        };

        try {
            let messages = [];
            const saved = JSON.parse(localStorage.getItem("contactMessages") || "[]");
            if (Array.isArray(saved)) messages = saved;
            messages.push(contactMessage);
            localStorage.setItem("contactMessages", JSON.stringify(messages));

            response.textContent = "Thank you, " + name + "! Your message has been saved in this browser.";
            response.setAttribute("role", "status");
            form.reset();
        } catch (error) {
            console.error("Could not save contact message.", error);
            response.textContent = "Your browser could not save this message. Please check browser storage and try again.";
            response.setAttribute("role", "alert");
        }
    });
});