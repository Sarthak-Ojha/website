// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Smooth scrolling for navigation links
  document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
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
  const header = document.querySelector('header');
  let ticking = false;
  
  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        const offset = window.pageYOffset;
        if (header) {
          header.style.backgroundPositionY = offset * 0.4 + 'px';
        }
        ticking = false;
      });
      ticking = true;
    }
  });
  
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
  document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const sideNav = document.getElementById('sideNav');
    const navOverlay = document.getElementById('navOverlay');
    
    // Toggle navigation menu
    navToggle.addEventListener('click', function() {
      sideNav.classList.toggle('open');
      navOverlay.classList.toggle('active');
    });
    
    // Close menu when clicking overlay
    navOverlay.addEventListener('click', function() {
      sideNav.classList.remove('open');
      navOverlay.classList.remove('active');
    });
    
    // Close menu when clicking a nav link (on mobile)
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        if (window.innerWidth < 992) {
          sideNav.classList.remove('open');
          navOverlay.classList.remove('active');
        }
      });
    });
  });
});