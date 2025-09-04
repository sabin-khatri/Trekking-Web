
      document.addEventListener('DOMContentLoaded', () => {
        // --- Mobile Menu Toggle (New & Improved) ---
        const menuBtn = document.getElementById("menuBtn");
        const mobileMenu = document.getElementById("mobileMenu");
        const menuIcon = document.getElementById("menuIcon");
        const closeIcon = document.getElementById("closeIcon");
        
        menuBtn.addEventListener("click", () => {
            const isOpen = mobileMenu.classList.contains("open");
            mobileMenu.classList.toggle("open", !isOpen);
            menuIcon.classList.toggle("hidden", !isOpen);
            closeIcon.classList.toggle("hidden", isOpen);
        });

        // --- Scroll Animation using Intersection Observer ---
        const scrollElements = document.querySelectorAll('.animate-on-scroll');
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target); // Unobserve after animating
            }
          });
        }, {
          threshold: 0.15 // Trigger when 15% of the element is in view
        });

        scrollElements.forEach(el => observer.observe(el));
      });
    