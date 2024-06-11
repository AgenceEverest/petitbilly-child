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

// On désactive certains imports ACF PHP du thème parent.
define('DISABLE_ACF_CLONABLE_COLONNES_FLEXIBLES', true);
define('DISABLE_ACF_CLONABLE_OPTIONS', true);
define('DISABLE_ACF_BLOCK_1_COLONNE', true);
define('DISABLE_ACF_BLOCK_2_COLONNES', true);
define('DISABLE_ACF_BLOCK_3_COLONNES', true);
define('DISABLE_ACF_BLOCK_MULTICOLONNES', true);

/**
 * Si vous avez besoin d'ajouter des blocs ACF dans le thème enfant d'un site, il faut les ajouter ici, il su
 */
add_action('acf/init', 'my_acf_init_child');
function my_acf_init_child()
{
    // check function exists
    if (function_exists('acf_register_block')) {

        $mode = 'edit';

        acf_register_block(array(
            'name'              => 'block-app',
            'title'             => __('Bloc pour filtrer les posts (VueJS)'),
            'description'       => __('Un bloc pour le theme enfant.'),
            'render_callback'   => 'block_callback_child',
            'category'          => 'layout',
            'icon'              => 'image-flip-vertical',
            'mode'              => $mode,
        ));

        acf_register_block(array(
            'name'              => 'block-dernieres-offres',
            'title'             => __('Bloc dernires offres'),
            'description'       => __('Un bloc listant les dernières offres.'),
            'render_callback'   => 'block_callback_child',
            'category'          => 'layout',
            'icon'              => 'image-flip-vertical',
            'mode'              => $mode,
        ));
        acf_register_block(array(
            'name'              => 'block-1-colonne-custom',
            'title'             => __('block 1 colonne'),
            'description'       => __('Un bloc affichant une colonne.'),
            'render_callback'   => 'block_callback_child',
            'category'          => 'layout',
            'icon'              => 'image-flip-vertical',
            'mode'              => $mode,
        ));
        acf_register_block(array(
            'name'              => 'block-2-colonnes-custom',
            'title'             => __('block 2 colonnes flexibles'),
            'description'       => __('Un bloc affichant deux colonnes.'),
            'render_callback'   => 'block_callback_child',
            'category'          => 'layout',
            'icon'              => 'image-flip-vertical',
            'mode'              => $mode,
        ));
        acf_register_block(array(
            'name'              => 'block-3-colonnes-custom',
            'title'             => __('block 3 colonnes flexibles'),
            'description'       => __('Un bloc affichant trois colonnes.'),
            'render_callback'   => 'block_callback_child',
            'category'          => 'layout',
            'icon'              => 'image-flip-vertical',
            'mode'              => $mode,
        ));
        acf_register_block(array(
            'name'              => 'block-2-colonnes-textevisuel-custom',
            'title'             => __('block 2 colonne texte visuel'),
            'description'       => __('Un bloc affichant un texte et un visuel'),
            'render_callback'   => 'block_callback_child',
            'category'          => 'layout',
            'icon'              => 'image-flip-vertical',
            'mode'              => $mode,
        ));
        acf_register_block(array(
            'name'              => 'block-2-colonnes-textevisuel-large-custom',
            'title'             => __('block 2 colonne texte visuel large'),
            'description'       => __('Un bloc affichant un texte et un visuel prenant toute la largeur'),
            'render_callback'   => 'block_callback_child',
            'category'          => 'layout',
            'icon'              => 'image-flip-vertical',
            'mode'              => $mode,
        ));

        acf_register_block(array(
            'name'              => 'block-multicolonnes-custom',
            'title'             => __('Multicolonnes (liste d\'éléments) (custom)'),
            'description'       => __('Plusieurs colonnes de textes avec ou sans vignettes. Idéal pour présenter les membres d\'une équipe ou des références.'),
            'render_callback'   => 'block_callback',
            'category'          => 'layout',
            'icon'              => 'editor-table',
            'mode'              => $mode,
        ));

        acf_register_block(array(
            'name'              => 'block-more-informations',
            'title'             => __('Bloc plus d\'informations'),
            'description'       => __('Bloc montrant le texte "Plus d\'informations" et un lien vers la page "Contact""'),
            'render_callback'   => 'block_callback',
            'category'          => 'layout',
            'icon'              => 'editor-table',
            'mode'              => $mode,
        ));

        acf_register_block(array(
            'name'              => 'block-pourquoi-produits-differents',
            'title'             => __('Bloc Pourquoi nos produits sont différents ?'),
            'description'       => __('Bloc Pourquoi nos produits sont différents'),
            'render_callback'   => 'block_callback',
            'category'          => 'layout',
            'icon'              => 'editor-table',
            'mode'              => $mode,
        ));

        acf_register_block(array(
            'name'              => 'block-nos-valeurs',
            'title'             => __('Bloc nos valeurs'),
            'description'       => __('Bloc Nos valeurs'),
            'render_callback'   => 'block_callback',
            'category'          => 'layout',
            'icon'              => 'editor-table',
            'mode'              => $mode,
        ));

        acf_register_block(array(
            'name'              => 'block-nos-recettes-gourmandes',
            'title'             => __('Bloc nos recettes gourmandes'),
            'description'       => __('Bloc Nos recettes gourmandes'),
            'render_callback'   => 'block_callback',
            'category'          => 'layout',
            'icon'              => 'editor-table',
            'mode'              => $mode,
        ));
        acf_register_block(array(
            'name'              => 'block-la-recette-du-moment',
            'title'             => __('Bloc La recette du moment'),
            'description'       => __('Bloc La recette du moment'),
            'render_callback'   => 'block_callback',
            'category'          => 'layout',
            'icon'              => 'editor-table',
            'mode'              => $mode,
        ));

        acf_register_block(array(
            'name'              => 'block-equipes-metiers',
            'title'             => __('Bloc Nos équipes / Nos métiers'),
            'description'       => __('Bloc Nos équipes / Nos métiers'),
            'render_callback'   => 'block_callback',
            'category'          => 'layout',
            'icon'              => 'editor-table',
            'mode'              => $mode,
        ));

        acf_register_block(array(
            'name'              => 'block-dernieres-recettes',
            'title'             => __('Bloc Dernières recettes liées au produit'),
            'description'       => __('Bloc Dernières recettes liées au produit'),
            'render_callback'   => 'block_callback',
            'category'          => 'layout',
            'icon'              => 'editor-table',
            'mode'              => $mode,
        ));

        acf_register_block(array(
            'name'              => 'block-petit-billy-pour-des-fromages-uniques',
            'title'             => __('Bloc - Petit Billy pour des fromages uniques'),
            'description'       => __('Bloc - Petit Billy pour des fromages uniques'),
            'render_callback'   => 'block_callback',
            'category'          => 'layout',
            'icon'              => 'editor-table',
            'mode'              => $mode,
        ));

        acf_register_block(array(
            'name'              => 'block-profil-type-recherche',
            'title'             => __('Bloc - Profil type recherché'),
            'description'       => __('Bloc - Profil type recherché'),
            'render_callback'   => 'block_callback',
            'category'          => 'layout',
            'icon'              => 'editor-table',
            'mode'              => $mode,
        ));

        acf_register_block(array(
            'name'              => 'block-recette',
            'title'             => __('Bloc - Recette'),
            'description'       => __('Bloc - Recette'),
            'render_callback'   => 'block_callback',
            'category'          => 'layout',
            'icon'              => 'editor-table',
            'mode'              => $mode,
        ));

        acf_register_block(array(
            'name'              => 'block-plus-informations',
            'title'             => __('Bloc - Plus d\'informations'),
            'description'       => __('Bloc - Plus d\'informations'),
            'render_callback'   => 'block_callback',
            'category'          => 'layout',
            'icon'              => 'editor-table',
            'mode'              => $mode,
        ));

        acf_register_block(array(
            'name'              => 'block-nos-engagements',
            'title'             => __('Bloc - Nos engagements'),
            'description'       => __('Bloc - Nos engagements'),
            'render_callback'   => 'block_callback',
            'category'          => 'layout',
            'icon'              => 'editor-table',
            'mode'              => $mode,
        ));

        acf_register_block(array(
            'name'              => 'block-rejoignez-nos-equipes',
            'title'             => __('Bloc - Rejoignez nos équipes'),
            'description'       => __('Bloc - Rejoignez nos équipes'),
            'render_callback'   => 'block_callback',
            'category'          => 'layout',
            'icon'              => 'editor-table',
            'mode'              => $mode,
        ));

        acf_register_block(array(
			'name'				=> 'block-liste-posts',
			'title'				=> __('Bloc liste de posts'),
			'description'		=> __('Un bloc pour lister un type de posts.'),
			'render_callback'	=> 'block_callback',
			'category'			=> 'layout',
			'icon'				=> 'editor-table',
            'mode'              => $mode, // permet d'ouvrir le bloc immédiatement, l'autre mode est "edit" ou "preview"
		));
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
    $allowed_block_types = array(
        'core/paragraph',
        'acf/block-separateur',
        'acf/block-2-colonnes-textevisuel-custom',
        'acf/block-2-colonnes-textevisuel-large-custom',
        'acf/block-multicolonnes-custom',
        'acf/block-2-colonnes-custom',
        'acf/block-3-colonnes-custom',
        'acf/block-1-colonne-custom',
        'acf/block-nos-recettes-gourmandes',
        'acf/block-cpt-list-filterable',
        'acf/block-liste-de-termes',
        'acf/block-app',
        'acf/block-pourquoi-produits-differents',
        'acf/block-nos-valeurs',
        'acf/block-la-recette-du-moment',
        'acf/block-equipes-metiers',
        'acf/block-dernieres-recettes',
        'acf/block-petit-billy-pour-des-fromages-uniques',
        'acf/block-profil-type-recherche',
        'acf/block-recette',
        'acf/block-plus-informations',
        'acf/block-nos-engagements',
        'acf/block-rejoignez-nos-equipes',
        'acf/block-liste-posts',
    );
    return $allowed_block_types;
}

add_filter('allowed_block_types_all', 'my_plugin_allowed_block_types_child', 11, 3);

function showSvg($url)
{
    $response = wp_remote_get($url);
    if (is_array($response) && !is_wp_error($response)) {
        $svg = $response['body']; // use the content
    }
    return $svg;
}

add_action('wp_enqueue_scripts', function () {
    wp_enqueue_script('main-child', get_stylesheet_directory_uri() . '/js/main-child.js');
});

// functions.php du thème enfant

function mon_theme_enfant_register_menus()
{
    register_nav_menus(array(
        'menu-footer-2' => 'Menu Footer 2',
        'menu-footer-gauche' => 'Menu Footer Gauche',
        'menu-footer-droite' => 'Menu Footer Droite',
    ));
}
add_action('after_setup_theme', 'mon_theme_enfant_register_menus');

function acf_load_valeurs_nutritionelles($field)
{
    $field['choices'] = array();

    $valeurs = get_field('valeurs_nutritionnelles', 'option');
    foreach ($valeurs as $valeur) :
        foreach ($valeur as $value) :
            $field['choices'][$value] = $value;
        endforeach;
    endforeach;
    return $field;
}

add_filter('acf/load_field/name=valeur_nutritionnelle_nom', 'acf_load_valeurs_nutritionelles');










add_action('rest_api_init', 'custom_register_recettes_endpoint');

function custom_register_recettes_endpoint()
{
    register_rest_route('custom/v1', 'recettes', array(
        'methods' => 'GET',
        'callback' => 'custom_get_recettes_data',
        'permission_callback' => '__return_true',
    ));
}

function custom_get_recettes_data()
{
    $args = array(
        'post_type' => 'recettes',
        'posts_per_page' => -1,
    );

    $recettes = get_posts($args);

    $data = array();

    foreach ($recettes as $recette) {
        $post_id = $recette->ID;

        // Récupérer les données spécifiques pour chaque recette.
        $title = get_the_title($post_id);
        $permalink = get_permalink($post_id);
        $thumbnail = get_the_post_thumbnail_url($post_id, 'thumbnail');

        // Récupérer les termes de toutes les taxonomies liées au CPT "recettes".
        $taxonomies = get_object_taxonomies('recettes', 'objects');
        $all_terms = array();
        $taxonomy_terms = array();

        foreach ($taxonomies as $taxonomy) {
            $taxonomy_name = $taxonomy->name;
            $terms = get_the_terms($post_id, $taxonomy_name);

            if (!empty($terms)) {
                $taxonomy_terms_ids = array();

                foreach ($terms as $term) {
                    $taxonomy_terms_ids[] = $term->term_id;
                    $all_terms[$taxonomy->name][] = $term->name;
                }

                $taxonomy_terms[$taxonomy_name] = $taxonomy_terms_ids;
            }
        }


  

        // Récupérer les champs ACF pour chaque recette (si ACF est activé).
        if (function_exists('get_fields')) {
            $acf_data = get_fields($post_id);
        } else {
            $acf_data = array();
        }

        // Créer un tableau avec toutes les données pour chaque recette.
        $recette_data = array(
            'title' => $title,
            'permalink' => $permalink,
            'thumbnail' => $thumbnail,
            'terms' => $all_terms,
            'acf' => $acf_data,
        );

        // Ajouter les données des taxonomies dans l'array $recette_data.
        foreach ($taxonomy_terms as $taxonomy_name => $terms_ids) {
            $recette_data[$taxonomy_name] = $terms_ids;
        }

        $data[] = $recette_data;
    }

    return rest_ensure_response($data);
}


add_action('rest_api_init', 'custom_register_produits_endpoint');

function custom_register_produits_endpoint()
{
    register_rest_route('custom/v1', 'produits', array(
        'methods' => 'GET',
        'callback' => 'custom_get_produits_data',
        'permission_callback' => '__return_true',
    ));
}

function custom_get_produits_data()
{
    $args = array(
        'post_type' => 'produits',
        'posts_per_page' => -1,
    );

    $produits = get_posts($args);

    $data = array();

    foreach ($produits as $produits) {
        $post_id = $produits->ID;

        // Récupérer les données spécifiques pour chaque produits.
        $title = get_the_title($post_id);
        $permalink = get_permalink($post_id);
        $thumbnail = get_the_post_thumbnail_url($post_id, 'thumbnail');

        // Récupérer les termes de toutes les taxonomies liées au CPT "produits".
        $taxonomies = get_object_taxonomies('produits', 'objects');
        $all_terms = array();
        $taxonomy_terms = array();

        foreach ($taxonomies as $taxonomy) {
            $taxonomy_name = $taxonomy->name;
            $terms = get_the_terms($post_id, $taxonomy_name);

            if (!empty($terms)) {
                $taxonomy_terms_ids = array();

                foreach ($terms as $term) {
                    $taxonomy_terms_ids[] = $term->term_id;
                    $all_terms[] = $term->name;
                }

                $taxonomy_terms[$taxonomy_name] = $taxonomy_terms_ids;
            }
        }

        // Récupérer les champs ACF pour chaque produits (si ACF est activé).
        if (function_exists('get_fields')) {
            $acf_data = get_fields($post_id);
        } else {
            $acf_data = array();
        }

        // Créer un tableau avec toutes les données pour chaque produits.
        $produits_data = array(
            'title' => $title,
            'permalink' => $permalink,
            'thumbnail' => $thumbnail,
            'terms' => $all_terms,
            'acf' => $acf_data,
        );

        // Ajouter les données des taxonomies dans l'array $produits_data.
        foreach ($taxonomy_terms as $taxonomy_name => $terms_ids) {
            $produits_data[$taxonomy_name] = $terms_ids;
        }

        $data[] = $produits_data;
    }

    return rest_ensure_response($data);
}




