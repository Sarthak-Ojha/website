// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize header once
  const header = document.querySelector('header');
  
  // Mobile navigation setup
  const mobileNavToggle = document.createElement('button');
  mobileNavToggle.className = 'mobile-nav-toggle';
  mobileNavToggle.setAttribute('aria-label', 'Toggle navigation menu');
  mobileNavToggle.innerHTML = '<span></span><span></span><span></span>';
  
  const mobileNavOverlay = document.createElement('div');
  mobileNavOverlay.className = 'mobile-nav-overlay';
  mobileNavOverlay.id = 'mobileNavOverlay';
  
  // Add elements to the DOM
  if (header) {
    header.appendChild(mobileNavToggle);
  }
  document.body.appendChild(mobileNavOverlay);
  
  const navMenu = document.querySelector('nav ul');
  
  // Toggle navigation menu
  mobileNavToggle.addEventListener('click', function() {
    mobileNavToggle.classList.toggle('open');
    navMenu.classList.toggle('open');
    mobileNavOverlay.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
  });
  
  // Close menu when clicking overlay
  mobileNavOverlay.addEventListener('click', function() {
    mobileNavToggle.classList.remove('open');
    navMenu.classList.remove('open');
    mobileNavOverlay.classList.remove('active');
    document.body.style.overflow = '';
  });
  
  // Smooth scrolling for navigation links
  document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
      
      // Close menu when clicking a nav link (on mobile)
      if (window.innerWidth <= 992) {
        mobileNavToggle.classList.remove('open');
        navMenu.classList.remove('open');
        mobileNavOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // Enhanced Intersection Observer for better animations
  const sections = document.querySelectorAll('section');
  const footer = document.querySelector('footer'); // For contact section
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px' // Trigger slightly before element enters viewport
  };
  
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Add staggered animation to items within the section
        const items = entry.target.querySelectorAll('.project-item, .education-item, .skills-category, .contact-card');
        items.forEach((item, index) => {
          item.style.transitionDelay = `${index * 0.1}s`;
        });
      }
    });
  }, observerOptions);
  
  sections.forEach(section => {
    sectionObserver.observe(section);
  });
  
  // Also observe the footer for contact section
  if (footer) {
    sectionObserver.observe(footer);
  }
  
  // Enhanced Typewriter effect with blinking cursor
  const tagline = document.querySelector('.tagline');
  if (tagline) {
    const text = tagline.innerText;
    tagline.innerHTML = '<span></span><span class="cursor">|</span>';
    const textSpan = tagline.querySelector('span:first-child');
    const cursorSpan = tagline.querySelector('.cursor');
    
    // Add blinking cursor style
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
      }
      .cursor {
        animation: blink 1s infinite;
        color: white;
        font-weight: bold;
      }
    `;
    document.head.appendChild(style);
    
    let i = 0;
    function typeWriter() {
      if (i < text.length) {
        textSpan.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      } else {
        // Remove cursor after typing completes
        setTimeout(() => {
          cursorSpan.style.display = 'none';
        }, 1500);
      }
    }
    
    // Start the typewriter effect after a short delay
    setTimeout(typeWriter, 1000);
  }
  
  // Add hover effect to skill items
  const skillItems = document.querySelectorAll('.skills-category li');
  skillItems.forEach(item => {
    item.addEventListener('mouseover', function() {
      this.style.transform = 'scale(1.1)';
    });
    
    item.addEventListener('mouseout', function() {
      this.style.transform = 'scale(1.0)';
    });
  });
  
  // Parallax effect for header with better performance
  let ticking = false;
  
  function optimizeScroll() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        const offset = window.pageYOffset;
        if (header && window.innerWidth > 768) { // Only apply parallax on non-mobile
          header.style.backgroundPositionY = offset * 0.4 + 'px';
        }
        ticking = false;
      });
      ticking = true;
    }
  }
  
  window.addEventListener('scroll', optimizeScroll);
  
  // Add a subtle hover effect to the profile image
  const profileImg = document.querySelector('.profile img');
  if (profileImg) {
    profileImg.addEventListener('mouseover', function() {
      this.style.transform = 'scale(1.1) rotate(5deg)';
      this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
    });
    
    profileImg.addEventListener('mouseout', function() {
      this.style.transform = '';
      this.style.boxShadow = '';
    });
  }
  
  // Add improved touch interactions for mobile
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    const touchItems = document.querySelectorAll('.project-item, .skills-category li, .contact-card');
    
    touchItems.forEach(item => {
      item.addEventListener('touchstart', function() {
        this.classList.add('touch-active');
      }, {passive: true});
      
      item.addEventListener('touchend', function() {
        this.classList.remove('touch-active');
      }, {passive: true});
    });
  }
  
  // Add resize handler for better mobile performance
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      // Reset any mobile-specific states when resizing to desktop
      if (window.innerWidth > 992) {
        mobileNavToggle.classList.remove('open');
        navMenu.classList.remove('open');
        mobileNavOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    }, 250);
  });

});