document.addEventListener("DOMContentLoaded", function () {
    const list = document.getElementById("bookingList");
    const totalEl = document.getElementById("totalBookings");
    const confirmedEl = document.getElementById("confirmedBookings");
    const pendingEl = document.getElementById("pendingBookings");
    if (!list || !totalEl || !confirmedEl || !pendingEl) return;

    let bookings = [];
    try {
        const saved = JSON.parse(localStorage.getItem("bookings") || "[]");
        bookings = Array.isArray(saved) ? saved : [];
    } catch (error) {
        console.error("Could not read booking history.", error);
    }

    let confirmed = 0;
    let pending = 0;
    let validCount = 0;
    list.replaceChildren();

    bookings.slice().reverse().forEach(function (booking) {
        if (!booking || typeof booking !== "object" || !booking.id) return;
        validCount++;

        // Older records without a status were created by the original booking form.
        const status = booking.status || "Confirmed";
        if (status === "Pending") pending++;
        else confirmed++;

        const card = document.createElement("article");
        card.className = "booking-card";

        const heading = document.createElement("h2");
        heading.textContent = booking.event || "Event booking";
        card.appendChild(heading);

        const fields = [
            ["Booking ID", booking.id],
            ["Name", booking.name],
            ["Email", booking.email],
            ["Ticket", booking.ticket],
            ["Quantity", booking.quantity],
            ["Total Amount", "₹" + Number(booking.total || 0).toLocaleString("en-IN")],
            ["Booking Date", booking.date],
            ["Status", status]
        ];

        fields.forEach(function ([label, value]) {
            if (value === undefined || value === null || value === "") return;
            const paragraph = document.createElement("p");
            const strong = document.createElement("strong");
            strong.textContent = label + ": ";
            paragraph.appendChild(strong);
            if (label === "Status") {
                const statusText = document.createElement("span");
                statusText.className = "status " + (status === "Pending" ? "pending" : "confirmed");
                statusText.textContent = String(value);
                paragraph.appendChild(statusText);
            } else {
                paragraph.appendChild(document.createTextNode(String(value)));
            }
            card.appendChild(paragraph);
        });

        list.appendChild(card);
    });

    totalEl.textContent = validCount;
    confirmedEl.textContent = confirmed;
    pendingEl.textContent = pending;

    if (validCount === 0) {
        const empty = document.createElement("p");
        empty.className = "empty-bookings";
        empty.textContent = "No bookings found. Book your first event!";
        empty.style.textAlign = "center";
        empty.style.padding = "25px";
        list.appendChild(empty);
    }
});
