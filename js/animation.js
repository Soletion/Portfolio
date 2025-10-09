// animation.js
document.addEventListener("DOMContentLoaded", function () {
  // Efecto de escritura en el título
  const titleElement = document.querySelector(".title");
  const titleText = titleElement.textContent;
  titleElement.textContent = "";

  let index = 0;
  function type() {
    if (index < titleText.length) {
      titleElement.textContent += titleText.charAt(index);
      index++;
      setTimeout(type, 100);
    }
  }
  type();
  // Efecto de parpadeo en el cursor
  const cursor = document.querySelector(".cursor");
  setInterval(() => {
    cursor.classList.toggle("active");
  }, 500);

  // Modo oscuro
  const darkModeToggle = document.querySelector(".dark-mode-toggle");
  const darkModeIcon = darkModeToggle.querySelector("i");

  // Verificar preferencia del usuario
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

  // Scroll suave para enlaces
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });
    // Mostrar texto "Sobre mí" al hacer clic en la imagen
  const profileImage = document.getElementById('profile-image');
  const sobreMiText = document.getElementById('sobre-mi-text');
  
  if (profileImage && sobreMiText) {
    profileImage.addEventListener('click', function() {
      sobreMiText.style.opacity = '1';
      setTimeout(() => {
        sobreMiText.style.opacity = '0';
      }, 2000);
    });
  }
  // Mostrar/ocultar botón "volver arriba"
  const backToTopButton = document.querySelector(".back-to-top");

  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add("visible");
    } else {
      backToTopButton.classList.remove("visible");
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

  // Efecto hover en tarjetas de proyectos
  const projectCards = document.querySelectorAll(".project-card");

  projectCards.forEach((card) => {
    card.addEventListener("mousemove", function (e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const angleX = (y - centerY) / 20;
      const angleY = (centerX - x) / 20;

      card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.05)`;
    });

    card.addEventListener("mouseleave", function () {
      card.style.transform = "";
    });
  });

  // Validación del formulario
  const contactForm = document.querySelector("form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Validación simple
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (name && email && message) {
        alert("¡Gracias por tu mensaje! Me pondré en contacto contigo pronto.");
        contactForm.reset();
      } else {
        alert("Por favor completa todos los campos del formulario.");
      }
    });
  }

  // Animación de la foto de perfil
  const profilePic = document.querySelector(".profile-pic");
  if (profilePic) {
    profilePic.addEventListener("click", function () {
      this.classList.add("animate__animated", "animate__pulse");

      // Eliminar la clase después de la animación
      setTimeout(() => {
        this.classList.remove("animate__animated", "animate__pulse");
      }, 1000);
    });
  }
});

// Animación de carga
  document.addEventListener('DOMContentLoaded', function() {
    const textElement = document.getElementById('typing-text');
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
        textElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
      } else {
        // Escribiendo caracteres
        textElement.textContent = currentPhrase.substring(0, charIndex + 1);
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
    
    // Iniciar el efecto
    setTimeout(typeWriter, 1000);
  });