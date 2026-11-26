document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("bookingForm");
    if (!form) return;

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const eventSelect = document.getElementById("event");
    const ticketSelect = document.getElementById("ticket");
    const quantityInput = document.getElementById("quantity");
    const totalPrice = document.getElementById("totalPrice");
    const MAX_TICKETS = 100;

    function readArray(key) {
        try {
            const parsed = JSON.parse(localStorage.getItem(key) || "[]");
            return Array.isArray(parsed) ? parsed : [];
        } catch (error) {
            console.error("Could not read saved " + key, error);
            return [];
        }
    }

    function getSelectedPrice() {
        const option = ticketSelect.options[ticketSelect.selectedIndex];
        if (!option || !option.value) return NaN;
        const price = Number(option.dataset.price);
        return Number.isFinite(price) && price > 0 ? price : NaN;
    }

    function calculateTotal() {
        const price = getSelectedPrice();
        const quantity = Number(quantityInput.value);
        const validQuantity = Number.isInteger(quantity) &&
            quantity >= 1 && quantity <= MAX_TICKETS;

        totalPrice.textContent = Number.isFinite(price) && validQuantity
            ? "Total Amount: ₹" + (price * quantity).toLocaleString("en-IN")
            : "Total Amount: —";
    }

    // Restore selections passed from the Tickets and Event Details pages.
    try {
        const savedTicket = localStorage.getItem("selectedTicket");
        const savedEvent = localStorage.getItem("selectedEvent");

        if (savedTicket && Array.from(ticketSelect.options).some(function (option) {
            return option.value === savedTicket;
        })) ticketSelect.value = savedTicket;

        if (savedEvent && Array.from(eventSelect.options).some(function (option) {
            return option.value === savedEvent;
        })) eventSelect.value = savedEvent;

        localStorage.removeItem("selectedTicket");
        localStorage.removeItem("selectedEvent");
    } catch (error) {
        console.warn("Browser storage is unavailable.", error);
    }

    ticketSelect.addEventListener("change", calculateTotal);
    quantityInput.addEventListener("input", calculateTotal);
    quantityInput.addEventListener("change", calculateTotal);

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const quantity = Number(quantityInput.value);
        const price = getSelectedPrice();
        const selectedEvent = eventSelect.value;

        if (!name) {
            alert("Please enter your full name.");
            nameInput.focus();
            return;
        }
        if (!email || !emailInput.checkValidity()) {
            alert("Please enter a valid email address.");
            emailInput.focus();
            return;
        }
        if (!selectedEvent) {
            alert("Please select an event.");
            eventSelect.focus();
            return;
        }
        if (!Number.isFinite(price)) {
            alert("Please select a valid ticket type.");
            ticketSelect.focus();
            return;
        }
        if (!Number.isInteger(quantity) || quantity < 1 || quantity > MAX_TICKETS) {
            alert("Please select between 1 and " + MAX_TICKETS + " tickets.");
            quantityInput.focus();
            return;
        }

        // If a real event date is later added as data-date="YYYY-MM-DD",
        // prevent booking after that date. Current event dates are unannounced.
        const selectedOption = eventSelect.options[eventSelect.selectedIndex];
        const eventDateValue = selectedOption.dataset.date;
        if (eventDateValue) {
            const eventDate = new Date(eventDateValue + "T23:59:59");
            if (Number.isNaN(eventDate.getTime()) || eventDate < new Date()) {
                alert("This event has already passed or has an invalid date.");
                return;
            }
        }

        const booking = {
            id: "EVH" + Date.now().toString(),
            name: name,
            email: email,
            event: selectedEvent,
            ticket: ticketSelect.value,
            quantity: quantity,
            total: price * quantity,
            date: new Date().toLocaleString("en-IN"),
            status: "Confirmed"
        };

        try {
            const bookings = readArray("bookings");
            bookings.push(booking);
            localStorage.setItem("bookings", JSON.stringify(bookings));
            localStorage.setItem("latestBooking", JSON.stringify(booking));
            sessionStorage.setItem("pendingBookingId", booking.id);
            window.location.href =
                "confirmation.html?booking=" + encodeURIComponent(booking.id);
        } catch (error) {
            console.error("Booking could not be saved.", error);
            alert("Your browser could not save this booking. Please enable site storage and try again.");
        }
    });

    calculateTotal();
});
