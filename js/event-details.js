document.addEventListener("DOMContentLoaded", function () {
    const events = {
        "live-music": {
            title: "Live Music Festival",
            image: "images/events/live-music.jpg",
            description: "Experience an exciting live music festival featuring performances, entertainment and an energetic atmosphere.",
            date: "20 October 2026",
            time: "6:00 PM onwards",
            location: "New Delhi",
            highlights: ["Live musical performances", "Entertainment activities", "Food and refreshment areas", "Multiple ticket categories"]
        },
        "technology": {
            title: "Technology Conference",
            image: "images/events/tech-conference.jpg",
            description: "Discover modern technologies, innovation and exciting ideas from the technology industry.",
            date: "5 November 2026",
            time: "To be announced",
            location: "Bengaluru",
            highlights: ["Technology sessions", "Industry discussions", "Innovation showcases", "Networking opportunities"]
        },
        "creative-workshop": {
            title: "Creative Workshop",
            image: "images/events/creative-workshop.jpg",
            description: "Participate in an interactive workshop focused on creativity, practical learning and developing new skills.",
            date: "12 November 2026",
            time: "To be announced",
            location: "Mumbai",
            highlights: ["Hands-on activities", "Creative exercises", "Skill development", "Interactive learning"]
        },
        "cultural": {
            title: "Cultural Celebration",
            image: "images/events/cultural-event.jpg",
            description: "Experience culture, traditions, performances and entertainment in a lively celebration.",
            date: "25 November 2026",
            time: "To be announced",
            location: "Jaipur",
            highlights: ["Cultural performances", "Traditional activities", "Local art and culture", "Community celebration"]
        }
    };

    const params = new URLSearchParams(window.location.search);
    const eventId = params.get("event") || "live-music";
    const selected = events[eventId] || events["live-music"];

    document.title = selected.title + " - EventHub";
    document.getElementById("detailsTitle").textContent = selected.title;
    document.getElementById("detailsImage").src = selected.image;
    document.getElementById("detailsImage").alt = selected.title;
    document.getElementById("detailsDescription").textContent = selected.description;
    document.getElementById("detailsDate").textContent = selected.date;
    document.getElementById("detailsTime").textContent = selected.time;
    document.getElementById("detailsLocation").textContent = selected.location;
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
    ticketLink.href = "tickets.html?event=" + encodeURIComponent(eventId);
    ticketLink.addEventListener("click", function () {
        try { localStorage.setItem("selectedEvent", selected.title); }
        catch (error) { console.warn("Could not save selected event.", error); }
    });
});