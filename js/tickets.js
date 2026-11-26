document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const eventId = params.get("event");
    const eventNames = {
        "live-music": "Live Music Festival",
        "technology": "Technology Conference",
        "creative-workshop": "Creative Workshop",
        "cultural": "Cultural Celebration"
    };

    try {
        if (eventId && eventNames[eventId]) {
            localStorage.setItem("selectedEvent", eventNames[eventId]);
        } else {
            // Avoid accidentally reusing an event chosen during an older visit.
            localStorage.removeItem("selectedEvent");
        }
    } catch (error) {
        console.warn("Could not update selected event.", error);
    }

    document.querySelectorAll(".ticket-btn").forEach(function (button) {
        button.addEventListener("click", function () {
            const card = button.closest(".ticket-card");
            if (!card) return;
            try {
                localStorage.setItem("selectedTicket", card.dataset.ticket || "Regular");
            } catch (error) {
                console.warn("Could not save selected ticket.", error);
            }
        });
    });
});