document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a, .hero-content .btn');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const offsetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Change header background on scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(17, 17, 17, 0.95)';
        } else {
            header.style.backgroundColor = 'rgba(17, 17, 17, 0.8)';
        }
    });

    // Reveal elements on scroll
    const revealElements = document.querySelectorAll('.work-item, .about-text, .about-image-placeholder');
    
    const revealOnScroll = () => {
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const elementBottom = el.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight - 100 && elementBottom > 0) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial state for reveal animation
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
    });

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger initial check

    // Album functionality
    const albums = document.querySelectorAll('.album-item');
    
    albums.forEach(album => {
        const slides = album.querySelectorAll('.work-slides img');
        const nextBtn = album.querySelector('.next-btn');
        const prevBtn = album.querySelector('.prev-btn');
        let currentIdx = 0;
        let autoFlipInterval;

        const showSlide = (index) => {
            slides.forEach(img => img.classList.remove('active'));
            slides[index].classList.add('active');
            currentIdx = index;
        };

        const nextSlide = () => {
            let nextIdx = (currentIdx + 1) % slides.length;
            showSlide(nextIdx);
        };

        const prevSlide = () => {
            let prevIdx = (currentIdx - 1 + slides.length) % slides.length;
            showSlide(prevIdx);
        };

        const startAutoFlip = () => {
            autoFlipInterval = setInterval(nextSlide, 4000);
        };

        const stopAutoFlip = () => {
            clearInterval(autoFlipInterval);
        };

        // Event listeners for manual navigation
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            stopAutoFlip();
            nextSlide();
            startAutoFlip();
        });

        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            stopAutoFlip();
            prevSlide();
            startAutoFlip();
        });

        // Initialize auto-flipping
        startAutoFlip();
    });
});
