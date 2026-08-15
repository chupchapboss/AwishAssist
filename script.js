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

            // Simulate network request
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success state
            contactForm.reset();
            status.style.color = 'var(--medical-blue)';
            status.innerText = 'Inquiry Submitted successfully. Our team will contact you shortly.';
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;
        });
    }
});
