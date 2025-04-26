document.addEventListener("DOMContentLoaded", function () {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navbar = document.querySelector(".navbar");

  mobileMenuBtn.addEventListener("click", function () {
    navbar.classList.toggle("active");
    mobileMenuBtn.innerHTML = navbar.classList.contains("active")
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-bars"></i>';
  });

  // Close mobile menu when clicking a link
  const navLinks = document.querySelectorAll(".navbar ul li a");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (navbar.classList.contains("active")) {
        navbar.classList.remove("active");
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
      }
    });
  });

  // Header scroll effect
  const header = document.querySelector(".header");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Testimonial Slider
  const testimonials = document.querySelectorAll(".testimonial");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.querySelector(".slider-prev");
  const nextBtn = document.querySelector(".slider-next");
  let currentIndex = 0;

  function showTestimonial(index) {
    testimonials.forEach((testimonial) =>
      testimonial.classList.remove("active")
    );
    dots.forEach((dot) => dot.classList.remove("active"));

    testimonials[index].classList.add("active");
    dots[index].classList.add("active");
    currentIndex = index;
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", function () {
      showTestimonial(index);
    });
  });

  prevBtn.addEventListener("click", function () {
    let newIndex = currentIndex - 1;
    if (newIndex < 0) newIndex = testimonials.length - 1;
    showTestimonial(newIndex);
  });

  nextBtn.addEventListener("click", function () {
    let newIndex = currentIndex + 1;
    if (newIndex >= testimonials.length) newIndex = 0;
    showTestimonial(newIndex);
  });

  // Auto-rotate testimonials
  let testimonialInterval = setInterval(() => {
    let newIndex = currentIndex + 1;
    if (newIndex >= testimonials.length) newIndex = 0;
    showTestimonial(newIndex);
  }, 5000);

  // Pause auto-rotation on hover
  const testimonialSlider = document.querySelector(".testimonial-slider");
  testimonialSlider.addEventListener("mouseenter", function () {
    clearInterval(testimonialInterval);
  });

  testimonialSlider.addEventListener("mouseleave", function () {
    testimonialInterval = setInterval(() => {
      let newIndex = currentIndex + 1;
      if (newIndex >= testimonials.length) newIndex = 0;
      showTestimonial(newIndex);
    }, 5000);
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Form validation for contact page
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !message) {
        alert("Please fill in all fields");
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Please enter a valid email address");
        return;
      }

      // Here you would typically send the form data to your server
      // For this example, we'll just show a success message
      alert("Thank you for your message! We will get back to you soon.");
      contactForm.reset();
    });
  }
});
