document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.horizontal-container');
    const sections = Array.from(document.querySelectorAll('.horizontal-container .section'));
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    const caption = document.getElementById('caption');
    const closeBtn = document.querySelector('.close');

    if (!container || sections.length === 0) return;

    function applyWidths() {
        const w = window.innerWidth,
        h = window.innerHeight;
        sections.forEach((sec) => {
            sec.style.minWidth = w + 'px';
            sec.style.height = h + 'px';
        });
    }
    applyWidths();
    window.addEventListener('resize', applyWidths);

    // Horizontal scroll with mouse wheel
    window.addEventListener(
        'wheel',
        (e) => {
            if (modal?.classList.contains('show')) return;
            if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                e.preventDefault();
                container.scrollLeft += e.deltaY * 2.8;
            }
        },
        { passive: false }
    );

    // Touch swipe support
    let touchStartX = 0,
    touchStartY = 0,
    startScrollLeft = 0;
    container.addEventListener(
        'touchstart',
        (ev) => {
            if (ev.touches.length !== 1) return;
            touchStartX = ev.touches[0].clientX;
            touchStartY = ev.touches[0].clientY;
            startScrollLeft = container.scrollLeft;
        },
        { passive: true }
    );

    container.addEventListener(
        'touchmove',
        (ev) => {
            if (ev.touches.length !== 1) return;
            const t = ev.touches[0];
            const dx = touchStartX - t.clientX;
            const dy = touchStartY - t.clientY;
            ev.preventDefault();
            container.scrollLeft = startScrollLeft + dx + dy * 2.5;
        },
        { passive: false }
    );

    // Keyboard navigation
    window.addEventListener('keydown', (e) => {
        const w = window.innerWidth;
        if (e.key === 'ArrowRight') container.scrollLeft += w;
        if (e.key === 'ArrowLeft') container.scrollLeft -= w;
        if (e.key === 'Home') container.scrollLeft = 0;
        if (e.key === 'End') container.scrollLeft = container.scrollWidth;
    });

        // Modal / Lightbox
        const images = document.querySelectorAll('.grid-item img');
        images.forEach((img) => {
            img.addEventListener('click', () => {
                modal.classList.add('show');
                modal.setAttribute('aria-hidden', 'false');
                modalImg.src = img.src;
                modalImg.alt = img.alt || '';
                caption.textContent = img.alt || '';
            });
        });

        function closeModal() {
            modal.classList.remove('show');
            modal.setAttribute('aria-hidden', 'true');
            modalImg.src = '';
            caption.textContent = '';
        }

        closeBtn?.addEventListener('click', closeModal);
        modal?.addEventListener('click', (ev) => {
            if (ev.target === modal) closeModal();
        });

            // ==== Hyperplexed Hover Effect ====
            const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

            function addScrambleEffect(element) {
                let interval = null;
                element.addEventListener("mouseover", (event) => {
                    let iteration = 0;
                    clearInterval(interval);

                    interval = setInterval(() => {
                        event.target.innerText = event.target.innerText
                        .split("")
                        .map((letter, index) => {
                            if (index < iteration) {
                                return event.target.dataset.value[index];
                            }
                            return letters[Math.floor(Math.random() * 26)];
                        })
                        .join("");

                        if (iteration >= event.target.dataset.value.length) {
                            clearInterval(interval);
                        }

                        iteration += 1 / 3;
                    }, 30);
                });
            }

            document.querySelectorAll("[data-value]").forEach(addScrambleEffect);
});
