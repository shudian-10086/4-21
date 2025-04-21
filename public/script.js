document.addEventListener('DOMContentLoaded', () => {
    // === Existing Variables... ===
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const yearSpan = document.getElementById('current-year');
    const mainNav = document.getElementById('main-nav');

    // === Existing Functions (changeNavOnScroll) ===
    function changeNavOnScroll() {
        let currentSectionId = '';
        // Calculate offset based on nav height (adjust if nav height changes)
        const navHeight = mainNav ? mainNav.offsetHeight : 70;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
             // Adjust offset slightly more for better activation timing
            if (pageYOffset >= sectionTop - navHeight - 10 && pageYOffset < sectionTop + sectionHeight - navHeight - 10) {
                currentSectionId = section.getAttribute('id');
            }
        });

         // Edge case: Activate last nav item when scrolled near the bottom
        if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 10) { // Near bottom
             const lastSection = sections[sections.length - 1];
             if (lastSection) {
                 currentSectionId = lastSection.getAttribute('id');
             }
        }
        // Edge case: Activate first nav item when at the very top
         if (pageYOffset < sections[0].offsetTop - navHeight) {
              currentSectionId = sections[0].getAttribute('id');
         }

        navLinks.forEach(link => {
            link.classList.remove('active');
            // Check if the link's href includes the current section ID
            const linkHref = link.getAttribute('href');
            if (linkHref && linkHref.includes(currentSectionId)) {
                link.classList.add('active');
            }
        });
    }

    // === Smooth Scrolling (using CSS primarily) ===
    // JS fallback removed for brevity unless specifically needed

    // === Footer Year ===
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // === Optional Nav Scroll Background ===
    /*
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            mainNav.classList.add('scrolled');
        } else {
            mainNav.classList.remove('scrolled');
        }
    });
    */

    // === NEW: FAQ Accordion Logic ===
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionButton = item.querySelector('.faq-question');
        const answerDiv = item.querySelector('.faq-answer');

        questionButton.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');

            // Optional: Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = null;
                }
            });

            // Toggle current item
            if (isOpen) {
                item.classList.remove('active');
                answerDiv.style.maxHeight = null; // Collapse
            } else {
                item.classList.add('active');
                // Set max-height to the scroll height to animate open
                answerDiv.style.maxHeight = answerDiv.scrollHeight + "px";
            }
        });
    });


    // === Initialization ===
    window.addEventListener('scroll', changeNavOnScroll); // Listen for scroll events
    changeNavOnScroll(); // Initial call to set active nav link

}); // End DOMContentLoaded