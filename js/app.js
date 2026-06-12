import { PROCESS_STEPS, STATS } from './data.js';
import { fetchProducts } from './sheets.js';

document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

async function initApp() {
    // Fetch products from Google Sheets (falls back to local data.js)
    const products = await fetchProducts();
    renderFabrics(products);

    renderProcess();
    renderStats();
    renderSustainability();
    initContactForm();

    // Initialize interactive modules
    import('./navigation.js').then(module => module.initNav());
    import('./scroll.js').then(module => module.initScrollReveal());
}

// ─── Contact Form Integration ────────────────────────────────
// Get your ID at Formspree.io and paste it here:
const FORMSPREE_ID = 'mpqeybav'; 

function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    // Create notification element if it doesn't exist
    if (!document.getElementById('form-notification')) {
        const notif = document.createElement('div');
        notif.id = 'form-notification';
        notif.className = 'notification';
        notif.innerHTML = `
            <h4>Message Sent!</h4>
            <p>Thank you for reaching out. Our team will contact you shortly.</p>
        `;
        document.body.appendChild(notif);
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = form.querySelector('button');
        const originalText = btn.textContent;

        // UI Loading State
        btn.disabled = true;
        btn.textContent = 'Sending...';

        try {
            const formData = new FormData(form);
            const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                showNotification('Message Sent!', 'Thank you for reaching out. Our team will contact you shortly.', false);
                form.reset();
            } else {
                throw new Error('Failed to send');
            }
        } catch (error) {
            showNotification('Oops!', 'Something went wrong. Please check your Formspree ID in app.js or email us directly.', true);
        } finally {
            btn.disabled = false;
            btn.textContent = originalText;
        }
    });
}

function showNotification(title, message, isError = false) {
    const notif = document.getElementById('form-notification');
    const titleEl = notif.querySelector('h4');
    const pEl = notif.querySelector('p');

    titleEl.textContent = title;
    pEl.textContent = message;

    if (isError) {
        notif.classList.add('error');
    } else {
        notif.classList.remove('error');
    }

    notif.classList.add('show');
    setTimeout(() => {
        notif.classList.remove('show');
    }, 6000);
}

function renderSustainability() {
    const container = document.querySelector('.eco-grid');
    if (!container) return;

    const items = [
        { icon: "⚡", title: "Energy Efficient", desc: "Using high-speed, low-power machinery to reduce overall carbon impact." },
        { icon: "🎯", title: "Precision Knitting", desc: "Advanced circular machines that minimize raw material waste per batch." },
        { icon: "🛡️", title: "Durability Focused", desc: "Engineering high-performance fabrics designed for extreme longevity and wear." },
        { icon: "💧", title: "Safe Dyeing", desc: "Prioritizing non-toxic, skin-safe dyes and closed-loop water processes." },
        { icon: "🏗️", title: "Surat Hub", desc: "Leveraging local manufacturing to minimize transportation logistics." },
        { icon: "🤝", title: "Ethical Standards", desc: "Maintaining a safe, high-standard workplace for our entire team." }
    ];

    container.innerHTML = `
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
            ${items.map(item => `
                <div class="glass-card reveal-up" style="text-align: center;">
                    <div style="font-size: 2.5rem; margin-bottom: 15px;">${item.icon}</div>
                    <h4 style="color: var(--accent-gold); margin-bottom: 10px;">${item.title}</h4>
                    <p style="font-size: 0.85rem; margin: 0 auto; color: var(--text-secondary);">${item.desc}</p>
                </div>
            `).join('')}
        </div>
    `;
}

function renderFabrics(products) {
    const grid = document.getElementById('fabrics-grid');
    if (!grid) return;

    if (!products || products.length === 0) {
        grid.innerHTML = '<p style="text-align: center; color: var(--text-secondary); grid-column: 1/-1;">No products available at the moment.</p>';
        return;
    }

    grid.innerHTML = products.map(product => `
        <div class="glass-card reveal-up">
            <div class="card-img" style="height: 180px; background: var(--bg-tertiary); border-radius: 8px; margin-bottom: 20px; overflow: hidden;">
                <img src="${product.image}" 
                     alt="${product.name}" 
                     onerror="this.src='https://placehold.co/400x300?text=No+Image'; this.style.opacity='0.5';"
                     style="width: 100%; height: 100%; object-fit: cover; opacity: 1; transition: opacity 0.3s;">
            </div>
            <span class="label" style="font-size: 0.65rem; color: var(--text-tertiary); margin-bottom: 5px;">${product.category || 'Fabric'}</span>
            <h3 style="font-size: 1.1rem; margin-bottom: 10px;">${product.name}</h3>
            ${product.specs ? `
                <div class="specs" style="display: flex; gap: 10px; border-top: 1px solid var(--border); padding-top: 10px;">
                    ${product.specs.gsm ? `<span style="font-size: 0.75rem; color: var(--accent-gold);">GSM: ${product.specs.gsm}</span>` : ''}
                </div>
            ` : ''}
        </div>
    `).join('');
}

function renderProcess() {
    const container = document.querySelector('.process-timeline');
    if (!container) return;

    container.innerHTML = `
        <div style="display: flex; justify-content: space-between; gap: 20px; flex-wrap: wrap;">
            ${PROCESS_STEPS.map((step, index) => `
                <div class="process-step reveal-up" style="flex: 1; min-width: 200px; text-align: center;">
                    <div class="step-num" style="font-family: var(--font-heading); font-size: 3rem; color: var(--accent-gold); opacity: 0.3; margin-bottom: -20px;">0${index + 1}</div>
                    <h4 style="margin-bottom: 10px;">${step.title}</h4>
                    <p style="font-size: 0.85rem;">${step.desc}</p>
                </div>
            `).join('')}
        </div>
    `;
}

function renderStats() {
    const container = document.getElementById('counter-row');
    if (!container) return;

    container.innerHTML = STATS.map(stat => `
        <div class="stat reveal-up">
            <span class="counter" data-target="${stat.value}">${stat.prefix}0${stat.suffix}</span>
            <p>${stat.label}</p>
        </div>
    `).join('');
}
