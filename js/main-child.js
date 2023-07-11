window.addEventListener('DOMContentLoaded', () => {
    const ctas = document.querySelectorAll('.cta-container');
    if (ctas.length > 0) {
        ctas.forEach(cta => {
            const linkInCta = cta.querySelector('a');
            const widthOfLink = linkInCta.offsetWidth;

            const svgInCta = cta.querySelector('svg');
            svgInCta.style.width = `${widthOfLink + 20}px`;
        })
    }
})