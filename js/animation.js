document.addEventListener("DOMContentLoaded", function () {
  // ========== SCROLL PROGRESS BAR ==========
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.appendChild(progressBar);
  
  const mainContent = document.querySelector('.main-content');
  
  function updateScrollProgress() {
    if (!mainContent) return;
    const scrollTop = mainContent.scrollTop;
    const scrollHeight = mainContent.scrollHeight - mainContent.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = progress + '%';
  }
  
  if (mainContent) {
    mainContent.addEventListener('scroll', updateScrollProgress);
  }
  
  // ========== TYPEWRITER ==========
  const typedTextElement = document.getElementById("typed-text");
  const phrases = [
    "Graduada en Desarrollo de Aplicaciones Web",
    "En búsqueda de mi primera oportunidad junior",
    "React · PHP · Java · WordPress",
    "+12 proyectos en GitHub",
    "UI/UX focused developer"
  ];
  
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  
  function typeWriter() {
    if (!typedTextElement) return;
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      typedTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }
    
    let typeSpeed = 60;
    
    if (isDeleting) {
      typeSpeed = 35;
    }
    
    if (!isDeleting && charIndex === currentPhrase.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 500;
    }
    
    setTimeout(typeWriter, typeSpeed);
  }
  
  if (typedTextElement) {
    setTimeout(typeWriter, 500);
  }
  
  // ========== CONTADORES ANIMADOS ==========
  const counters = document.querySelectorAll('.stat-number');
  let counted = false;
  
  function animateCounters() {
    if (counted) return;
    
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      let current = 0;
      const increment = target / 50;
      const updateCounter = () => {
        current += increment;
        if (current < target) {
          counter.textContent = Math.floor(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };
      updateCounter();
    });
    counted = true;
  }
  
  // ========== SCROLL ANIMATIONS MEJORADAS ==========
  const animatedElements = [
    { selector: '.hero-left', animation: 'fade-left' },
    { selector: '.hero-right', animation: 'fade-right' },
    { selector: '.skill-card', animation: 'scale-in' },
    { selector: '.project-card', animation: 'scale-in' },
    { selector: '.timeline-item', animation: 'fade-left' },
    { selector: '.learning-card', animation: 'scale-in' },
    { selector: '.about-grid', animation: 'fade-up' },
    { selector: '.contact-card', animation: 'fade-left' },
    { selector: '.stats-card', animation: 'scale-in' }
  ];
  
  // Añadir clases de animación a los elementos
  animatedElements.forEach(item => {
    const elements = document.querySelectorAll(item.selector);
    elements.forEach(el => {
      el.classList.add('section-fade', item.animation);
    });
  });
  
  const observerOptions = {
    threshold: 0.25,
    rootMargin: "0px 0px -80px 0px"
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 80);
        
        if (entry.target.closest('#habilidades') && !counted) {
          animateCounters();
          animateSkillBars();
        }
        
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observar todos los elementos con sección-fade
  document.querySelectorAll('.section-fade').forEach(el => {
    observer.observe(el);
  });
  
  // Forzar animación inicial
  setTimeout(() => {
    document.querySelectorAll('.section-fade').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        el.classList.add('visible');
      }
    });
  }, 300);
  
  // ========== ACTIVE NAV EN SIDEBAR ==========
  const navLinks = document.querySelectorAll('.nav-menu a');
  const sections = document.querySelectorAll('.snap-section');
  
  function updateActiveNav() {
    if (!mainContent) return;
    
    const scrollPosition = mainContent.scrollTop + 120;
    let activeFound = false;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        activeFound = true;
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
    
    if (!activeFound && mainContent.scrollTop < 100) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#inicio') {
          link.classList.add('active');
        }
      });
    }
  }
  
  if (mainContent) {
    mainContent.addEventListener('scroll', () => {
      updateActiveNav();
      updateScrollProgress();
    });
    setTimeout(updateActiveNav, 100);
  }
  
  // ========== CLICK EN NAV LINKS ==========
  navLinks.forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        const targetElement = document.querySelector(href);
        if (targetElement && mainContent) {
          const offsetTop = targetElement.offsetTop;
          mainContent.scrollTo({ top: offsetTop, behavior: 'smooth' });
          
          // Cerrar menú móvil
          if (window.innerWidth <= 768) {
            const sidebar = document.querySelector('.sidebar');
            const menuToggle = document.getElementById('menuToggle');
            if (sidebar && sidebar.classList.contains('open')) {
              sidebar.classList.remove('open');
              if (menuToggle) {
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
              }
            }
          }
        }
      }
    });
  });
  
  // ========== CLICK EN LOGO ==========
  const logo = document.querySelector('.sidebar-logo a');
  if (logo) {
    logo.addEventListener('click', function (e) {
      e.preventDefault();
      if (mainContent) {
        mainContent.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }
  
  // ========== MODO OSCURO ==========
  const darkModeToggle = document.querySelector('.sidebar-dark-toggle');
  const darkModeIcon = darkModeToggle?.querySelector('i');
  
  const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const savedMode = localStorage.getItem("darkMode");
  
  if (savedMode === "dark" || (prefersDarkMode && savedMode !== "light")) {
    document.body.classList.add("dark-mode");
    if (darkModeIcon) {
      darkModeIcon.classList.remove("fa-moon");
      darkModeIcon.classList.add("fa-sun");
    }
    if (darkModeToggle) {
      darkModeToggle.setAttribute('data-tooltip', 'Modo claro');
    }
  }
  
  darkModeToggle?.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    
    if (isDark) {
      darkModeIcon?.classList.remove("fa-moon");
      darkModeIcon?.classList.add("fa-sun");
      darkModeToggle.setAttribute('data-tooltip', 'Modo claro');
      localStorage.setItem("darkMode", "dark");
    } else {
      darkModeIcon?.classList.remove("fa-sun");
      darkModeIcon?.classList.add("fa-moon");
      darkModeToggle.setAttribute('data-tooltip', 'Modo oscuro');
      localStorage.setItem("darkMode", "light");
    }
  });
  
  // ========== ANIMACIÓN BARRAS DE HABILIDADES ==========
  const skillBars = document.querySelectorAll('.skill-progress');
  
  function animateSkillBars() {
    skillBars.forEach(bar => {
      const width = bar.style.width;
      bar.style.width = '0%';
      setTimeout(() => {
        bar.style.width = width;
      }, 150);
    });
  }
  
  // ========== MENÚ HAMBURGUESA ==========
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.querySelector('.sidebar');
  
  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', function() {
      sidebar.classList.toggle('open');
      const icon = menuToggle.querySelector('i');
      if (sidebar.classList.contains('open')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  }
  
  // ========== EFECTO PARALLAX EN HERO ==========
  const heroPattern = document.querySelector('.hero-pattern');
  if (heroPattern && mainContent) {
    mainContent.addEventListener('scroll', () => {
      const scrollPosition = mainContent.scrollTop;
      if (scrollPosition < window.innerHeight) {
        heroPattern.style.transform = `translateY(${scrollPosition * 0.3}px)`;
      }
    });
  }
  
  // ========== TARJETAS CON EFECTO DE BRILLO ==========
  const cards = document.querySelectorAll('.glass-card, .skill-card, .timeline-content, .contact-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  });
  
  console.log('Portfolio Profesional con Sidebar Glassmorphism - Cargado');
});