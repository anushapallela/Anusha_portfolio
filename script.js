document.addEventListener('DOMContentLoaded', () => {
    // Preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.classList.add('loaded');
            // Initialize AOS after preloader is done to ensure elements are ready
            AOS.init({
                duration: 800,
                easing: 'ease-in-out-quad',
                once: true,
                offset: 50, // Offset (in px) from the original trigger point
            });
        });
    } else { // Fallback if no preloader
        AOS.init({
            duration: 800,
            easing: 'ease-in-out-quad',
            once: true,
            offset: 50,
        });
    }


    // Mobile Navigation Toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('toggle');

        navLinks.forEach((link, index) => {
            if (nav.classList.contains('nav-active')) {
                 // Reset animation if already applied
                link.style.animation = '';
                // Apply animation with delay
                setTimeout(() => {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }, 0); // Timeout 0 to ensure reset takes effect before re-applying
            } else {
                link.style.animation = ''; // Clear animation when closing
            }
        });
    });

    // Smooth scrolling for nav links & close mobile nav on click
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href').startsWith('#')) { // Only for internal links
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    let offset = 70; // Height of fixed header
                    const bodyRect = document.body.getBoundingClientRect().top;
                    const elementRect = targetElement.getBoundingClientRect().top;
                    const elementPosition = elementRect - bodyRect;
                    const offsetPosition = elementPosition - offset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }

            if (nav.classList.contains('nav-active') && this.closest('.nav-links')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                navLinks.forEach(link => link.style.animation = '');
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) { // Increased threshold
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Typewriter Effect for Hero Section
    const typewriterTextOptions = ["Full Stack Developer.", "AI Enthusiast.", "Problem Solver.", "Innovator."];
    let currentTextIndex = 0;
    let charIndex = 0;
    const typewriterSpeed = 80; // Faster typing
    const eraseSpeed = 40;
    const pauseBetweenTexts = 2000;
    const typewriterElement = document.querySelector('.typewriter');

    function typeWriter() {
        if (!typewriterElement) return;
        const currentString = typewriterTextOptions[currentTextIndex];
        if (charIndex < currentString.length) {
            typewriterElement.textContent += currentString.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, typewriterSpeed);
        } else {
            setTimeout(eraseWriter, pauseBetweenTexts);
        }
    }

    function eraseWriter() {
        if (!typewriterElement) return;
        const currentString = typewriterTextOptions[currentTextIndex];
        if (charIndex > 0) {
            typewriterElement.textContent = currentString.substring(0, charIndex - 1);
            charIndex--;
            setTimeout(eraseWriter, eraseSpeed);
        } else {
            currentTextIndex = (currentTextIndex + 1) % typewriterTextOptions.length;
            setTimeout(typeWriter, typewriterSpeed);
        }
    }
    if (typewriterElement) typeWriter();


    // Set current year in footer
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // Active Nav Link Highlighting on Scroll
    const sections = document.querySelectorAll('main section[id]'); // Ensure sections have IDs
    const navLiAnchors = document.querySelectorAll('nav .nav-links li a');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 2.2)) { // Adjusted for better accuracy
                currentSectionId = section.getAttribute('id');
            }
        });

        navLiAnchors.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').substring(1) === currentSectionId) {
                a.classList.add('active');
            }
        });
         // Special case for hero section if no other section is active at top
        const homeLink = document.querySelector('nav .nav-links li a[href="#hero"]');
        if (!currentSectionId && pageYOffset < (sections[0] ? sections[0].offsetTop - 100 : 100) && homeLink) {
             homeLink.classList.add('active');
        }
    });
    // Initial active link check on load
    const homeLinkInitial = document.querySelector('nav .nav-links li a[href="#hero"]');
    if (homeLinkInitial && sections.length > 0 && window.pageYOffset < (sections[0].offsetTop - 100) ) {
        homeLinkInitial.classList.add('active');
    }


    // Hero Title Character Animation Trigger
    const heroTitleChars = document.querySelectorAll('.hero-title .char-anim');
    heroTitleChars.forEach((char, index) => {
        char.style.animationDelay = `${0.5 + index * 0.07}s`; // Staggered delay from JS
    });

    // Back to Top Button
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.style.opacity = '1';
                backToTopButton.style.visibility = 'visible';
            } else {
                backToTopButton.style.opacity = '0';
                backToTopButton.style.visibility = 'hidden';
            }
        });
    }

});