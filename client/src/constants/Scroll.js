export const scrollToSection = (id, duration = 1000) => {
    const section = document.getElementById(id);
    if (!section) return;

    const targetPosition = section.getBoundingClientRect().top;
    const startPosition = window.pageYOffset;
    const startTime = performance.now();

    const ease = (t, b, c, d) => {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    };

    const animateScroll = currentTime => {
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, targetPosition, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animateScroll);
    };

    requestAnimationFrame(animateScroll);
};
