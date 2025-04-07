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
  
    // Intersection Observer for section animations
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.1
    });
  
    sections.forEach(section => {
      observer.observe(section);
    });
  
    // Typewriter effect for the tagline
    const tagline = document.querySelector('.tagline');
    const text = tagline.innerText;
    tagline.innerText = '';
    
    let i = 0;
    function typeWriter() {
      if (i < text.length) {
        tagline.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    }
    
    // Start the typewriter effect after a short delay
    setTimeout(typeWriter, 1000);
    
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
    
    // Add parallax effect to header
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
      const offset = window.pageYOffset;
      header.style.backgroundPositionY = offset * 0.5 + 'px';
    });
  });