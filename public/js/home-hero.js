document.addEventListener("DOMContentLoaded", () => {
  const revealItems = document.querySelectorAll(".reveal-up");
  revealItems.forEach((item) => {
    item.classList.add("is-visible");
  });

  const counters = document.querySelectorAll(".count-up");

  counters.forEach((counter) => {
    const target = Number(counter.dataset.target);
    const duration = 1600;
    const startTime = performance.now();

    function updateCount(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // ease out
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(eased * target);

      counter.textContent = value.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        counter.textContent = target.toLocaleString();
      }
    }

    requestAnimationFrame(updateCount);
  });
});



const scrollRevealSections = document.querySelectorAll(".reveal-on-scroll");

const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        obs.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2
  }
);

scrollRevealSections.forEach((section) => {
  observer.observe(section);
});

document.addEventListener("DOMContentLoaded", () => {
  const testimonialBox = document.querySelector("#testimonial-box");

  if (testimonialBox) {
    const quoteObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            testimonialBox.classList.add("highlight-active");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.35
      }
    );

    quoteObserver.observe(testimonialBox);
  }
});