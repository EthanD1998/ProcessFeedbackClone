document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".reveal");

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;

    elements.forEach((el) => {
      const elementTop = el.getBoundingClientRect().top;

      // display in layout
      if (elementTop < windowHeight - 100) {
        el.classList.add("active");
      }
    });
  };

  // trigger when scroll
  window.addEventListener("scroll", revealOnScroll);

  // refresh
  revealOnScroll();
});