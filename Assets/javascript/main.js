document.querySelectorAll('a.smooth-scroll').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = 1000; 
            let start = null;

            window.requestAnimationFrame(step);

            function step(timestamp) {
                if (!start) start = timestamp;
                const progress = timestamp - start;
                const progressRatio = Math.min(progress / duration, 1); 
                const easeInOutQuad = progressRatio < 0.5
                    ? 2 * progressRatio * progressRatio
                    : -1 + (4 - 2 * progressRatio) * progressRatio; 
                window.scrollTo(0, startPosition + distance * easeInOutQuad);
                if (progress < duration) {
                    window.requestAnimationFrame(step);
                }
            }
        }
    });
});