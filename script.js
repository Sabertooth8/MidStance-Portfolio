// =============================================
// PORTFOLIO INTERACTIVE EFFECTS
// =============================================

// === SCROLL REVEAL ANIMATION ===
const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

sections.forEach((sec) => observer.observe(sec));

// === INFINITE CAROUSEL (Seamless Loop) ===
const carousel = document.querySelector('.carousel');
if (carousel) {
  const cards = Array.from(carousel.children);

  // Clone cards once for seamless infinite scroll
  cards.forEach((card) => {
    const clone = card.cloneNode(true);
    carousel.appendChild(clone);
  });
}

// === BACK TO TOP BUTTON ===
const backToTopButton = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopButton.classList.add('show');
  } else {
    backToTopButton.classList.remove('show');
  }
});

backToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// === CURSOR GLOW EFFECT ===
const cursorGlow = document.createElement('div');
cursorGlow.classList.add('cursor-glow');
document.body.appendChild(cursorGlow);

let mouseX = 0, mouseY = 0;
let glowX = 0, glowY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  glowX += (mouseX - glowX) * 0.08;
  glowY += (mouseY - glowY) * 0.08;

  cursorGlow.style.left = glowX + 'px';
  cursorGlow.style.top = glowY + 'px';

  requestAnimationFrame(animateCursor);
}
animateCursor();

// === TYPEWRITER EFFECT ===
const typewriterElement = document.querySelector('.hero-text h1 span');
if (typewriterElement) {
  const originalText = typewriterElement.textContent;
  typewriterElement.textContent = '';

  let charIndex = 0;

  function typeWriter() {
    if (charIndex < originalText.length) {
      typewriterElement.textContent += originalText.charAt(charIndex);
      charIndex++;
      setTimeout(typeWriter, 120);
    }
  }

  // Start typewriter after page load
  setTimeout(typeWriter, 800);
}

// === PARTICLE BACKGROUND ===
function createParticles() {
  const canvas = document.createElement('canvas');
  canvas.id = 'particles-canvas';
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  let particles = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = (Math.random() - 0.5) * 0.3;
      this.opacity = Math.random() * 0.5 + 0.1;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 240, 255, ${this.opacity})`;
      ctx.fill();
    }
  }

  // Create particles
  for (let i = 0; i < 60; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });

    // Draw connections between nearby particles
    particles.forEach((a, i) => {
      particles.slice(i + 1).forEach(b => {
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(0, 240, 255, ${0.1 * (1 - distance / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });
    });

    requestAnimationFrame(animate);
  }

  animate();
}

createParticles();

// === 3D TILT EFFECT FOR CARDS ===
const tiltCards = document.querySelectorAll('.card, .gallery-item');

tiltCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.02)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// === SMOOTH NAVBAR SCROLL ===
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

// Hamburger menu toggle
if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });
}

// Smooth scroll for nav links
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Active link on scroll
const navSections = document.querySelectorAll('section[id]');

function activateNavLink() {
  const scrollY = window.scrollY;

  navSections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 150;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach(link => link.classList.remove('active'));
      if (navLink) navLink.classList.add('active');
    }
  });
}

window.addEventListener('scroll', activateNavLink);

// Navbar shrink on scroll
const navContainer = document.querySelector('.nav-container');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navContainer.classList.add('scrolled');
  } else {
    navContainer.classList.remove('scrolled');
  }
});

// === PARALLAX EFFECT ON HERO IMAGE ===
const heroImage = document.querySelector('.hero-image img');
if (heroImage) {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const parallaxOffset = scrollY * 0.3;

    if (scrollY < window.innerHeight) {
      heroImage.style.transform = `translateY(${parallaxOffset}px)`;
    }
  });
}

// === LOADING ANIMATION ===
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';

  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
});

// === CONTACT FORM HANDLING ===
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const company = document.getElementById('company').value || 'Not specified';
    const message = document.getElementById('message').value;

    // Build email subject and body
    const subject = `Business Inquiry - ${name}${company !== 'Not specified' ? ` (${company})` : ''}`;
    const body = `Halo Midstance Agency,

Saya ${name} ingin mengajukan inquiry:

───────────────────────────
📧 Email: ${email}
🏢 Company: ${company}
───────────────────────────

📝 Message:
${message}

───────────────────────────
Sent from Midstance Website Contact Form`;

    // Encode for URL
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);

    // Create mailto link
    const mailtoLink = `mailto:ponyoo274@gmail.com?subject=${encodedSubject}&body=${encodedBody}`;

    // Open email client
    window.location.href = mailtoLink;

    // Visual feedback
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.innerHTML = '<span>Opening Email...</span><span class="btn-arrow">→</span>';
    submitBtn.style.backgroundColor = '#00f0ff';
    submitBtn.style.color = '#050505';

    // Reset button after delay
    setTimeout(() => {
      submitBtn.innerHTML = '<span>Accept Proposal</span><span class="btn-arrow">→</span>';
      submitBtn.style.backgroundColor = '';
      submitBtn.style.color = '';
    }, 2000);
  });
}
