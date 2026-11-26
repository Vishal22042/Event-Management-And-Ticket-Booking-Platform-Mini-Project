document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("bookingForm");
    if (!form) return;

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const eventSelect = document.getElementById("event");
    const ticketSelect = document.getElementById("ticket");
    const quantityInput = document.getElementById("quantity");
    const totalPrice = document.getElementById("totalPrice");

    function readArray(key) {
        try {
            const value = JSON.parse(localStorage.getItem(key) || "[]");
            return Array.isArray(value) ? value : [];
        } catch (error) {
            console.error("Could not read saved " + key, error);
            return [];
        }
    }

    
function calculateTotal() {
    const option = ticketSelect.options[ticketSelect.selectedIndex];

    const price = Number(option && option.dataset.price);
    const quantity = Number(quantityInput.value);

    const valid = Number.isFinite(price) &&
        Number.isInteger(quantity) &&
        quantity >= 1 &&
        quantity <= 100;

    totalPrice.textContent = valid
        ? "Total Amount: ₹" +
          (price * quantity).toLocaleString("en-IN")
        : "Total Amount: —";
}


    // Restore a ticket and/or event selected on the previous page.
    try {
        const savedTicket = localStorage.getItem("selectedTicket");
        const savedEvent = localStorage.getItem("selectedEvent");
        if (savedTicket && [...ticketSelect.options].some(o => o.value === savedTicket)) {
            ticketSelect.value = savedTicket;
        }
        if (savedEvent && [...eventSelect.options].some(o => o.value === savedEvent)) {
            eventSelect.value = savedEvent;
        }
        localStorage.removeItem("selectedTicket");
        localStorage.removeItem("selectedEvent");
    } catch (error) {
        console.warn("Browser storage is unavailable.", error);
    }

    ticketSelect.addEventListener("change", calculateTotal);
    quantityInput.addEventListener("input", calculateTotal);

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const quantity = Number(quantityInput.value);
        const option = ticketSelect.options[ticketSelect.selectedIndex];
        const price = Number(option && option.dataset.price);

        if (!name || !email || !emailInput.checkValidity() ||
            !Number.isInteger(quantity) || quantity < 1 || quantity > 10 ||
            !Number.isFinite(price) || price <= 0) {
            alert("Please enter valid details and choose between 1 and 10 tickets.");
            return;
        }

        const booking = {
            id: "EVH" + Date.now().toString(),
            name: name,
            email: email,
            event: eventSelect.value,
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
            window.location.href = "confirmation.html";
        } catch (error) {
            console.error("Booking could not be saved.", error);
            alert("Your browser could not save this booking. Please enable site storage and try again.");
        }
    });

    calculateTotal();
});
