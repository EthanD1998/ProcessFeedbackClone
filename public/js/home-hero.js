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