// ===================================
// Custom Cursor Effects
// ===================================
// Create cursor elements
const cursor = document.createElement('div');
const cursorDot = document.createElement('div');
cursor.className = 'cursor';
cursorDot.className = 'cursor-dot';
document.body.appendChild(cursor);
document.body.appendChild(cursorDot);

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let dotX = 0;
let dotY = 0;

// Track mouse movement
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Create trail effect
    createCursorTrail(e.clientX, e.clientY);
});

// Smooth cursor follow
function animateCursor() {
    // Smooth following for main cursor
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;

    // Faster following for dot
    dotX += (mouseX - dotX) * 0.3;
    dotY += (mouseY - dotY) * 0.3;

    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    cursorDot.style.left = dotX + 'px';
    cursorDot.style.top = dotY + 'px';

    requestAnimationFrame(animateCursor);
}

animateCursor();

// Cursor trail particles
let lastTrailTime = 0;
function createCursorTrail(x, y) {
    const now = Date.now();
    if (now - lastTrailTime < 30) return; // Throttle trail creation
    lastTrailTime = now;

    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.left = x + 'px';
    trail.style.top = y + 'px';
    document.body.appendChild(trail);

    setTimeout(() => {
        trail.remove();
    }, 600);
}

// Hover effect on interactive elements
const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-item, .btn, .nav-link, .social-link');

hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
    });

    element.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
    });
});

// Hide custom cursor on mobile
if ('ontouchstart' in window) {
    cursor.style.display = 'none';
    cursorDot.style.display = 'none';
    document.body.style.cursor = 'auto';
}

// ===================================
// Navigation Functionality
// ===================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ===================================
// Active Section Highlighting
// ===================================
const sections = document.querySelectorAll('.section, .hero');

const observerOptions = {
    threshold: 0.3,
    rootMargin: '-100px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('id');

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => {
    sectionObserver.observe(section);
});

// ===================================
// Smooth Scroll
// ===================================
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Typing Effect for Hero Section
// ===================================
const typedTextElement = document.getElementById('typedText');
const textArray = [
    'Graphics Designer',
    'Web Designer',
    'Creative Developer',
    'UI/UX Enthusiast'
];
let textArrayIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeText() {
    const currentText = textArray[textArrayIndex];

    if (isDeleting) {
        typedTextElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typedTextElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textArrayIndex = (textArrayIndex + 1) % textArray.length;
        typingSpeed = 500; // Pause before typing next
    }

    setTimeout(typeText, typingSpeed);
}

// Start typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeText, 1000);
});

// ===================================
// Scroll Animations
// ===================================
const animateOnScrollElements = document.querySelectorAll(
    '.about-content, .skill-item, .project-card, .timeline-item, .contact-content'
);

const scrollAnimationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

animateOnScrollElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    scrollAnimationObserver.observe(element);
});

// ===================================
// Skill Bar Animations
// ===================================
const skillBars = document.querySelectorAll('.skill-progress');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target;
            const targetWidth = progressBar.getAttribute('data-progress');

            setTimeout(() => {
                progressBar.style.width = targetWidth + '%';
            }, 200);

            skillObserver.unobserve(progressBar);
        }
    });
}, {
    threshold: 0.5
});

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// ===================================
// Parallax Effect for Hero
// ===================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    const heroContent = document.querySelector('.hero-content');

    if (heroBackground && scrolled < window.innerHeight) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }

    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// ===================================
// Contact Form Handling
// ===================================
// ===================================
// Contact Form Handling
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            if (name && email && subject && message) {
                // Visual feedback
                const submitBtn = contactForm.querySelector('.btn-submit');
                const originalText = submitBtn.innerHTML;

                // animated loading state
                submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spinner-third"></i> <span>Sending...</span>';
                submitBtn.style.opacity = '0.8';
                submitBtn.disabled = true;

                const templateParams = {
                    name: name,
                    email: email,
                    subject: subject,
                    message: message,
                    time: new Date().toLocaleString()
                };

                emailjs.send('service_y0xcwza', 'template_fmqojq9', templateParams)
                    .then(() => {
                        alert(`Thank you, ${name}! Your message has been sent successfully.`);

                        // Reset form
                        contactForm.reset();

                        // animated success state
                        submitBtn.innerHTML = '<span>Message Sent!</span> <i class="fas fa-check-circle success-icon"></i>';
                        submitBtn.style.opacity = '1';
                        submitBtn.style.backgroundColor = '#10b981'; // Success Green

                        setTimeout(() => {
                            submitBtn.innerHTML = originalText;
                            submitBtn.disabled = false;
                            submitBtn.style.opacity = '1';
                            submitBtn.style.backgroundColor = '';
                        }, 3000);
                    }, (error) => {
                        console.error('EmailJS Error:', error);
                        alert('Oops! Something went wrong. Please try again later.');

                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                        submitBtn.style.opacity = '1';
                    });
            }
        });
    }
});

// ===================================
// Floating Cards Animation Enhancement
// ===================================
const floatingCards = document.querySelectorAll('.floating-card');

floatingCards.forEach((card, index) => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.1) translateY(-10px)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'scale(1) translateY(0)';
    });
});

// ===================================
// Project Cards Tilt Effect
// ===================================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===================================
// Stats Counter Animation
// ===================================
const statNumbers = document.querySelectorAll('.stat-number');

const countUp = (element, target) => {
    const increment = target / 100;
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 20);
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statElement = entry.target;
            const targetValue = parseInt(statElement.textContent);
            countUp(statElement, targetValue);
            statsObserver.unobserve(statElement);
        }
    });
}, {
    threshold: 0.5
});

statNumbers.forEach(stat => {
    statsObserver.observe(stat);
});

// ===================================
// Page Load Animation
// ===================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===================================
// Scroll to Top on Page Refresh
// ===================================
window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});

// ===================================
// Performance Optimization
// ===================================
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll-heavy operations
const debouncedScroll = debounce(() => {
    // Any additional scroll operations can go here
}, 10);

window.addEventListener('scroll', debouncedScroll);

// ===================================
// Lightbox Gallery Logic
// ===================================
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.querySelector('.lightbox-image');
const lightboxTitle = document.querySelector('.lightbox-title');
const lightboxDescription = document.querySelector('.lightbox-description');
const lightboxTags = document.querySelector('.lightbox-tags');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxNext = document.querySelector('.lightbox-nav.next');
const lightboxPrev = document.querySelector('.lightbox-nav.prev');
const projectCards2 = document.querySelectorAll('.project-card'); // Renamed to avoid conflict with earlier variable

const lightboxImageWrapper = document.querySelector('.lightbox-image-wrapper');

let currentProjectIndex = 0;
let isZoomed = false;
const projects = [];

// Initialize projects data
projectCards2.forEach((card, index) => {
    projects.push({
        image: card.dataset.image,
        title: card.dataset.title,
        description: card.dataset.description,
        tags: card.dataset.tags.split(',')
    });

    // Add click event to the entire card
    card.addEventListener('click', (e) => {
        e.preventDefault();
        openLightbox(index);
    });
});

function openLightbox(index) {
    currentProjectIndex = index;
    updateLightboxContent();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function resetZoom() {
    isZoomed = false;
    lightboxImageWrapper.classList.remove('zoomed');
    lightboxImage.style.transformOrigin = 'center';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
    resetZoom();
}

function updateLightboxContent() {
    const project = projects[currentProjectIndex];
    resetZoom();

    // Animate content change
    const content = document.querySelector('.lightbox-content');
    content.style.opacity = '0';
    content.style.transform = 'scale(0.9)';

    setTimeout(() => {
        lightboxImage.src = project.image;
        lightboxImage.alt = project.title;
        lightboxTitle.textContent = project.title;
        lightboxDescription.textContent = project.description;

        // Update tags
        lightboxTags.innerHTML = project.tags.map(tag =>
            `<span class="tag">${tag}</span>`
        ).join('');

        content.style.opacity = '1';
        content.style.transform = 'scale(1)';
    }, 200);
}

// Zoom functionality
lightboxImageWrapper.addEventListener('click', (e) => {
    isZoomed = !isZoomed;
    lightboxImageWrapper.classList.toggle('zoomed', isZoomed);

    if (isZoomed) {
        // Center zoom on click point initially
        const rect = lightboxImageWrapper.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        lightboxImage.style.transformOrigin = `${x}% ${y}%`;
    } else {
        lightboxImage.style.transformOrigin = 'center';
    }
});

lightboxImageWrapper.addEventListener('mousemove', (e) => {
    if (!isZoomed) return;

    const rect = lightboxImageWrapper.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    lightboxImage.style.transformOrigin = `${x}% ${y}%`;
});

function nextProject() {
    currentProjectIndex = (currentProjectIndex + 1) % projects.length;
    updateLightboxContent();
}

function prevProject() {
    currentProjectIndex = (currentProjectIndex - 1 + projects.length) % projects.length;
    updateLightboxContent();
}

// Event Listeners
lightboxClose.addEventListener('click', closeLightbox);
lightboxNext.addEventListener('click', nextProject);
lightboxPrev.addEventListener('click', prevProject);

// Close on background click
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-container')) {
        closeLightbox();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextProject();
    if (e.key === 'ArrowLeft') prevProject();
});


