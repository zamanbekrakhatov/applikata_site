// Mobile burger menu
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

if (burger && mobileMenu) {
  burger.addEventListener('click', () => {
    const isHidden = mobileMenu.style.display === 'none' || mobileMenu.style.display === '';
    mobileMenu.style.display = isHidden ? 'block' : 'none';
  });
}

// IntersectionObserver for fade-in animations
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all fade-in and slide-left elements
document.querySelectorAll('.fade-in, .slide-left').forEach(el => {
  observer.observe(el);
});

// Auto-scroll reviews carousel
const reviewsContainer = document.querySelector('.reviews');
if (reviewsContainer) {
  let scrollPosition = 0;
  const scrollSpeed = 320; // width of one review card
  
  setInterval(() => {
    scrollPosition += scrollSpeed;
    
    // Reset to beginning if reached the end
    if (scrollPosition >= reviewsContainer.scrollWidth - reviewsContainer.clientWidth) {
      scrollPosition = 0;
    }
    
    reviewsContainer.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
  }, 4000);
}

// Animated counters in results section
const animateCounter = (element) => {
  const target = parseInt(element.getAttribute('data-target')) || 0;
  const duration = 2000; // 2 seconds
  const steps = 60;
  const increment = target / steps;
  let current = 0;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    
    // Add % symbol if it's the percentage card
    const isPercentage = element.parentElement.style.background.includes('ff8a4b');
    element.textContent = Math.floor(current) + (isPercentage ? '%' : '');
  }, duration / steps);
};

// Observe counter elements
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.result-card .big[data-target]').forEach(el => {
  counterObserver.observe(el);
});

// Contact form handler
const sendBtn = document.getElementById('sendBtn');
if (sendBtn) {
  sendBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('fname').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('msg').value.trim();
    
    // Simple validation
    if (!name || !phone || !email) {
      alert('Барлық міндетті өрістерді толтырыңыз: Аты-жөні, Телефон, Email');
      return;
    }
    
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Email форматы дұрыс емес');
      return;
    }
    
    // Success message
    alert(`Рақмет, ${name}! Сіздің хабарламаңыз қабылданды. Біз жақын арада хабарласамыз.`);
    
    // Clear form fields
    document.getElementById('fname').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('email').value = '';
    document.getElementById('msg').value = '';
  });
}

// Smooth scroll for anchor links with offset for fixed nav
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    
    // Skip if it's just "#" or empty
    if (href === '#' || href.length <= 1) {
      return;
    }
    
    e.preventDefault();
    
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const navHeight = 80; // approximate nav height
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      // Close mobile menu if open
      if (window.innerWidth < 981 && mobileMenu) {
        mobileMenu.style.display = 'none';
      }
    }
  });
});

// Add scroll effect to navigation
let lastScroll = 0;
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    nav.style.boxShadow = '0 6px 24px rgba(16,24,40,0.12)';
  } else {
    nav.style.boxShadow = '0 6px 24px rgba(16,24,40,0.05)';
  }
  
  lastScroll = currentScroll;
});

console.log('✅ Applikata сайты дайын!');
