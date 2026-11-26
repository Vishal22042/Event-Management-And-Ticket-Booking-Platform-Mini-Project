document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("searchEvent");
    const cards = Array.from(document.querySelectorAll(".event-card"));
    const emptyMessage = document.getElementById("noEventsMessage");
    if (!input) return;

    input.setAttribute("aria-label", "Search events by name, date, location or description");

    input.addEventListener("input", function () {
        const query = input.value.trim().toLocaleLowerCase();
        let visibleCount = 0;

        cards.forEach(function (card) {
            const matches = card.textContent.toLocaleLowerCase().includes(query);
            card.hidden = !matches;
            if (matches) visibleCount++;
        });

        if (emptyMessage) emptyMessage.hidden = visibleCount !== 0;
    });
});