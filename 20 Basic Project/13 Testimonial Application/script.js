// Data
const testimonials = [
    { name: "Bijay Kumar", position: "Creator of Info with Vijay", image: "https://cdn.pixabay.com/photo/2016/04/22/04/57/graduation-1345143_640.png", testimonial: "Very helpful content and clear tutorials. I learned a lot and the code examples were easy to follow." },
    { name: "Dino Code Academy", position: "Tutorial Channel", image: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359554_640.png", testimonial: "Practical lessons — step-by-step and beginner friendly. Highly recommended for new developers!" },
    { name: "Vijay Kumar", position: "Founder of the Dino Code Academy", image: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png", testimonial: "Great explanations, excellent pacing and nice visuals. This helped me build confidence." }
];

const container = document.getElementById('_testimonial-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const dotsWrapper = document.getElementById('dots');
const card = document.getElementById('card');
let currentIndex = 0;
let autoRotateTimer = null;
const AUTO_ROTATE_MS = 4000;

function buildDots() {
    dotsWrapper.innerHTML = "";
    testimonials.forEach((_, i) => {
        const d = document.createElement('div');
        d.className = 'dot' + (i === currentIndex ? ' active' : '');
        d.addEventListener('click', () => goTo(i));
        dotsWrapper.appendChild(d);
    })
}

function showTestimonial() {
    const t = testimonials[currentIndex];
    container.innerHTML = "";
    const div = document.createElement('div'); div.className = 'fade-enter';
    const img = document.createElement('img'); img.src = t.image;
    const h3 = document.createElement('h3'); h3.textContent = t.name;
    const h6 = document.createElement('h6'); h6.textContent = t.position;
    const p = document.createElement('p'); p.textContent = t.testimonial;
    div.append(img, h3, h6, p);
    container.appendChild(div);
    requestAnimationFrame(() => div.classList.add('fade-enter-active'));

    document.querySelectorAll('.dot').forEach((dot, idx) =>
        dot.classList.toggle('active', idx === currentIndex)
    );
}

function changeTestimonial(d) {
    currentIndex += d;
    if (currentIndex < 0) currentIndex = testimonials.length - 1;
    else if (currentIndex >= testimonials.length) currentIndex = 0;
    showTestimonial();
}
function goTo(i) { currentIndex = i; showTestimonial(); }

function startAuto() { if (!AUTO_ROTATE_MS) return; stopAuto(); autoRotateTimer = setInterval(() => changeTestimonial(1), AUTO_ROTATE_MS) }
function stopAuto() { if (autoRotateTimer) { clearInterval(autoRotateTimer); autoRotateTimer = null } }

prevBtn.onclick = () => { changeTestimonial(-1); restart() };
nextBtn.onclick = () => { changeTestimonial(1); restart() };
window.onkeydown = e => { if (e.key === 'ArrowLeft') changeTestimonial(-1); if (e.key === 'ArrowRight') changeTestimonial(1) };
card.onmouseenter = stopAuto;
card.onmouseleave = startAuto;
function restart() { stopAuto(); startAuto() }

buildDots();
showTestimonial();
startAuto();