document.addEventListener("DOMContentLoaded", () => {
  // Typewriter effect
  const typewriter = document.querySelector(".typewriter");
  if (typewriter) {
    const text = typewriter.dataset.text;
    let index = 0;

    function type() {
      if (index < text.length) {
        typewriter.textContent = text.slice(0, index + 1);
        index++;
        setTimeout(type, 100);
      }
    }

    setTimeout(type, 1000);
  }

  // Progress bar
  const progressBar = document.querySelector(".progress-bar");
  
  function updateProgressBar() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    
    if (progressBar) {
      progressBar.style.width = Math.min(scrollPercent, 100) + "%";
    }
  }

  window.addEventListener("scroll", updateProgressBar);
  window.addEventListener("resize", updateProgressBar);

  // Blob effect
  const blob = document.querySelector(".blob");
  
  function updateBlobPosition(e) {
    if (!blob) return;
    
    requestAnimationFrame(() => {
      const x = e.clientX;
      const y = e.clientY;
      blob.style.left = x + "px";
      blob.style.top = y + "px";
    });
  }

  function initBlobEffect() {
    if (!blob) return;
    
    const hasHover = window.matchMedia('(hover: hover)').matches;
    
    if (hasHover && window.innerWidth > 1024) {
      blob.style.display = "block";
      document.addEventListener("mousemove", updateBlobPosition);
    } else {
      blob.style.display = "none";
      document.removeEventListener("mousemove", updateBlobPosition);
    }
  }

  initBlobEffect();
  
  window.addEventListener("resize", initBlobEffect);

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = "running";
      }
    });
  }, observerOptions);

  document.querySelectorAll(".fade-in, .slide-in").forEach((el) => {
    el.style.animationPlayState = "paused";
    observer.observe(el);
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const target = document.querySelector(targetId);
      
      if (target) {
        const headerOffset = 80; 
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });

  const skillTags = document.querySelectorAll(".skill-tag");
  skillTags.forEach((tag, index) => {
    tag.style.animationDelay = `${index * 0.1}s`;
  });

  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
  });

});