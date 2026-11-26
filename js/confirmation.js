document.addEventListener("DOMContentLoaded", function () {
    const details = document.getElementById("bookingDetails");
    const message = document.getElementById("confirmationMessage");
    if (!details || !message) return;

    let booking = null;
    try {
        booking = JSON.parse(localStorage.getItem("latestBooking") || "null");
    } catch (error) {
        console.error("Could not load the latest booking.", error);
    }

    if (!booking || typeof booking !== "object") {
        message.textContent = "No recent booking was found in this browser.";
        details.textContent = "Please make a booking first to see its confirmation details.";
        return;
    }

    message.textContent = "Your booking has been saved successfully in this browser.";

    const heading = document.createElement("h3");
    heading.textContent = "Booking Details";
    details.appendChild(heading);

    const fields = [
        ["Booking ID", booking.id],
        ["Name", booking.name],
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
        paragraph.appendChild(document.createTextNode(value == null ? "—" : String(value)));
        details.appendChild(paragraph);
    });
});