// Hide loader after page load
window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.display = 'none';
    }
});

// Parallax
window.addEventListener('scroll', function() {
    const bg = document.querySelector('.parallax-bg img');
    const scroll = window.scrollY;
    if (bg) {
        bg.style.transform = `translateY(${scroll * -0.2}px) scale(1.1)`;
    }
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        const targetId = this.getAttribute("href").substring(1);
        const target = document.getElementById(targetId);

        if (target) {
            const offset = 260;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
});

// Mobile navigation
function toggleNavigation() {
    try {
        const nav = document.querySelector('.nav-mobile');

        if (!nav) throw new Error("Navigation menu not found.");

        // Toggle active class
        if (nav.style.display == "block") {
            nav.style.display = "none";
        } else {
            nav.style.display = "block";
        }
    } catch (error) {
        console.error("Navigation toggle failed:", error);
    }
}

// Navbar active
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-desktop a");

function activateNavLink() {
    let scrollPos = window.scrollY + 260;

    sections.forEach(section => {
        if (
            scrollPos >= section.offsetTop &&
            scrollPos < section.offsetTop + section.offsetHeight
        ) {
            navLinks.forEach(link => {
                link.classList.remove("active");
                if (link.getAttribute("href") === `#${section.id}`) {
                    link.classList.add("active");
                }
            });
        }
    });
}

window.addEventListener("scroll", activateNavLink);

// Intersection Observer for fade-in on scroll
document.addEventListener('DOMContentLoaded', function() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe all elements with class 'fade-in'
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Testimonials carousel logic
    let currentTest = 0;
    const testimonials = document.querySelectorAll('.testimonial');
    const totalTests = testimonials.length;

    function showTestimonial(index) {
        testimonials.forEach((test, i) => {
            test.classList.toggle('active', i === index);
        });
    }
    document.getElementById('prevTest').addEventListener('click', () => {
        currentTest = (currentTest - 1 + totalTests) % totalTests;
        showTestimonial(currentTest);
    });
    document.getElementById('nextTest').addEventListener('click', () => {
        currentTest = (currentTest + 1) % totalTests;
        showTestimonial(currentTest);
    });
});