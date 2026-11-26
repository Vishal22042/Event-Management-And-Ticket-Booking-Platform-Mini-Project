document.addEventListener("DOMContentLoaded", function () {
    const events = {
        "live-music": {
            title: "Live Music Festival",
            image: "images/events/live-music.jpg",
            description: "Experience an exciting live music festival featuring performances, entertainment and an energetic atmosphere.",
            date: "To be announced",
            time: "6:00 PM onwards",
            location: "New Delhi",
            highlights: ["Live musical performances", "Entertainment activities", "Food and refreshment areas", "Multiple ticket categories"]
        },
        "technology": {
            title: "Technology Conference",
            image: "images/events/tech-conference.jpg",
            description: "Discover modern technologies, innovation and exciting ideas from the technology industry.",
            date: "To be announced",
            time: "To be announced",
            location: "Bengaluru",
            highlights: ["Technology sessions", "Industry discussions", "Innovation showcases", "Networking opportunities"]
        },
        "creative-workshop": {
            title: "Creative Workshop",
            image: "images/events/creative-workshop.jpg",
            description: "Participate in an interactive workshop focused on creativity, practical learning and developing new skills.",
            date: "To be announced",
            time: "To be announced",
            location: "Mumbai",
            highlights: ["Hands-on activities", "Creative exercises", "Skill development", "Interactive learning"]
        },
        "cultural": {
            title: "Cultural Celebration",
            image: "images/events/cultural-event.jpg",
            description: "Experience culture, traditions, performances and entertainment in a lively celebration.",
            date: "To be announced",
            time: "To be announced",
            location: "Jaipur",
            highlights: ["Cultural performances", "Traditional activities", "Local art and culture", "Community celebration"]
        }
    };

    const params = new URLSearchParams(window.location.search);
    const eventId = params.get("event") || "live-music";
    const selected = events[eventId] || events["live-music"];

    document.title = selected.title + " - EventHub";

    const titleEl = document.getElementById("detailsTitle");
    const imageEl = document.getElementById("detailsImage");
    const descriptionEl = document.getElementById("detailsDescription");
    const dateEl = document.getElementById("detailsDate");
    const timeEl = document.getElementById("detailsTime");
    const locationEl = document.getElementById("detailsLocation");

    if (titleEl) titleEl.textContent = selected.title;
    if (imageEl) {
        imageEl.src = selected.image;
        imageEl.alt = selected.title;
    }
    if (descriptionEl) descriptionEl.textContent = selected.description;
    if (dateEl) dateEl.textContent = selected.date;
    if (timeEl) timeEl.textContent = selected.time;
    if (locationEl) locationEl.textContent = selected.location;
    const highlightsList = document.getElementById("detailsHighlights");
    if (highlightsList) {
        highlightsList.replaceChildren();
        selected.highlights.forEach(function (item) {
            const li = document.createElement("li");
            li.textContent = item;
            highlightsList.appendChild(li);
        });
    }

    const ticketLink = document.getElementById("detailsTicketLink");
    if (ticketLink) {
        ticketLink.href = "tickets.html?event=" + encodeURIComponent(eventId);
        ticketLink.addEventListener("click", function () {
            try {
                localStorage.setItem("selectedEvent", selected.title);
            } catch (error) {
                console.warn("Could not save selected event.", error);
            }
        });
    }
});
