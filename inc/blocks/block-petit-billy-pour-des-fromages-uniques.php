<?php

/**
 * Block Name: block-petit-billy-pour-des-fromages-uniques
 *
 * 
 */

if (have_rows('petit_billy_pour_des_fromages_uniques')) : the_row(); // il s'agit du nom du champ dans ACF qui contient les sous-champs
    $cb_ajouter_une_classe_css = get_sub_field('cb_ajouter_une_classe_css');
    $ajouter_un_id_pour_le_css = get_sub_field('ajouter_un_id_pour_le_css');
    $couleur_de_fond_bloc = get_sub_field('couleur_de_fond_bloc');
    $marge_en_haut_du_bloc = get_sub_field('marge_en_haut_du_bloc');
    $marge_en_bas_du_bloc = get_sub_field('marge_en_bas_du_bloc');
    $vague_au_dessus_du_bloc = get_sub_field('vague_au_dessus_du_bloc');
    $vague_au_dessous_du_bloc = get_sub_field('vague_au_dessous_du_bloc');
    $padding_en_haut_du_bloc = get_sub_field('padding_en_haut_du_bloc');
    $padding_en_bas_du_bloc = get_sub_field('padding_en_bas_du_bloc');
    $faire_passer_le_bloc_au_dessus_des_autres = get_sub_field('faire_passer_le_bloc_au_dessus_des_autres');
    $liseret_vert_autour_du_bloc = get_sub_field('liseret_vert_autour_du_bloc');
endif;
?>
<div class="<?php if ($couleur_de_fond_bloc) :
                echo ' ' . $couleur_de_fond_bloc;
            endif;
            if ($marge_en_haut_du_bloc) : echo " margin_section_top";
            endif;
            if ($marge_en_bas_du_bloc) : echo " margin_section_bottom";
            endif; ?>">
    <?php if ($vague_au_dessus_du_bloc) : ?>
        <div class="vague-haut">
            <?= showSvg(get_stylesheet_directory_uri() . '/svg/vague-haut.svg') ?>
        </div>
    <?php endif; ?>
    <div <?php if ($ajouter_un_id_pour_le_css) : echo " id='" . $ajouter_un_id_pour_le_css . "'";
            endif;
            echo " class='";
            if ($cb_ajouter_une_classe_css) : echo " " . $cb_ajouter_une_classe_css . "";
            endif;
            if ($padding_en_haut_du_bloc) : echo " padding_section_top";
            endif;
            if ($padding_en_bas_du_bloc) : echo " padding_section_bottom";
            endif;

            if ($faire_passer_le_bloc_au_dessus_des_autres) : echo " z-index-1";
            endif;
            echo " block-fromages-uniques'"; ?>>

        <!-- titre avant les colonnes-->
        <?php $titres_avant_les_cartes = get_sub_field('titres_avant_les_cartes');
        if ($titres_avant_les_cartes) : ?>
            <div class="block <?php if ($liseret_vert_autour_du_bloc) : echo ' has-edge ';
                                endif; ?> content_width zone_texte_avant_colonnes">
                <?php if ($liseret_vert_autour_du_bloc) : ?>
                    <?= showSvg(get_stylesheet_directory_uri() . '/svg/green-edge-desktop-tall') ?>
                    <?= showSvg(get_stylesheet_directory_uri() . '/svg/green-edge') ?>
                    <?= showSvg(get_stylesheet_directory_uri() . '/svg/recette-moment-haut-gauche') ?>
                    <?= showSvg(get_stylesheet_directory_uri() . '/svg/recette-moment-bas-droit') ?>
                <?php endif; ?>
                <div class="entry-content">
                    <?php echo $titres_avant_les_cartes; ?>
                </div>
            </div>
        <?php endif; ?>
        <div class="cartes content_width">
            <?php if (have_rows('les_cartes')) :
                while (have_rows('les_cartes')) : the_row();
                    $titre_carte = get_sub_field('titre_carte');
                    $texte_carte = get_sub_field('texte_carte'); ?>
                    <div class="carte">
                        <h3 class="carte-titre">
                            <?php echo esc_html($titre_carte); ?>
                        </h3>
                        <div class="img-difference-wrapper">
                            <p><?= $texte_carte ?></p>
                        </div>
                    </div>
            <?php endwhile;
            endif; ?>
        </div>
        <?php if ($vague_au_dessous_du_bloc) : ?>
            <div class="vague-basse">
                <?= showSvg(get_stylesheet_directory_uri() . '/svg/vague-bas.svg') ?>
            </div>
        <?php endif; ?>
    </div>
</div>