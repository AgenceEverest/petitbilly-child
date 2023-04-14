<?php
function styles2_css()
{
    // Chargement du style.css pour le thème enfant.
    wp_enqueue_style(
        'child-style',
        get_stylesheet_uri(),
        array('parenthandle')
    );
    // Chargement de mainchild.css pour le thème enfant.
    wp_enqueue_style('mainchild', get_stylesheet_directory_uri() . '/css/mainchild.css', array(), filemtime(get_stylesheet_directory() . '/css/mainchild.css'), false);
}

//la priorité à 99, c'est pour que main2.css soit chargé après main.css, de cette manière les règles CSS du thème enfant peuvent écraser celles du thème parent.
add_action('wp_enqueue_scripts', 'styles2_css', 99);

/**
 * Si vous avez besoin d'ajouter des blocs ACF dans le thème enfant d'un site, il faut les ajouter ici, il su
 */
add_action('acf/init', 'my_acf_init_child');
function my_acf_init_child()
{
    // check function exists
    if (function_exists('acf_register_block')) {
        // register block test
        /* acf_register_block(array(
            'name'                => 'block-pour-theme-enfant',
            'title'                => __('Bloc theme enfant'),
            'description'        => __('Un bloc pour le theme enfant.'),
            'render_callback'    => 'block_callback_child',
            'category'            => 'layout',
            'icon'                => 'image-flip-vertical',
            'mode'                => 'edit', // permet d'ouvrir le bloc immédiatement, l'autre mode est "preview"
        )); */
    }
}
function block_callback_child($block)
{
    // convert name ("acf/bloc-name") into path friendly slug ("bloc-name")
    $slug = str_replace('acf/', '', $block['name']);
    // include a template part from within the "template-parts/blocks" folder
    if (file_exists(get_theme_file_path("/inc/blocks/{$slug}.php"))) {
        include(get_theme_file_path("/inc/blocks/{$slug}.php"));
    }
}

// filtre les blocs : seuls les blocs déclarés par cette fonction seront affichés 
// Il faut rajouter le bloc de notre thème enfant dans cette liste 
function my_plugin_allowed_block_types_child($allowed_block_types_all, $post)
{
    return array('core/paragraph', 'acf/block-separateur', 'acf/block-2-colonnes-textevisuel', 'acf/block-2-colonnes-textevisuel-large', 'acf/block-multicolonnes', 'acf/block-2-colonnes', 'acf/block-3-colonnes', 'acf/block-1-colonne', 'acf/block-ancres', 'acf/block-cpt-list-filterable', 'acf/block-liste-de-termes');
}
add_filter('allowed_block_types_all', 'my_plugin_allowed_block_types_child', 11, 3);




