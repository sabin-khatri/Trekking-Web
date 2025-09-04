
      // --- Mobile Menu Toggle ---
      document.getElementById('menuBtn').addEventListener('click', () => {
        const mobileMenu = document.getElementById('mobileMenu');
        const menuIcon = document.getElementById('menuIcon');
        const closeIcon = document.getElementById('closeIcon');
        const isOpen = mobileMenu.classList.contains('max-h-96');
        mobileMenu.classList.toggle('max-h-96', !isOpen);
        mobileMenu.classList.toggle('max-h-0', isOpen);
        menuIcon.classList.toggle('hidden', !isOpen);
        closeIcon.classList.toggle('hidden', isOpen);
      });

      // --- Scroll Animation ---
      const scrollElements = document.querySelectorAll('.animate-on-scroll');
      const elementInView = (el) => el.getBoundingClientRect().top <= (window.innerHeight || document.documentElement.clientHeight) / 1.1;
      const displayScrollElement = (element) => element.classList.add('is-visible');
      const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
          if (elementInView(el)) { displayScrollElement(el); }
        });
      };
      window.addEventListener('scroll', handleScrollAnimation);
      handleScrollAnimation(); // Initial check on load

      // Function to add the animation-delay property dynamically
      document.addEventListener('DOMContentLoaded', () => {
        const delays = [0, 150, 300, 450, 600]; // milliseconds for each element
        document.querySelectorAll('.animate-on-scroll').forEach((el, index) => {
          el.style.transitionDelay = `${delays[index % delays.length]}ms`;
        });
      });
