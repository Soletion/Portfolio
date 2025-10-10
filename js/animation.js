
document.addEventListener("DOMContentLoaded", function () {
  // Efecto de escritura en el texto del hero
  const typingElement = document.getElementById("typing-text");
  const phrases = [
    "Desarrolladora Web Junior | Apasionada por la tecnología y el aprendizaje constante 🚀",
  ];
  
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isEnd = false;
  
  function typeWriter() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      // Borrando caracteres
      typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      // Escribiendo caracteres
      typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }
    
    // Determinar la velocidad de escritura/borrado
    let typeSpeed = 100; 
    
    if (isDeleting) {
      typeSpeed /= 2; 
    }
    
    // Cuando termine de escribir una frase
    if (!isDeleting && charIndex === currentPhrase.length) {
      isEnd = true;
      typeSpeed = 2000; 
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex++;
      if (phraseIndex >= phrases.length) {
        phraseIndex = 0;
      }
    }
    
    setTimeout(typeWriter, typeSpeed);
  }
  
  // Iniciar el efecto después de un breve delay
  setTimeout(typeWriter, 1000);

  // Modo oscuro
  const darkModeToggle = document.querySelector(".dark-mode-toggle");
  const darkModeIcon = darkModeToggle.querySelector("i");

  // Detectar preferencia del sistema y estado guardado
  const prefersDarkMode = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const savedMode = localStorage.getItem("darkMode");

  if (savedMode === "dark" || (prefersDarkMode && savedMode !== "light")) {
    document.body.classList.add("dark-mode");
    darkModeIcon.classList.replace("fa-moon", "fa-sun");
  }

  darkModeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      darkModeIcon.classList.replace("fa-moon", "fa-sun");
      localStorage.setItem("darkMode", "dark");
    } else {
      darkModeIcon.classList.replace("fa-sun", "fa-moon");
      localStorage.setItem("darkMode", "light");
    }
  });

  // Scroll suave para enlaces de navegación
  document.querySelectorAll('nav a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80; // Ajuste para el header fijo
        
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // Mostrar/ocultar botón "volver arriba"
  const backToTopButton = document.querySelector(".back-to-top");

  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add("show");
    } else {
      backToTopButton.classList.remove("show");
    }
  });

  backToTopButton.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Animaciones al hacer scroll
  const sections = document.querySelectorAll("section");

  function checkScroll() {
    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (sectionTop < windowHeight * 0.75) {
        section.classList.add("active");
      }
    });
  }

  // Ejecutar al cargar y al hacer scroll
  checkScroll();
  window.addEventListener("scroll", checkScroll);

  // Efecto hover en tarjetas de proyectos (para las tarjetas flip)
  const projectCards = document.querySelectorAll(".card");

  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.02)";
      this.style.transition = "transform 0.3s ease";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)";
    });
  });

  // Validación del formulario de contacto
  const contactForm = document.querySelector("#contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Validación de campos
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      // Validación simple de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!name || !email || !message) {
        showNotification("Por favor completa todos los campos del formulario.", "error");
        return;
      }

      if (!emailRegex.test(email)) {
        showNotification("Por favor ingresa un email válido.", "error");
        return;
      }

      // Simular envío del formulario
      showNotification("¡Gracias por tu mensaje! Me pondré en contacto contigo pronto.", "success");
      contactForm.reset();
    });
  }

  // Función para mostrar notificaciones
  function showNotification(message, type) {
    // Crear elemento de notificación
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Estilos de la notificación
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      padding: 15px 20px;
      border-radius: 5px;
      color: white;
      font-weight: 500;
      z-index: 10000;
      transform: translateX(100%);
      transition: transform 0.3s ease;
      max-width: 300px;
    `;
    
    if (type === "success") {
      notification.style.background = "#4CAF50";
    } else {
      notification.style.background = "#f44336";
    }
    
    document.body.appendChild(notification);
    
    // Animación de entrada
    setTimeout(() => {
      notification.style.transform = "translateX(0)";
    }, 100);
    
    // Remover después de 5 segundos
    setTimeout(() => {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 5000);
  }

  // Animación de la foto de perfil al hacer clic
  const profilePic = document.querySelector(".profile-pic");
  if (profilePic) {
    profilePic.addEventListener("click", function () {
      this.style.transform = "scale(1.1) rotate(5deg)";
      
      setTimeout(() => {
        this.style.transform = "";
      }, 600);
    });
    
    // Animar al hacer hover
    profilePic.addEventListener("mouseenter", function () {
      this.style.transition = "transform 0.3s ease";
    });
  }

  // Efecto de scroll para el enlace "scroll-down"
  const scrollDownLink = document.querySelector(".scroll-down");
  if (scrollDownLink) {
    scrollDownLink.addEventListener("click", function (e) {
      e.preventDefault();
      
      const targetSection = document.querySelector("#sobre-mi");
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80;
        
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  }

  // Mejorar accesibilidad del formulario
  const formInputs = document.querySelectorAll(".form-control");
  formInputs.forEach(input => {
    // Agregar etiquetas ARIA dinámicamente
    if (!input.getAttribute("aria-label")) {
      const label = input.previousElementSibling;
      if (label && label.tagName === "LABEL") {
        input.setAttribute("aria-label", label.textContent);
      }
    }
    
    // Feedback visual al enfocar
    input.addEventListener("focus", function() {
      this.parentElement.classList.add("focused");
    });
    
    input.addEventListener("blur", function() {
      this.parentElement.classList.remove("focused");
    });
  });

  // Prevenir envío del formulario con Enter en campos individuales
  document.querySelectorAll('.form-control').forEach(input => {
    input.addEventListener('keypress', function(e) {
      if (e.key === 'Enter' && !e.target.form) {
        e.preventDefault();
      }
    });
  });
});

// CSS adicional para estados de formulario
const additionalStyles = `
  .form-group.focused label {
    color: var(--primary);
    font-weight: 700;
  }
  
  .form-group.focused .form-control {
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(255, 111, 49, 0.1);
  }
`;

// Inyectar estilos adicionales
const styleSheet = document.createElement("style");
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);