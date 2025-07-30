        // Generic carousel function to handle multiple carousels
        function setupCarousel(containerId, prevButtonId, nextButtonId, vertical = false) {
            const carouselContainer = document.getElementById(containerId);
            if (!carouselContainer) return;

            const carouselImages = carouselContainer.querySelector('.carousel-images');
            const images = carouselImages.querySelectorAll('img');
            const prevButton = document.getElementById(prevButtonId);
            const nextButton = document.getElementById(nextButtonId);

            let currentIndex = 0;
            const totalImages = images.length;

            function updateCarousel() {
                if (vertical) {
                    carouselImages.style.transform = `translateY(${-currentIndex * 100}%)`;
                } else {
                    carouselImages.style.transform = `translateX(${-currentIndex * 100}%)`;
                }
            }

            prevButton.addEventListener('click', () => {
                currentIndex = (currentIndex === 0) ? totalImages - 1 : currentIndex - 1;
                updateCarousel();
            });

            nextButton.addEventListener('click', () => {
                currentIndex = (currentIndex === totalImages - 1) ? 0 : currentIndex + 1;
                updateCarousel();
            });

            let autoSlideInterval = setInterval(() => {
                currentIndex = (currentIndex === totalImages - 1) ? 0 : currentIndex + 1;
                updateCarousel();
            }, 5000);

            carouselContainer.addEventListener('mouseenter', () => {
                clearInterval(autoSlideInterval);
            });

            carouselContainer.addEventListener('mouseleave', () => {
                autoSlideInterval = setInterval(() => {
                    currentIndex = (currentIndex === totalImages - 1) ? 0 : currentIndex + 1;
                    updateCarousel();
                }, 5000);
            });

            window.addEventListener('resize', updateCarousel);
            updateCarousel();
        }

        // Setup Pricing Carousels
        setupCarousel('pricing-basic-carousel', 'pricing-basic-prev', 'pricing-basic-next');
        setupCarousel('pricing-standard-carousel', 'pricing-standard-prev', 'pricing-standard-next');
        setupCarousel('pricing-premium-carousel', 'pricing-premium-prev', 'pricing-premium-next');


        // Mobile menu toggle
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');

        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu when a link is clicked
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });

        // Smooth scroll for all anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href').slice(1);
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    e.preventDefault();
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });