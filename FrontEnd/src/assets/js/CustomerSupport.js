function clickOption(link) {
    var elements = document.querySelectorAll(".sideNavLink");

    // Remove the "active" class from all links
    elements.forEach(function (element) {
        element.classList.remove("active");
    });

    // Add the "active" class to the clicked link
    link.classList.add("active");
}
