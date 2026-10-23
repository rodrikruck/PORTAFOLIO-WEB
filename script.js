const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".site-nav");
const header = document.querySelector(".site-header");
const navLinks = document.querySelectorAll(".site-nav a");
const revealItems = document.querySelectorAll(".reveal");

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  navigation.classList.toggle("is-open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuButton?.setAttribute("aria-expanded", "false");
    navigation?.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  });
});

// Desde la página principal, "Inicio" vuelve siempre al principio,
// incluso cuando la URL ya tiene el ancla #inicio.
const homeNavLink = document.querySelector('.site-nav a[href="#inicio"]');
homeNavLink?.addEventListener("click", (event) => {
  event.preventDefault();
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  header?.classList.remove("is-hidden");
  window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  if (window.location.hash !== "#inicio") {
    window.history.pushState(null, "", "#inicio");
  }
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px" }
);

revealItems.forEach((item) => observer.observe(item));

let previousScroll = window.scrollY;
window.addEventListener(
  "scroll",
  () => {
    const currentScroll = window.scrollY;
    if (currentScroll > previousScroll && currentScroll > 180) {
      header?.classList.add("is-hidden");
    } else {
      header?.classList.remove("is-hidden");
    }
    previousScroll = currentScroll;
  },
  { passive: true }
);

document.getElementById("year").textContent = new Date().getFullYear();
