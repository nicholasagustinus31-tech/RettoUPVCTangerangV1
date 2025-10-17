const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const scrollTopButton = document.querySelector('.scroll-top');
const lightboxOverlay = document.querySelector('.lightbox-overlay');
const lightboxImage = document.querySelector('.lightbox-content img');
const lightboxClose = document.querySelector('.lightbox-close');

// Navigation toggle
autoBindNav();

function autoBindNav() {
  if (!navToggle || !navLinks) return;
  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isOpen));
    navLinks.classList.toggle('open');
    navToggle.classList.toggle('active');
  });

  document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Scroll to top visibility
window.addEventListener('scroll', () => {
  if (!scrollTopButton) return;
  scrollTopButton.classList.toggle('show', window.scrollY > 300);
});

// Scroll to top action
if (scrollTopButton) {
  scrollTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Lazy loading helper
document.querySelectorAll('img[data-src]').forEach((img) => {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        img.src = img.dataset.src;
        img.onload = () => img.classList.add('loaded');
        obs.disconnect();
      }
    });
  });
  observer.observe(img);
});

// Hero text animation helper
document.querySelectorAll('.hero-text').forEach((element) => {
  const words = element.textContent.trim().split(' ');
  element.textContent = '';
  words.forEach((word, index) => {
    const span = document.createElement('span');
    span.textContent = `${word}${index !== words.length - 1 ? ' ' : ''}`;
    element.appendChild(span);
  });
});

// Product tabs logic
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

if (tabButtons.length) {
  tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const target = button.dataset.tab;
      tabButtons.forEach((btn) => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });
      tabContents.forEach((content) => {
        content.classList.remove('active');
        content.setAttribute('hidden', 'hidden');
      });
      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');
      const activeContent = document.querySelector(`.tab-content[data-tab="${target}"]`);
      if (activeContent) {
        activeContent.classList.add('active');
        activeContent.removeAttribute('hidden');
      }
    });
  });
}

// Project filter
const filterButtons = document.querySelectorAll('.filter-button');
const projectCards = document.querySelectorAll('[data-category]');

if (filterButtons.length) {
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const category = button.dataset.filter;
      filterButtons.forEach((btn) => {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      });
      button.classList.add('active');
      button.setAttribute('aria-pressed', 'true');

      projectCards.forEach((card) => {
        if (category === 'all' || card.dataset.category === category) {
          card.classList.remove('hidden');
          card.style.display = '';
        } else {
          card.classList.add('hidden');
          card.style.display = 'none';
        }
      });
    });
  });
}

// Lightbox gallery
if (lightboxOverlay && lightboxImage && lightboxClose) {
  document.querySelectorAll('[data-lightbox]').forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      const src = trigger.getAttribute('href') || trigger.dataset.lightbox;
      if (!src) return;
      lightboxImage.src = src;
      lightboxOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxOverlay.addEventListener('click', (event) => {
    if (event.target === lightboxOverlay) {
      closeLightbox();
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeLightbox();
  });
}

function closeLightbox() {
  lightboxOverlay.classList.remove('active');
  lightboxImage.src = '';
  document.body.style.overflow = '';
}

// EmailJS integration
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const submitButton = contactForm.querySelector('button[type="submit"]');
    const formStatus = document.getElementById('form-status');
    if (submitButton) submitButton.disabled = true;
    if (formStatus) {
      formStatus.textContent = 'Sending...';
      formStatus.className = 'status status--sending';
    }

    try {
      const token = await executeRecaptcha();
      const formData = {
        name: contactForm.name.value,
        email: contactForm.email.value,
        phone: contactForm.phone.value,
        message: contactForm.message.value,
        'g-recaptcha-response': token,
      };

      const emailService = window.emailjs;
      if (!emailService) {
        throw new Error('EmailJS not loaded');
      }
      await emailService.send('service_id', 'template_id', formData);

      contactForm.reset();
      if (formStatus) {
        formStatus.textContent = 'Thank you! Your message has been sent.';
        formStatus.className = 'status status--success';
      }
    } catch (error) {
      if (formStatus) {
        formStatus.textContent = 'Oops! Something went wrong. Please try again later.';
        formStatus.className = 'status status--error';
      }
      console.error('EmailJS error', error);
    } finally {
      if (submitButton) submitButton.disabled = false;
    }
  });
}

function executeRecaptcha() {
  return new Promise((resolve) => {
    if (typeof grecaptcha !== 'undefined') {
      grecaptcha.ready(() => {
        grecaptcha
          .execute('RECAPTCHA_SITE_KEY', { action: 'submit' })
          .then(resolve)
          .catch(() => resolve(''));
      });
    } else {
      resolve('');
    }
  });
}

// Initialize AOS
if (typeof AOS !== 'undefined') {
  AOS.init({
    duration: 900,
    easing: 'ease-out-quart',
    once: true,
    offset: 120,
  });
}

// Google Analytics placeholder
(function initAnalytics() {
  if (!window.dataLayer) {
    window.dataLayer = [];
  }
  function gtag() {
    window.dataLayer.push(arguments);
  }
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
})();
