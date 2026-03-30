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

const hamburger = document.querySelector('.hamburger');
const mainNav = document.querySelector('.main-nav');

hamburger.addEventListener('click', () => {
  mainNav.classList.toggle('mobile-open');
});

mainNav.querySelectorAll('.has-dropdown .nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    if (mainNav.classList.contains('mobile-open')) {
      e.preventDefault();
      const dropdown = link.closest('.nav-item').querySelector('.dropdown-menu');
      const isOpen = dropdown.classList.contains('accordion-open');

      // close all dropdowns first
      mainNav.querySelectorAll('.dropdown-menu').forEach(d => d.classList.remove('accordion-open'));
      mainNav.querySelectorAll('.chevron').forEach(c => c.classList.remove('chevron-up'));

      // if it wasn't open, open it
      if (!isOpen) {
        dropdown.classList.add('accordion-open');
        link.querySelector('.chevron').classList.add('chevron-up');
      }
    }
  });
});