document.addEventListener("DOMContentLoaded", function () {
    const details = document.getElementById("bookingDetails");
    const message = document.getElementById("confirmationMessage");
    if (!details || !message) return;

    let booking = null;

    try {
        const params = new URLSearchParams(window.location.search);
        const requestedId = params.get("booking");
        const pendingId = sessionStorage.getItem("pendingBookingId");

        if (!requestedId || !pendingId || requestedId !== pendingId) {
            throw new Error("No matching booking was submitted in this session.");
        }

        const savedBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
        if (!Array.isArray(savedBookings)) {
            throw new Error("Saved booking data is invalid.");
        }

        booking = savedBookings.find(function (item) {
            return item && item.id === requestedId;
        });

        if (!booking) throw new Error("Booking not found.");

        // Consume the one-time confirmation token.
        sessionStorage.removeItem("pendingBookingId");
    } catch (error) {
        console.warn("Could not load a valid booking confirmation.", error);
        message.textContent = "No new booking confirmation is available.";
        details.textContent =
            "Please complete a booking first. Your previous bookings are available in Booking History.";
        return;
    }

    message.textContent =
        "Your booking has been saved in this browser. This demo does not process payments.";

    const heading = document.createElement("h3");
    heading.textContent = "Booking Details";
    details.appendChild(heading);

    const fields = [
        ["Booking ID", booking.id],
        ["Name", booking.name],
        ["Email", booking.email],
        ["Event", booking.event],
        ["Ticket", booking.ticket],
        ["Quantity", booking.quantity],
        ["Total Amount", "₹" + Number(booking.total || 0).toLocaleString("en-IN")],
        ["Booking Date", booking.date],
        ["Status", booking.status || "Confirmed"]
    ];

    fields.forEach(function ([label, value]) {
        const paragraph = document.createElement("p");
        const strong = document.createElement("strong");
        strong.textContent = label + ": ";
        paragraph.appendChild(strong);
        paragraph.appendChild(
            document.createTextNode(value === undefined || value === null ? "—" : String(value))
        );
        details.appendChild(paragraph);
    });
});
