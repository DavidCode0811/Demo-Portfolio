// Typing animation effect for professions
const profession = document.querySelector('.profession');
const professions = ['Web Designer', 'Frontend Developer', 'UI/UX Designer', 'Software Developer'];
let professionIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 200;
let erasingDelay = 100;
let newTextDelay = 2000;

function typeEffect() {
    const currentProfession = professions[professionIndex];
    
    if (isDeleting) {
        profession.textContent = currentProfession.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = erasingDelay;
    } else {
        profession.textContent = currentProfession.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 200;
    }
    
    if (!isDeleting && charIndex === currentProfession.length) {
        isDeleting = true;
        typingDelay = newTextDelay;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        professionIndex = (professionIndex + 1) % professions.length;
    }
    
    setTimeout(typeEffect, typingDelay);
}

// Start the typing effect when the page loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeEffect, 1000);
});

// Sticky navbar
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    header.classList.toggle('sticky', window.scrollY > 100);
});

// Toggle menu icon
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
});

// Close menu when clicking on nav links
document.querySelectorAll('.navbar a').forEach(navLink => {
    navLink.addEventListener('click', () => {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    });
});

// Update active link based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;
        const id = section.getAttribute('id');
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Project filtering
const filterItems = document.querySelectorAll('.filter-item');
const projectBoxes = document.querySelectorAll('.projects-box');

filterItems.forEach(item => {
    item.addEventListener('click', () => {
        // Update active filter
        filterItems.forEach(filter => filter.classList.remove('active'));
        item.classList.add('active');
        
        // Filter projects
        const filterValue = item.getAttribute('data-filter');
        
        projectBoxes.forEach(box => {
            if (filterValue === 'all' || box.getAttribute('data-category') === filterValue) {
                box.style.display = 'block';
                setTimeout(() => {
                    box.style.opacity = '1';
                    box.style.transform = 'scale(1)';
                }, 200);
            } else {
                box.style.opacity = '0';
                box.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    box.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Smooth scrolling for all internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission handler
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const subject = contactForm.querySelectorAll('input[type="text"]')[1].value;
        const message = contactForm.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            alert('Please fill out all fields');
            return;
        }
        
        // Here you would typically send the form data to a server
        // For now, we'll just show a success message
        alert('Message sent successfully!');
        contactForm.reset();
    });
}

// Add reveal animations on scroll
const revealElements = document.querySelectorAll('.skills-box, .projects-box, .services-box, .testimonial-box, .education-content, .contact-card');

const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.8;
    
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < triggerBottom) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial state for animations
revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.5s ease';
});

VanillaTilt.init(document.querySelectorAll(".info-box"), {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.2
});

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Check on initial load