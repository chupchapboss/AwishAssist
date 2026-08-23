document.addEventListener('DOMContentLoaded', () => {
    
    gsap.registerPlugin(ScrollTrigger);

    // --- Header Scroll State ---
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
        });
    }

    // --- Basic Reveals ---
    const revealUp = document.querySelectorAll('.gs-reveal-up');
    revealUp.forEach(el => {
        gsap.from(el, { scrollTrigger: { trigger: el, start: 'top 85%' }, y: 50, opacity: 0, duration: 1, ease: 'power3.out' });
    });

    const revealLeft = document.querySelectorAll('.gs-reveal-left');
    revealLeft.forEach(el => {
        gsap.from(el, { scrollTrigger: { trigger: el, start: 'top 85%' }, x: -50, opacity: 0, duration: 1, ease: 'power3.out' });
    });

    const revealRight = document.querySelectorAll('.gs-reveal-right');
    revealRight.forEach(el => {
        gsap.from(el, { scrollTrigger: { trigger: el, start: 'top 85%' }, x: 50, opacity: 0, duration: 1, ease: 'power3.out' });
    });

    // --- GSAP Scrubbing "3D" Device Animation (Desktop Only) ---
    ScrollTrigger.matchMedia({
        "(min-width: 1025px)": function() {
            // Animate the data panels fading in on the right
            const panels = document.querySelectorAll('.scrub-panel');
            panels.forEach((panel, i) => {
                gsap.fromTo(panel, 
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1, y: 0, duration: 0.5,
                        scrollTrigger: {
                            trigger: panel,
                            start: 'top 75%',
                            toggleActions: "play reverse play reverse",
                        }
                    }
                );
            });
        }
    });

    // --- Form Handling ---
    const contactForm = document.getElementById('contactForm');
    if(contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = document.getElementById('submitBtn');
            const originalText = submitBtn.innerText;
            const status = document.getElementById('formStatus');
            
            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;

            try {
                // TODO: Replace this URL with your Google Apps Script Web App URL
                const scriptURL = 'https://script.google.com/macros/s/AKfycbwRIthz__ESfqsSr2cWTfnf6WhtciBcpki5SKCsHUTeVHJWhPtTyoeHpPj4-VaUK0m7yQ/exec';
                

                // Send data to Google Apps Script
                await fetch(scriptURL, {
                    method: 'POST',
                    mode: 'no-cors',
                    body: new FormData(contactForm)
                });
                
                // Show success state
                contactForm.reset();
                status.style.color = 'var(--medical-blue)';
                status.innerText = 'Inquiry submitted successfully. Our team will contact you shortly.';
            } catch (error) {
                console.error('Error:', error);
                status.style.color = '#FF3B30';
                status.innerText = error.message === "Please set up the Google Apps Script and paste the URL here." 
                    ? error.message 
                    : 'An error occurred while submitting the form. Please try again.';
            } finally {
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            }
        });
    }
});
