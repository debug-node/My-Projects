const text = document.getElementById("text");

// Wrap non-space characters in span
text.innerHTML = text.textContent.replace(/\S/g, "<span>$&</span>");

const spans = document.querySelectorAll("#text span");

spans.forEach(span => {
  // mouseover triggers smoke
  span.addEventListener("mouseover", () => {
    // prevent retriggering if already animating
    if (span.classList.contains('active')) return;

    // random small delay (0 to 0.5s) for natural variance
    const delay = (Math.random() * 0.5).toFixed(3) + "s";
    span.style.animationDelay = delay;

    // remove any leftover reappear class and ensure opacity/resets
    span.classList.remove('reappear');
    span.style.opacity = ''; // clear inline opacity if set

    // add active to run smoke
    span.classList.add('active');
  });

  // after the smoke animation finishes, make the letter gently reappear
  span.addEventListener("animationend", (ev) => {
    // if the finished animation was the smoke animation
    if (ev.animationName === 'smoke') {
      // clear active so future hovers can animate again
      span.classList.remove('active');

      // ensure the element starts from opacity 0 so reappear animates smoothly
      span.style.opacity = '0';

      // use requestAnimationFrame to ensure the browser notices the opacity change,
      // then add the reappear class to animate opacity -> 1
      requestAnimationFrame(() => {
        // small timeout to make the reappear visible as a smooth fade
        setTimeout(() => {
          span.classList.add('reappear');

          // cleanup after reappear completes
          const onReappearEnd = (e2) => {
            if (e2.animationName === 'reappear') {
              span.classList.remove('reappear');
              span.style.opacity = ''; // restore default
              span.removeEventListener('animationend', onReappearEnd);
            }
          };
          span.addEventListener('animationend', onReappearEnd);
        }, 50);
      });
    }
  });
});
