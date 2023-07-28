<?php

/**
 * Block Name: block-la-recette-du-moment
 *
 * This is the template that displays the 2-colonnes-texte block.
 */
if (have_rows('block_recette_du_moment')) : the_row(); // il s'agit du nom du champ dans ACF qui contient les sous-champs
    $cb_ajouter_une_classe_css = get_sub_field('cb_ajouter_une_classe_css');
    $ajouter_un_id_pour_le_css = get_sub_field('ajouter_un_id_pour_le_css');
    $couleur_de_fond_bloc = get_sub_field('couleur_de_fond_bloc');
    $marge_en_haut_du_bloc = get_sub_field('marge_en_haut_du_bloc');
    $marge_en_bas_du_bloc = get_sub_field('marge_en_bas_du_bloc');

    $vague_au_dessus_du_bloc = get_sub_field('vague_au_dessus_du_bloc');
    $vague_au_dessous_du_bloc = get_sub_field('vague_au_dessous_du_bloc');
    $marge_en_haut_du_bloc = get_sub_field('marge_en_haut_du_bloc');
    $marge_en_bas_du_bloc = get_sub_field('marge_en_bas_du_bloc');
    $padding_en_haut_du_bloc = get_sub_field('padding_en_haut_du_bloc');
    $padding_en_bas_du_bloc = get_sub_field('padding_en_bas_du_bloc');
    $faire_passer_le_bloc_au_dessus_des_autres = get_sub_field('faire_passer_le_bloc_au_dessus_des_autres');


    $titre_recette_du_moment = get_sub_field('titre_recette_du_moment');
    $nom_de_la_recette = get_sub_field('nom_de_la_recette');
    $visuel_recette_du_moment = get_sub_field('visuel_recette_du_moment');
endif;
?>
<div class="<?php
            if ($marge_en_haut_du_bloc) : echo " margin_section_top";
            endif;
            if ($marge_en_bas_du_bloc) : echo " margin_section_bottom";
            endif;
            if ($couleur_de_fond_bloc) :
                echo ' ' . $couleur_de_fond_bloc . '_vague';
            endif;
            ?>
">
    <?php if ($vague_au_dessus_du_bloc) : ?>
        <div class="vague-haut">
            <?= showSvg(get_stylesheet_directory_uri() . '/svg/vague-haut.svg') ?>
        </div>
    <?php endif; ?>
    <div <?php echo " ";
            if ($ajouter_un_id_pour_le_css) :
                echo " id='" . $ajouter_un_id_pour_le_css . "'";
            endif;
            echo " class='";
            if ($cb_ajouter_une_classe_css) :
                echo " " . $cb_ajouter_une_classe_css . "";
            endif;
            if ($padding_en_haut_du_bloc) : echo " padding_section_top";
            endif;
            if ($padding_en_bas_du_bloc) : echo " padding_section_bottom";
            endif;
            if ($couleur_de_fond_bloc) :
                echo " " . $couleur_de_fond_bloc;
            endif;
            if ($faire_passer_le_bloc_au_dessus_des_autres) : echo " z-index-1";
            endif;
            echo " block-recette-du-moment'"; ?>>

        <!-- titre avant les colonnes-->
        <?php $titre_avant_les_colonnes = get_sub_field('titre_avant_les_colonnes');
        $largeur_de_la_colonne_titre = get_sub_field('largeur_de_la_colonne_titre');
        $separateur_de_la_colonne_titre = get_sub_field('separateur_de_la_colonne_titre');
        $colonne1 = get_sub_field('colonne_1'); ?>
        <!-- colonnes -->
        <div class="content_width col_flexible col_flexible_2">
            <!-- Les 2 colonnes -->
            <?= showSvg(get_stylesheet_directory_uri() . '/svg/green-edge') ?>
            <?= showSvg(get_stylesheet_directory_uri() . '/svg/green-edge-mobile') ?>
            <?= showSvg(get_stylesheet_directory_uri() . '/svg/recette-moment-haut-gauche') ?>
            <?= showSvg(get_stylesheet_directory_uri() . '/svg/recette-moment-bas-droit') ?>
            <div class="col_flexible_wrapper">
                <div class="col-1">
                    <?= $titre_recette_du_moment ?> <!-- champ ACF wysiwygf -->
                    <h3><strong><?= $nom_de_la_recette ?></strong></h3>
                    <?php get_template_part('inc/content-builder-inc/cta-col') ?>
                </div>
                <div class="col-2">
                    <img src="<?= $visuel_recette_du_moment ?>" alt="<?= $nom_de_la_recette ?>">
                </div>
            </div>
        </div>
    </div>

    <?php if ($vague_au_dessous_du_bloc) : ?>
        <div class="vague-basse">
            <?= showSvg(get_stylesheet_directory_uri() . '/svg/vague-bas.svg') ?>
        </div>
    <?php endif; ?>
</div>