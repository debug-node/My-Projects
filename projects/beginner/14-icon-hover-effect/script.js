const cursor = document.querySelector('.cursor');
const label = cursor.querySelector('.cursor-label');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
});

const items = document.querySelectorAll('.icon-nav li');

items.forEach(item => {
    const labelText = item.dataset.label || '';

    item.addEventListener('mouseenter', () => {
        label.textContent = labelText;
        cursor.classList.add('active');
        item.addEventListener('mousemove', magnetEffect);
    });

    item.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
        label.textContent = '';
        item.removeEventListener('mousemove', magnetEffect);
        item.style.transform = '';
    });

    function magnetEffect(e) {
        const rect = item.getBoundingClientRect();
        const relX = e.clientX - (rect.left + rect.width / 2);
        const relY = e.clientY - (rect.top + rect.height / 2);

        const maxMove = 12; // stronger magnet effect
        const moveX = (relX / rect.width) * maxMove;
        const moveY = (relY / rect.height) * maxMove;

        item.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.04)`;
    }
});