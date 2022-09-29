const accordionHeaders = document.querySelectorAll(".accordion-item-header");

accordionHeaders.forEach((accordionHeader) => {
  accordionHeader.addEventListener("click", (event) => {
    const accordionActive = document.querySelector(
      ".accordion-item-header.active"
    );

    if (accordionActive && accordionActive !== accordionHeader) {
      accordionActive.classList.toggle("active");
    }
    accordionHeader.classList.toggle("active");
  });
});
