<?php
function styles2_css()
{
    // Chargement du style.css pour le thème enfant.
    wp_enqueue_style( 'child-style', get_stylesheet_uri(),
        array( 'parenthandle' )
    );
    // Chargement de mainchild.css pour le thème enfant.
    wp_enqueue_style('mainchild', get_stylesheet_directory_uri() . '/css/mainchild.css', array(), filemtime(get_stylesheet_directory_uri() . '/css/mainchild.css'), false);
}

//la priorité à 99, c'est pour que main2.css soit chargé après main.css, de cette manière les règles CSS du thème enfant peuvent écraser celles du thème parent.
add_action('wp_enqueue_scripts', 'styles2_css',99); ?> 
