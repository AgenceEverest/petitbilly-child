/**
 * Récupère les boutons de la page et redimensionne le SVG qui sert de background selon la taille du lien.
 * Ajoute 20 pixels à la longueur pour le padding left / right 
 */
function resizeButtonsBackgroundAccordingToLink() {
    const ctas = document.querySelectorAll('.cta-container');
    if (ctas.length > 0) {
        ctas.forEach(cta => {
            const linkInCta = cta.querySelector('a');
            const widthOfLink = linkInCta.offsetWidth;

            const svgInCta = cta.querySelector('svg');
            svgInCta.style.width = `${widthOfLink + 20}px`;
        })
    }
}

function adaptGreenEdgeAccordingHeight() {
    const blocks = document.querySelectorAll('.block');
    blocks.forEach(block => {
        const edgeTall = block.querySelector('.green-edge-desktop-tall');
        const edgeRegular = block.querySelector('.green-edge');

        if (edgeTall && edgeRegular) {
            block.offsetHeight > 700 ? edgeRegular.remove() : edgeTall.remove()
        }
    })
}

window.addEventListener('DOMContentLoaded', () => {
    resizeButtonsBackgroundAccordingToLink()
    adaptGreenEdgeAccordingHeight()
})


