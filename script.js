// Initialize GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Custom cursor
  const cursor = document.querySelector(".cursor");

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });

  document.addEventListener("mousedown", () => {
    cursor.style.width = "15px";
    cursor.style.height = "15px";
  });

  document.addEventListener("mouseup", () => {
    cursor.style.width = "20px";
    cursor.style.height = "20px";
  });

  // Elements that should enlarge the cursor
  const links = document.querySelectorAll(
    "a, button, .feature-card, .testimonial-card"
  );

  links.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      cursor.style.width = "50px";
      cursor.style.height = "50px";
      cursor.style.backgroundColor = "rgba(99, 102, 241, 0.2)";
    });

    link.addEventListener("mouseleave", () => {
      cursor.style.width = "20px";
      cursor.style.height = "20px";
      cursor.style.backgroundColor = "rgba(99, 102, 241, 0.5)";
    });
  });

  // Header scroll effect
  const header = document.querySelector("header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Mobile menu toggle
  const menuBtn = document.querySelector(".mobile-menu-btn");
  const mobileMenu = document.querySelector(".mobile-menu");
  const menuSpans = document.querySelectorAll(".mobile-menu-btn span");

  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");

    if (mobileMenu.classList.contains("active")) {
      menuSpans[0].style.transform = "translateY(8px) rotate(45deg)";
      menuSpans[1].style.opacity = "0";
      menuSpans[2].style.transform = "translateY(-8px) rotate(-45deg)";
    } else {
      menuSpans[0].style.transform = "none";
      menuSpans[1].style.opacity = "1";
      menuSpans[2].style.transform = "none";
    }
  });

  // Close mobile menu when clicking on a link
  const mobileLinks = document.querySelectorAll(".mobile-menu a");

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
      menuSpans[0].style.transform = "none";
      menuSpans[1].style.opacity = "1";
      menuSpans[2].style.transform = "none";
    });
  });

  // Split text animation
  const splitTextElements = document.querySelectorAll(".split-text");

  splitTextElements.forEach((element) => {
    const text = element.textContent;
    element.textContent = "";

    for (let i = 0; i < text.length; i++) {
      const char = document.createElement("span");
      char.className = "char";
      char.style.transitionDelay = i * 0.03 + "s";
      char.textContent = text[i] === " " ? "\u00A0" : text[i];
      element.appendChild(char);
    }
  });

  // Animate hero section on load
  const heroTitle = document.querySelector(".hero-content h1 .char");
  const heroDescription = document.querySelector(".hero-description");
  const heroButtons = document.querySelector(".hero-buttons");
  const heroImage = document.querySelector(".hero-image");

  if (heroTitle) {
    gsap.to(".hero-content h1 .char", {
      opacity: 1,
      y: 0,
      stagger: 0.03,
      delay: 0.2,
      duration: 0.6,
      ease: "power2.out",
    });
  }

  gsap.from(heroDescription, {
    opacity: 0,
    y: 20,
    duration: 0.8,
    delay: 0.6,
    ease: "power2.out",
  });

  gsap.from(heroButtons, {
    opacity: 0,
    y: 20,
    duration: 0.8,
    delay: 0.8,
    ease: "power2.out",
  });

  gsap.from(heroImage, {
    opacity: 0,
    x: 50,
    duration: 1,
    delay: 0.4,
    ease: "power2.out",
  });

  // Floating elements animation
  const floatingElements = document.querySelectorAll(".floating-element");

  floatingElements.forEach((element, index) => {
    gsap.to(element, {
      y: index % 2 === 0 ? 20 : -20,
      x: index % 3 === 0 ? 15 : -15,
      rotation: index % 2 === 0 ? 10 : -10,
      duration: 3 + index,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  });

  // Scroll animations
  const fadeElements = document.querySelectorAll(
    ".section-header, .feature-card, .about-text p, .about-image, .testimonial-card, .cta-content, .contact-form"
  );

  fadeElements.forEach((element) => {
    gsap.from(element, {
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "power2.out",
    });
  });

  // Split text scroll animations
  const scrollSplitTexts = document.querySelectorAll(
    ".section-header h2.split-text, .about-text h2.split-text, .cta-content h2.split-text"
  );

  scrollSplitTexts.forEach((element) => {
    const chars = element.querySelectorAll(".char");

    gsap.to(chars, {
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        toggleActions: "play none none none",
      },
      opacity: 1,
      y: 0,
      stagger: 0.03,
      duration: 0.6,
      ease: "power2.out",
    });
  });

  // Stats counter animation
  const stats = document.querySelectorAll(".stat-number");

  stats.forEach((stat) => {
    const value = parseInt(stat.getAttribute("data-value"));

    gsap.to(stat, {
      scrollTrigger: {
        trigger: stat,
        start: "top 80%",
        toggleActions: "play none none none",
      },
      innerText: value,
      duration: 2,
      snap: { innerText: 1 },
      ease: "power2.out",
    });
  });

  // Testimonial slider
  const testimonialTrack = document.querySelector(".testimonial-track");
  const testimonialCards = document.querySelectorAll(".testimonial-card");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const dots = document.querySelectorAll(".dot");
  let currentIndex = 0;

  function updateSlider() {
    testimonialTrack.style.transform = `translateX(-${currentIndex * 100}%)`;

    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  }

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % testimonialCards.length;
    updateSlider();
  });

  prevBtn.addEventListener("click", () => {
    currentIndex =
      (currentIndex - 1 + testimonialCards.length) % testimonialCards.length;
    updateSlider();
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentIndex = index;
      updateSlider();
    });
  });

  // Auto slide testimonials
  let testimonialInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % testimonialCards.length;
    updateSlider();
  }, 5000);

  // Pause auto slide on hover
  testimonialTrack.addEventListener("mouseenter", () => {
    clearInterval(testimonialInterval);
  });

  testimonialTrack.addEventListener("mouseleave", () => {
    testimonialInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % testimonialCards.length;
      updateSlider();
    }, 5000);
  });

  // Form submission
  const contactForm = document.querySelector(".contact-form");

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Simulate form submission
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.textContent = "Thank You!";
      contactForm.reset();

      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 2000);
    }, 1500);
  });
});
