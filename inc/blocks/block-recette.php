<?php

/**
 * Block Name: block-1-colonne-custom   
 *
 * This is the template that displays the 1-colonnes-texte block.
 */
if (have_rows('block_recette')) : the_row(); // il s'agit du nom du champ dans ACF qui contient les sous-champs
    $cb_ajouter_une_classe_css = get_sub_field('cb_ajouter_une_classe_css');
    $ajouter_un_id_pour_le_css = get_sub_field('ajouter_un_id_pour_le_css');
    $couleur_de_fond_bloc = get_sub_field('couleur_de_fond_bloc');
    $marge_en_haut_du_bloc = get_sub_field('marge_en_haut_du_bloc');
    $marge_en_bas_du_bloc = get_sub_field('marge_en_bas_du_bloc');
    $cb_calltoaction = get_sub_field('cb_call-to-action');
    $cb_calltoaction_lien = get_sub_field('cb_call-to-action_lien');
    $cb_calltoaction_url = get_sub_field('cb_call-to-action_url');
    $cb_calltoaction_fichier = get_sub_field('cb_call-to-action_fichier');
    $cb_calltoaction_fichier_size = filesize(get_attached_file($cb_calltoaction_fichier));
    $cb_calltoaction_interne_externe = get_sub_field('lien_interne_ou_externe_');
    $ouvrir_dans_un_nouvel_onglet = get_sub_field('ouvrir_dans_un_nouvel_onglet');
    $alignement_du_bouton = get_sub_field('alignement_du_bouton');
    $style_du_bouton = get_sub_field('style_du_bouton');
    $vague_au_dessus_du_bloc = get_sub_field('vague_au_dessus_du_bloc');
    $vague_au_dessous_du_bloc = get_sub_field('vague_au_dessous_du_bloc');
    $padding_en_haut_du_bloc = get_sub_field('padding_en_haut_du_bloc');
    $padding_en_bas_du_bloc = get_sub_field('padding_en_bas_du_bloc');
    $liseret_vert_autour_du_bloc = get_sub_field('liseret_vert_autour_du_bloc');

    /////////////
    $difficulte_de_la_recette = get_sub_field('difficulte_de_la_recette');
    $minutes_de_preparation = get_sub_field('minutes_de_preparation');
    $texte_minutes_de_preparation = get_sub_field('texte_minutes_de_preparation');
    $nombre_de_personnes = get_sub_field('nombre_de_personnes');
    $texte_combien_de_personnes = get_sub_field('texte_combien_de_personnes');
    $minutes_de_cuisson = get_sub_field('minutes_de_cuisson');
    $texte_minutes_de_cuisson = get_sub_field('texte_minutes_de_cuisson');
    $liste_des_ingredients_titre = get_sub_field('liste_des_ingredients_titre');
    $liste_des_ingredients_wysiwyg = get_sub_field('liste_des_ingredients_wysiwyg');
endif;
?>
<div class="<?php
            if ($marge_en_haut_du_bloc) : echo " margin_section_top";
            endif;
            if ($marge_en_bas_du_bloc) : echo " margin_section_bottom";
            endif; ?>
">
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
            if ($liseret_vert_autour_du_bloc) : echo " has-edge ";
            endif;
            if ($couleur_de_fond_bloc) :
                echo ' ' . $couleur_de_fond_bloc;
            endif;
            echo " block block-recette'"; ?>>
        <?php if ($liseret_vert_autour_du_bloc) : ?>
            <?= showSvg(get_stylesheet_directory_uri() . '/svg/green-edge-desktop-tall') ?>
            <?= showSvg(get_stylesheet_directory_uri() . '/svg/green-edge') ?>
        <?php endif; ?>
        <!-- titre avant les colonnes-->
        <!-- colonnes -->
        <div class="content_width recettes-caracteristiques-wrapper">
            <?php $largeur_de_la_colonne_contenu = get_sub_field('largeur_de_la_colonne_contenu'); ?>
            <!-- Les 2 colonnes -->
            <div class="part-1-block">
                <div class="col-gauche">
                    <div class="caracteristiques-recettes">
                        <p><span class="svg-recette"><?= file_get_contents(get_stylesheet_directory_uri() . '/svg/difficulte-recette.svg') ?>
                            </span><?= $difficulte_de_la_recette; ?></p>
                        <?php if ($minutes_de_preparation) : ?>
                            <p><span class="svg-recette"><?= file_get_contents(get_stylesheet_directory_uri() . '/svg/temps-preparation.svg') ?></span>
                                <?php echo $minutes_de_preparation . ' '; ?><?php echo $texte_minutes_de_preparation; ?></p>
                        <?php endif; ?>
                        <?php if ($nombre_de_personnes) : ?>
                            <p><span class="svg-recette"><?= file_get_contents(get_stylesheet_directory_uri() . '/svg/combien-personnes.svg') ?></span>
                                <?php echo $nombre_de_personnes . ' '; ?><?php echo $texte_combien_de_personnes; ?></p>
                        <?php endif; ?>
                        <?php if ($minutes_de_cuisson) : ?>
                            <p><span class="svg-recette"><?= file_get_contents(get_stylesheet_directory_uri() . '/svg/temps-cuisson.svg') ?></span>
                                <?php echo $minutes_de_cuisson . ' '; ?><?php echo $texte_minutes_de_cuisson; ?></p>
                        <?php endif; ?>
                    </div>
                </div>
                <div class="col-droite">
                    <h3><?= $liste_des_ingredients_titre ?></h3>
                    <div class="liste-ingredients">
                        <?= $liste_des_ingredients_wysiwyg ?>
                    </div>
                </div>
            </div>
            <?php get_template_part('inc/content-builder-inc/cta-flex') ?>
        </div>
    </div>
    <?php if ($vague_au_dessous_du_bloc) : ?>
        <div class="vague-basse">
            <?= showSvg(get_stylesheet_directory_uri() . '/svg/vague-bas.svg') ?>
        </div>
    <?php endif; ?>
</div>