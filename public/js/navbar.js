// hamburger
const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".main-nav");

if (hamburger && nav) {
  hamburger.addEventListener("click", () => {
    nav.classList.toggle("mobile-open");
  });
}


// dropdown
const dropdownItems = document.querySelectorAll(".has-dropdown");

dropdownItems.forEach(item => {
  const link = item.querySelector(".nav-link");
  const menu = item.querySelector(".dropdown-menu");

  link.addEventListener("click", (e) => {
    e.preventDefault(); 

    // close others dropdown
    document.querySelectorAll(".dropdown-menu").forEach(m => {
      if (m !== menu) m.classList.remove("accordion-open");
    });

    // toggle 
    menu.classList.toggle("accordion-open");
  });
});