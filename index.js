
      document.addEventListener("DOMContentLoaded", () => {
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

        const modal = document.getElementById("image-modal");
        const modalImage = document.getElementById("modal-image");
        const modalImageAlt = document.getElementById("modal-image-alt");
        const closeModalButton = document.getElementById("close-modal-button");
        const prevButton = document.getElementById("prev-button");
        const nextButton = document.getElementById("next-button");

        const galleryItems = document.querySelectorAll(".gallery-item");
        const gallerySources = Array.from(galleryItems).map(item => ({
            src: item.href,
            alt: item.dataset.alt || 'Himalayan vista'
        }));
        let currentIndex = 0;

        function showImage(index) {
          modalImage.src = gallerySources[index].src;
          modalImage.alt = gallerySources[index].alt;
          modalImageAlt.textContent = gallerySources[index].alt;
          currentIndex = index;
        }

        function openModal(index) {
          showImage(index);
          modal.classList.add("open");
          document.body.style.overflow = "hidden";
        }

        function closeModal() {
          modal.classList.remove("open");
          document.body.style.overflow = "";
        }

        function showNextImage() {
          const nextIndex = (currentIndex + 1) % gallerySources.length;
          showImage(nextIndex);
        }

        function showPrevImage() {
          const prevIndex = (currentIndex - 1 + gallerySources.length) % gallerySources.length;
          showImage(prevIndex);
        }

        galleryItems.forEach((item, index) => {
          item.addEventListener("click", (event) => {
            event.preventDefault();
            openModal(index);
          });
        });

        closeModalButton.addEventListener("click", closeModal);
        nextButton.addEventListener("click", showNextImage);
        prevButton.addEventListener("click", showPrevImage);

        modal.addEventListener("click", (event) => {
          if (event.target === modal) {
            closeModal();
          }
        });

        document.addEventListener("keydown", (event) => {
          if (!modal.classList.contains("open")) return;
          if (event.key === "Escape") closeModal();
          if (event.key === "ArrowRight") showNextImage();
          if (event.key === "ArrowLeft") showPrevImage();
        });

        const scrollElements = document.querySelectorAll(".animate-on-scroll");
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
              entry.target.style.transitionDelay = `${index * 75}ms`;
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.1 });

        scrollElements.forEach(el => observer.observe(el));
      });
    