export function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    const counters = document.querySelectorAll('.counter');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // If it's a counter, trigger count up
                if (entry.target.classList.contains('stat')) {
                    const counter = entry.target.querySelector('.counter');
                    if (counter && !counter.dataset.started) {
                        animateCounter(counter);
                    }
                }
            }
        });
    }, { threshold: 0.15 });

    reveals.forEach(el => revealObserver.observe(el));
    
    // Also observe the stats row container specifically for counter triggers
    const statsContainer = document.querySelector('.stats-section');
    if (statsContainer) revealObserver.observe(statsContainer);
}

function animateCounter(el) {
    el.dataset.started = "true";
    const target = parseFloat(el.dataset.target);
    const duration = 2000; // 2 seconds
    const start = 0;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (easeOutQuad)
        const currentVal = start + (target - start) * (progress * (2 - progress));
        
        const isFloat = target % 1 !== 0;
        el.innerText = isFloat ? currentVal.toFixed(1) : Math.floor(currentVal);
        
        // Add prefix/suffix back if they were in the original data.js (handled in renderStats)
        // For simplicity here, we just update the number portion.
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            // Ensure exact final value
            el.innerText = target;
        }
    }
    
    requestAnimationFrame(update);
}
