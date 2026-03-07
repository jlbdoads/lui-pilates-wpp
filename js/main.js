/* ========================================
   LUI PILATES - Main JS
   Leve e otimizado
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  
  // Header scroll effect
  const header = document.getElementById('header');
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });
  
  // Mobile nav toggle
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('nav');
  const navClose = document.getElementById('nav-close');
  const navLinks = document.querySelectorAll('.nav-list a');
  
  // Criar overlay para fechar menu ao clicar fora
  const overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  document.body.appendChild(overlay);
  
  function closeNav() {
    nav.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  function openNav() {
    nav.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  
  if (navToggle && nav) {
    navToggle.addEventListener('click', openNav);
  }
  
  if (navClose) {
    navClose.addEventListener('click', closeNav);
  }
  
  // Fechar ao clicar no overlay
  overlay.addEventListener('click', closeNav);
  
  // Close nav on link click
  navLinks.forEach(link => {
    link.addEventListener('click', closeNav);
  });
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const headerHeight = header ? header.offsetHeight : 0;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // Meta Pixel Event Tracking
  const btnAgendarList = document.querySelectorAll('.btn-agendar');
  btnAgendarList.forEach(btn => {
    btn.addEventListener('click', () => {
      if (typeof fbq === 'function') {
        fbq('track', 'AddToCart', {
          content_name: 'Lui Start',
        });
      }
    });
  });

  // Track Scroll PageView (optional basic implementation)
  let scrolledPageView = false;
  window.addEventListener('scroll', () => {
    if (!scrolledPageView && window.scrollY > window.innerHeight / 2) {
      if (typeof fbq === 'function') {
        // Just as an extra event for "Scroll", the main PageView is in head
        fbq('trackCustom', 'ScrollPageView');
      }
      scrolledPageView = true;
    }
  });
  
  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe elements
  document.querySelectorAll('.service-card, .feature-item, .about-content, .features-content').forEach(el => {
    observer.observe(el);
  });
  
});

// Add CSS for fade-in animation
const style = document.createElement('style');
style.textContent = `
  .fade-in {
    animation: fadeIn 0.6s ease forwards;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .service-card:nth-child(2),
  .feature-item:nth-child(2) {
    animation-delay: 0.1s;
  }
  
  .service-card:nth-child(3),
  .feature-item:nth-child(3) {
    animation-delay: 0.2s;
  }
  
  .service-card:nth-child(4) {
    animation-delay: 0.3s;
  }
`;
document.head.appendChild(style);
