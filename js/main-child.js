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

function openCloseMenuBurger() {
    const burgerIcon = document.querySelector('#burger');
    const closeBurger = document.querySelector('#close-burger');
    if (burgerIcon && closeBurger) {
        burgerIcon.addEventListener('click', () => {
            burgerIcon.style.display = 'none';
            closeBurger.style.display = 'flex';
        })
        closeBurger.addEventListener('click', () => {
            closeBurger.style.display = 'none';
            burgerIcon.style.display = 'flex';
        })
    }
}

window.addEventListener('DOMContentLoaded', () => {
    resizeButtonsBackgroundAccordingToLink()
    adaptGreenEdgeAccordingHeight()
    openCloseMenuBurger()
    displayIframe()
    newsletter()
})


function displayIframe() {
    iframeSwitch = document.getElementById('iframe_switch');
    if (iframeSwitch) {
        iframeSwitch.addEventListener('click', () => {
            let iframeWrapper = document.getElementById('iframe-wrapper');
            iframeWrapper.setAttribute('style', 'display: flex;');
            let link = iframeSwitch.getAttribute('data-link');
            console.log(iframeWrapper)
            let iframeContainer = document.getElementById('iframe-container');
            iframeContainer.setAttribute('src', link);
            let ctaIframe = document.getElementById('cta-iframe');
            ctaIframe.style.display = "none";

        });
    }
}


function newsletter() {
    const newsletterContainer = document.getElementById('newsletter-container');
    const buttonNewsletter = document.getElementById('bouton-newlsetter');
    const closeButton = document.getElementById('closeNewsletter');
    let newsletterOpened = false;
    if (buttonNewsletter) {
        buttonNewsletter.addEventListener('click', () => {
            if (!newsletterOpened) {
                newsletterContainer.style.display = "block";
                newsletterOpened = true;
                document.getElementsByTagName('html')[0].style.overflowY = "hidden";
            } else {
                newsletterContainer.style.display = "none";
                newsletterOpened = false;
                document.getElementsByTagName('html')[0].style.overflowY = "inherit";

            }
        });
    }
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            newsletterContainer.style.display = "none";
            newsletterOpened = false;
            document.getElementsByTagName('html')[0].style.overflowY = "inherit";
        })
    }


}

