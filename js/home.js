document.addEventListener("DOMContentLoaded", function() {

    const heroButton = document.querySelector(".hero .btn");

    if (heroButton) {
        heroButton.addEventListener("click", function() {
            console.log("User is exploring events.");
        });
    }

    const featuredCards =
        document.querySelectorAll(".feature-card");

    featuredCards.forEach(function(card) {

        card.addEventListener("mouseenter", function() {
            card.style.transform = "translateY(-5px)";
        });

        card.addEventListener("mouseleave", function() {
            card.style.transform = "translateY(0)";
        });

    });

});