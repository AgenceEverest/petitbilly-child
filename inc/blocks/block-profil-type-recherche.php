<?php

/**
 * Block Name: block-profil-type-recherche  
 *
 * This is the template that displays the profil type recherche
 */
if (have_rows('block_profil_type_recherche')) : the_row(); // il s'agit du nom du champ dans ACF qui contient les sous-champs
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
endif;
?>
<div class="<?php
            if ($marge_en_haut_du_bloc) : echo " margin_section_top";
            endif;
            if ($marge_en_bas_du_bloc) : echo " margin_section_bottom";
            if ($couleur_de_fond_bloc) :
                echo ' ' . $couleur_de_fond_bloc . '_vague';
            endif;
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
            if ($liseret_vert_autour_du_bloc) : echo " has-edge ";
            endif;
            if ($couleur_de_fond_bloc) : echo ' ' . $couleur_de_fond_bloc;
            endif;
            echo " block block-profil-type-recherche'"; ?>>
        <div class="half-background">
        </div>
        <?php if ($liseret_vert_autour_du_bloc) : ?>
            <?= showSvg(get_stylesheet_directory_uri() . '/svg/green-edge-desktop-tall') ?>
            <?= showSvg(get_stylesheet_directory_uri() . '/svg/green-edge') ?>
        <?php endif; ?>
        <!-- titre avant les colonnes-->
        <?php $titre_avant_les_colonnes = get_sub_field('titre_avant_les_colonnes');
        $largeur_de_la_colonne_titre = get_sub_field('largeur_de_la_colonne_titre');
        $separateur_de_la_colonne_titre = get_sub_field('separateur_de_la_colonne_titre');
        $colonne1 = get_sub_field('colonne_1');
        if ($titre_avant_les_colonnes) : ?>
            <div class="content_width zone_texte_avant_colonnes<?php if (!$colonne1 and $separateur_de_la_colonne_titre == 'pas_de_separateur_titre') : ?> zone_texte_avant_colonnes_nopadding<?php endif; ?>">
                <div class="<?php echo $largeur_de_la_colonne_titre; ?> entry-content">
                    <?php echo $titre_avant_les_colonnes; ?>
                </div>
            </div>

            <?php if ($separateur_de_la_colonne_titre != 'pas_de_separateur_titre') : ?>
                <div class="content_width separateur_de_la_colonne_titre_wrapper_wrapper<?php if ($colonne1) : ?> separateur_de_la_colonne_titre_space<?php endif; ?>">
                    <div class="separateur_de_la_colonne_titre_wrapper">
                        <div class="separateur_de_la_colonne_titre <?php echo $separateur_de_la_colonne_titre; ?>"></div>
                    </div>
                </div>
            <?php endif; ?>
        <?php endif; ?>

        <!-- colonnes -->
        <div class="content_width col_flexible col_flexible_1 postes-recherches">
            <!-- Les 2 colonnes -->
            <?php if (have_rows('postes_recherches')) :
                while (have_rows('postes_recherches')) : the_row();
                    $nom_du_poste = get_sub_field('nom_du_poste');
                    $description_du_poste = get_sub_field('description_du_poste'); ?>
                    <div class="poste-recherche">
                        <h3 class="nom-du-poste">
                            <?= $nom_du_poste; ?>
                        </h3>
                        <div class="description-du-poste">
                            <p><?= $description_du_poste ?></p>
                        </div>
                    </div>
            <?php endwhile;
            endif; ?>
        </div>
        <?php get_template_part('inc/content-builder-inc/cta-flex') ?>
    </div>
    <?php if ($vague_au_dessous_du_bloc) : ?>
        <div class="vague-basse">
            <?= showSvg(get_stylesheet_directory_uri() . '/svg/vague-bas.svg') ?>
        </div>
    <?php endif; ?>
</div>