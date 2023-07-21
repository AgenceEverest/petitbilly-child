<?php

/**
 * Block Name: block-equipes-metiers
 *
 * This is the template that displays the block-equipes-metiers
 */
if (have_rows('block_equipes_metiers')) : the_row(); // il s'agit du nom du champ dans ACF qui contient les sous-champs
    $cb_ajouter_une_classe_css = get_sub_field('cb_ajouter_une_classe_css');
    $ajouter_un_id_pour_le_css = get_sub_field('ajouter_un_id_pour_le_css');
    $couleur_de_fond_bloc = get_sub_field('couleur_de_fond_bloc');

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
    $marge_en_haut_du_bloc = get_sub_field('marge_en_haut_du_bloc');
    $marge_en_bas_du_bloc = get_sub_field('marge_en_bas_du_bloc');
    $padding_en_haut_du_bloc = get_sub_field('padding_en_haut_du_bloc');
    $padding_en_bas_du_bloc = get_sub_field('padding_en_bas_du_bloc');
    $faire_passer_le_bloc_au_dessus_des_autres = get_sub_field('faire_passer_le_bloc_au_dessus_des_autres');

    $titre_bloc_rejoignez_nos_equipes = get_sub_field('titre_bloc_rejoignez_nos_equipes');
    $image_dillustration_rejoignez_nos_equipes = get_sub_field('image_dillustration_rejoignez_nos_equipes');
    $sous_titre_rejoignez_nos_equipes = get_sub_field('sous_titre_rejoignez_nos_equipes');
    $texte_rejoignez_nos_equipes = get_sub_field('texte_rejoignez_nos_equipes');
    $titre_les_metiers_de_petit_billy = get_sub_field('titre_les_metiers_de_petit_billy');
    $les_metiers_de_petit_billy = get_sub_field('les_metiers_de_petit_billy');

    $liseret_vert_autour_du_bloc = get_sub_field('liseret_vert_autour_du_bloc');

endif;
?>azeaze
<div class="<?php if ($couleur_de_fond_bloc) :
                echo " " . $couleur_de_fond_bloc;
            endif;
            if ($marge_en_haut_du_bloc) : echo " margin_section_top";
            endif;
            if ($marge_en_bas_du_bloc) : echo " margin_section_bottom";
            endif;
            ?>">
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

            if ($faire_passer_le_bloc_au_dessus_des_autres) : echo " z-index-1";
            endif;
            if ($liseret_vert_autour_du_bloc) : echo " has-edge ";
            endif;
            echo " block'"; ?>>
        <?php get_template_part('inc/dessin-en-fond'); ?>

        <?php if ($liseret_vert_autour_du_bloc) : ?>
            <?= showSvg(get_stylesheet_directory_uri() . '/svg/green-edge-desktop-tall') ?>
            <?= showSvg(get_stylesheet_directory_uri() . '/svg/green-edge') ?>
        <?php endif; ?>

        <!-- titre avant les colonnes-->

        <div class="content_width col_flexible col_flexible_2">
            <!-- Les 2 colonnes -->
            <?php $proportions_des_colonnes = get_sub_field('proportions_des_colonnes'); ?>
            <div class="col_flexible_wrapper <?php echo $proportions_des_colonnes; ?>">
                <div class="block-equipes-metiers">
                    <?php if ($titre_bloc_rejoignez_nos_equipes) : ?>
                        <h2><?php echo esc_html($titre_bloc_rejoignez_nos_equipes); ?></h2>
                    <?php endif; ?>

                    <?php if ($image_dillustration_rejoignez_nos_equipes) : ?>
                        <img src="<?php echo esc_url($image_dillustration_rejoignez_nos_equipes); ?>" alt="Illustration">
                    <?php endif; ?>

                    <?php if ($sous_titre_rejoignez_nos_equipes) : ?>
                        <h3><?php echo esc_html($sous_titre_rejoignez_nos_equipes); ?></h3>
                    <?php endif; ?>

                    <?php if ($texte_rejoignez_nos_equipes) : ?>
                        <p><?php echo esc_html($texte_rejoignez_nos_equipes); ?></p>
                    <?php endif; ?>

                    <?php if ($titre_les_metiers_de_petit_billy) : ?>
                        <h3><?php echo esc_html($titre_les_metiers_de_petit_billy); ?></h3>
                    <?php endif; ?>

                    <?php if (have_rows('les_metiers_de_petit_billy')) : ?>
                        <ul>
                            <?php while (have_rows('les_metiers_de_petit_billy')) : the_row(); ?>
                                <li>
                                    <h4><?php echo esc_html(get_sub_field('titre_-_metier_de_petit_billy')); ?></h4>
                                    <p><?php echo esc_html(get_sub_field('texte_-_metier_de_petit_billy')); ?></p>
                                </li>
                            <?php endwhile; ?>
                        </ul>
                    <?php endif; ?>
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