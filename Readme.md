# Cadre vert autour des blocs 
Tous les blocs ont la possibilité d'avoir un cadre vert. Les côtés gauche et droite du cadre disparaissent sur mobile.
Deux SVG sont utilisés : green-edge, green-edge-desktop-tall. Une fonction JavaScript vérifie la taille du bloc et choisit l'un des cadres selon la taille du bloc, car si le bloc est très haut, le SVG est trop déformé. 

Sur tous les blocks, dans la div parente, une condition vérifie l'activation du cadre par l'utilisateur et rajoute une classe CSS 'has-edge'.

