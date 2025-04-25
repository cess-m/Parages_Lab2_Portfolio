document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("themeToggle");
  const body = document.body;


  // Toggle dark mode
  toggleButton?.addEventListener("click", () => {
    body.classList.toggle("dark");
  });


  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      target?.scrollIntoView({ behavior: "smooth" });
    });
  });  


  // "Hire Me" button scrolls to contact
  document.getElementById("hireMe")?.addEventListener("click", () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  });


  // Glow + scroll animation effect for sections
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active-section");
        entry.target.classList.add("fade-in-up"); // add animation class
      }
    });
  }, { threshold: 0.2 });


  document.querySelectorAll(".section").forEach(section => {
    observer.observe(section);
  });


  // Animate individual fade/slide elements on scroll
  const animatable = document.querySelectorAll(".fade-in, .slide-in-left, .slide-in-right");
  const animObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animated");
        animObserver.unobserve(entry.target); // animate once
      }
    });
  }, { threshold: 0.3 });


  animatable.forEach(el => animObserver.observe(el));


  // Typewriter effect
  const roles = [
    "a passionate coder",
    "a web developer",
    "a software developer",
    "a sport enthusiast"
  ];


  let index = 0;
  let charIndex = 0;
  const speed = 90;
  const pause = 1300;
  const typewriter = document.getElementById("typewriter");


  function type() {
    if (!typewriter) return;
    if (charIndex < roles[index].length) {
      typewriter.innerHTML = roles[index]
    .substring(0, charIndex)
    + `<span>${roles[index].charAt(charIndex++)}</span>`;
      setTimeout(type, speed);
    } else {
      setTimeout(erase, pause);
    }
  }


  function erase() {
    if (!typewriter) return;
    if (charIndex > 0) {
      typewriter.textContent = roles[index].substring(0, --charIndex);
      setTimeout(erase, speed / 2);
    } else {
      index = (index + 1) % roles.length;
      setTimeout(type, speed);
    }
  }

  if (window.location.href.includes("#contact")) {
    const formWrapper = document.querySelector(".contact-form");
    const thankYou = document.createElement("p");
    thankYou.textContent = "✅ Message sent! Thanks for reaching out 💌";
    thankYou.style.textAlign = "center";
    thankYou.style.color = "green";
    thankYou.style.fontWeight = "bold";
    thankYou.style.marginTop = "1rem";
    formWrapper?.appendChild(thankYou);

    // Optional: auto-hide after 5 seconds
    setTimeout(() => thankYou.remove(), 5000);
  }

  if (typewriter) type();
});


// Auto-highlight nav link on scroll
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".navbar a");


  let current = "";


  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });


  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});


