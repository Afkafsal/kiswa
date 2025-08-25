document.addEventListener('DOMContentLoaded', () => {
    // Hamburger menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Scroll animations
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    sections.forEach(section => observer.observe(section));

    // GSAP setup
    gsap.registerPlugin(ScrollTrigger);

    // Spotlight scroll-triggered horizontal move
    const carousel = document.querySelector('.spotlight-carousel');
    gsap.to(carousel, {
        x: () => -(carousel.scrollWidth - window.innerWidth) + 'px',
        ease: 'none',
        scrollTrigger: {
            trigger: '#spotlight',
            pin: true,
            scrub: 1,
            end: () => '+=' + carousel.offsetWidth,
            invalidateOnRefresh: true
        }
    });

    // Auto-scroll for carousel (independent of scroll trigger)
    let scrollAmount = 0;
    const card = carousel.querySelector('.card');
    const cardWidth = card ? card.offsetWidth + 30 : 0;
    function autoScroll() {
        scrollAmount += cardWidth;
        if (scrollAmount >= carousel.scrollWidth) {
            scrollAmount = 0;
        }
        carousel.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    }
    setInterval(autoScroll, 3000);

    // Color fading on scroll
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY / document.body.scrollHeight;
        document.body.style.background = `linear-gradient(to bottom, #F4F7F5, hsl(180, 20%, ${90 - scrollPos * 20}%) )`;
    });
});