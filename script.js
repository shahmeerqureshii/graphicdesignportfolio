// Loader
window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");

    // Add the hidden class to trigger the fade-out
    loader.classList.add("loader-hidden");

    // Optional: Remove it from the DOM entirely after the transition
    loader.addEventListener("transitionend", () => {
        document.body.removeChild(loader);
    });
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.checked = true;
}

// Theme Toggle Event Listener
if (themeToggle) {
    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    });
}

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger
        hamburger.classList.toggle('active');
    });
}

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        
        // Add active class to current link
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// Smooth scroll and active link highlighting
window.addEventListener('scroll', () => {
    let current = '';
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Contact Form Handling
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const formAction = form.getAttribute('action'); // Get the Formspree URL from HTML

    if (form) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault(); // Stop the default page redirect/refresh
            
            const formData = new FormData(form);
            
            // Show a temporary message while sending
            const originalButtonText = form.querySelector('.cta-button').textContent;
            form.querySelector('.cta-button').textContent = 'Sending...';

            try {
                // Send the form data to Formspree
                const response = await fetch(formAction, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json' // Recommended for fetch submissions
                    }
                });
                
                // If Formspree confirms success
                if (response.ok) {
                    alert('✅ Message sent successfully! I will get back to you soon.');
                    form.reset(); // Clear form fields
                } else {
                    alert('❌ There was an issue sending your message. Please try again.');
                }

            } catch (error) {
                console.error('Submission error:', error);
                alert('❌ Network error. Please check your connection and try again.');
            } finally {
                // Restore button text regardless of success or failure
                form.querySelector('.cta-button').textContent = originalButtonText;
            }
        });
    }
});
// const contactForm = document.getElementById('contactForm');
// if (contactForm) {
//     contactForm.addEventListener('submit', function(e) {
//         e.preventDefault();
        
//         // Get form values
//         const formData = new FormData(this);

//         // Extract fields by name (phone is optional)
//         const name = (formData.get('name') || '').trim();
//         const email = (formData.get('email') || '').trim();
//         const phone = (formData.get('phone') || '').trim();
//         const project = (formData.get('project') || '').trim();
//         const message = (formData.get('message') || '').trim();

//         // Basic required-field validation (phone optional)
//         if (name === '' || email === '' || project === '' || message === '') {
//             alert('Please fill in all required fields (Name, Email, Project, Message).');
//             return;
//         }

//         // Simple email validation
//         const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!emailPattern.test(email)) {
//             alert('Please enter a valid email address.');
//             return;
//         }

//         // Optional phone validation: if provided, ensure it has at least 7 digits
//         if (phone !== '') {
//             const digits = phone.replace(/\D/g, '');
//             if (digits.length < 7) {
//                 alert('Please enter a valid phone number.');
//                 return;
//             }
//         }

//         // Build success message (includes phone if provided)
//         let successMsg = 'Message Sent! Thank you for your message! I will get back to you soon.';

//         alert(successMsg);

//         // Reset form
//         this.reset();

//         // Reset textarea height (shrink to initial after reset)
//         const taAfterReset = this.querySelector('textarea');
//         if (taAfterReset) {
//             taAfterReset.style.height = 'auto';
//             taAfterReset.style.height = taAfterReset.scrollHeight + 'px';
//         }
//     });
// }

// Auto-resize contact textarea(s)
function autoResizeTextarea(textarea) {
    if (!textarea) return;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}

document.addEventListener('DOMContentLoaded', () => {
    const textareas = document.querySelectorAll('#contactForm textarea');
    textareas.forEach(t => {
        // ensure textarea doesn't show scrollbars
        t.style.overflow = 'hidden';
        autoResizeTextarea(t);
        t.addEventListener('input', function() {
            autoResizeTextarea(this);
        });
    });
});

// CTA Button Scroll to Portfolio
// Only attach to a dedicated hero scroll CTA (do not target other hero buttons)
const heroScrollCTA = document.querySelector('.hero .hero-scroll-cta');
if (heroScrollCTA) {
    heroScrollCTA.addEventListener('click', (e) => {
        e.preventDefault();
        const portfolioSection = document.getElementById('portfolio');
        if (portfolioSection) portfolioSection.scrollIntoView({ behavior: 'smooth' });
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe portfolio items for animation
document.querySelectorAll('.portfolio-item').forEach(item => {
    observer.observe(item);
});

// Observe service cards for animation
document.querySelectorAll('.service-card').forEach(card => {
    observer.observe(card);
});

// Scroll to top button (optional enhancement)
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="pointer-events: none;">
    <polyline points="18 15 12 9 6 15"></polyline>
</svg>`;
scrollToTopBtn.id = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: linear-gradient(135deg, rgba(0, 212, 255, 0.8), rgba(0, 153, 204, 0.8));
    color: white;
    border: 1.5px solid rgba(0, 212, 255, 0.6);
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 999;
    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
    backdrop-filter: blur(10px);
    box-shadow: 0 8px 32px rgba(0, 212, 255, 0.2);
    opacity: 0;
    visibility: hidden;
    font-size: 0;
    padding: 0;
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

scrollToTopBtn.addEventListener('mouseover', () => {
    scrollToTopBtn.style.transform = 'translateY(-5px)';
    scrollToTopBtn.style.boxShadow = '0 12px 40px rgba(0, 212, 255, 0.4)';
});

scrollToTopBtn.addEventListener('mouseout', () => {
    scrollToTopBtn.style.transform = 'translateY(0)';
    scrollToTopBtn.style.boxShadow = '0 8px 32px rgba(0, 212, 255, 0.2)';
});

// Portfolio item click handling
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('click', function() {
        const overlay = this.querySelector('.overlay-content h3');
        if (overlay) {
            console.log('Clicked project:', overlay.textContent);
            // You can add modal or navigation here
        }
    });
});

console.log('Portfolio website loaded successfully!');

// Disable right-click and dragging on images (including background images)
(function() {
    function hasBackgroundImage(el) {
        while (el && el !== document.documentElement) {
            try {
                const bg = window.getComputedStyle(el).backgroundImage;
                if (bg && bg !== 'none' && bg !== 'initial' && bg !== 'unset') return true;
            } catch (err) {
                // ignore
            }
            el = el.parentElement;
        }
        return false;
    }

    document.addEventListener('contextmenu', function(e) {
        const el = e.target;
        if (!el) return;
        if (el.tagName === 'IMG' || hasBackgroundImage(el)) {
            e.preventDefault();
            return false;
        }
    }, { passive: false });

    // Prevent dragging images
    function disableImgDrag(img) {
        try {
            img.setAttribute('draggable', 'false');
            img.addEventListener('dragstart', function(ev) { ev.preventDefault(); });
        } catch (err) { /* ignore */ }
    }

    document.querySelectorAll('img').forEach(disableImgDrag);

    // Observe DOM for dynamically added images
    const mo = new MutationObserver(muts => {
        muts.forEach(m => {
            m.addedNodes && m.addedNodes.forEach(node => {
                if (node.nodeType === 1) {
                    if (node.tagName === 'IMG') disableImgDrag(node);
                    node.querySelectorAll && node.querySelectorAll('img').forEach(disableImgDrag);
                }
            });
        });
    });
    mo.observe(document.body, { childList: true, subtree: true });
})();




