<?php

/**
 * Block Name: block-app
 *
 * This is the template that displays the 2-colonnes-texte block.
 */
if (have_rows('block_app')) : the_row(); // il s'agit du nom du champ dans ACF qui contient les sous-champs
    $cb_ajouter_une_classe_css = get_sub_field('cb_ajouter_une_classe_css');
    $ajouter_un_id_pour_le_css = get_sub_field('ajouter_un_id_pour_le_css');
    $couleur_de_fond_bloc = get_sub_field('couleur_de_fond_bloc');
    $marge_en_haut_du_bloc = get_sub_field('marge_en_haut_du_bloc');
    $marge_en_bas_du_bloc = get_sub_field('marge_en_bas_du_bloc');
    $faire_passer_le_bloc_au_dessus_des_autres = get_sub_field('faire_passer_le_bloc_au_dessus_des_autres');
    $fields = get_fields()['block_app'];
    // Filtrer les clés vides
    $filtered_fields = array_filter($fields, function($value) {
        return !empty($value);
    });
    $data_json = htmlspecialchars(json_encode($filtered_fields), ENT_QUOTES, 'UTF-8');
endif;
wp_enqueue_script('vue-app-js', get_stylesheet_directory_uri() . '/vue-app/dist/assets/index.js');
//wp_enqueue_style('vue-app-css', get_stylesheet_directory_uri() . '/vue-app/dist/assets/index.css');
?>

<div id="block-app" class=block-app-svg-wrapper <?php
if ($marge_en_haut_du_bloc) :  echo " padding_section_top";
endif;
if ($marge_en_bas_du_bloc) :  echo " padding_section_bottom";
endif;
if ($couleur_de_fond_bloc) :  echo " " . $couleur_de_fond_bloc;
endif;
if ($cb_ajouter_une_classe_css) :  echo " " . $cb_ajouter_une_classe_css . "";
endif;
if ($faire_passer_le_bloc_au_dessus_des_autres) :
    echo " z-index-1";
endif;
echo ' " ';
?>>

<?php echo "<div class='block-app-svg'>"; ?>
<?php echo "</div>"; ?>

<div class="block">
    <div class="content_width" id="app"
    data-json="<?= $data_json ?>">
    </div>
</div>

<?= '</div>'  ?>