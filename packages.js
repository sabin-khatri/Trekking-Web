
      document.addEventListener('DOMContentLoaded', () => {
        // --- Mobile Menu Toggle ---
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

        // --- Animated Trek Filtering Logic ---
        const filterContainer = document.getElementById("filter-container");
        const trekGrid = document.getElementById("trek-grid");
        const trekCards = Array.from(trekGrid.children);

        if (filterContainer) {
          filterContainer.addEventListener("click", (event) => {
            const target = event.target.closest(".filter-btn");
            if (!target) return;

            filterContainer.querySelector(".active").classList.remove("active");
            target.classList.add("active");

            const filter = target.dataset.filter;
            let visibleCards = [];
            
            // First, hide all cards
            trekCards.forEach(card => card.classList.add("hiding"));

            // After a delay for the hiding animation, rearrange and show the correct cards
            setTimeout(() => {
                trekCards.forEach(card => {
                    const categories = card.dataset.category;
                    const shouldShow = filter === "all" || categories.includes(filter);

                    if(shouldShow) {
                        card.style.display = 'block';
                        visibleCards.push(card);
                    } else {
                        card.style.display = 'none';
                    }
                });

                // Stagger the reveal animation
                visibleCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.remove('hiding');
                    }, index * 80);
                });
            }, 400); // This delay should match the transition duration
          });
        }
        
        // --- Animate all cards on initial load ---
        const initialVisibleCards = document.querySelectorAll('#trek-grid .trek-card');
        initialVisibleCards.forEach((card, index) => {
            card.classList.add('animate-on-scroll');
            card.style.transitionDelay = `${index * 100}ms`;
        });

        // --- Intersection Observer for Scroll Animations ---
        const scrollElements = document.querySelectorAll('.animate-on-scroll');
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.1 });

        scrollElements.forEach(el => observer.observe(el));
      });
