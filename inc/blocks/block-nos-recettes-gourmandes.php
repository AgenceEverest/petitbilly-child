<?php

/**
 * Block Name: block-nos-recettes-gourmandes
 *
 * This is the template that displays the block nos recettes gourmandes
 */
if (have_rows('block_nos_recettes_gourmandes')) : the_row(); // il s'agit du nom du champ dans ACF qui contient les sous-champs
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
    $faire_passer_le_bloc_au_dessus_des_autres = get_sub_field('faire_passer_le_bloc_au_dessus_des_autres');
    $texte_bouton_lire_la_la_suite = get_sub_field('texte_bouton_lire_la_la_suite');
    $colonne_droite_titre = get_sub_field('colonne_droite_titre');
    $colonne_droite_texte = get_sub_field('colonne_droite_texte');
    $liseret_vert_autour_du_bloc = get_sub_field('liseret_vert_autour_du_bloc');

endif;
?>
<div class="<?php if ($couleur_de_fond_bloc) :
                echo " " . $couleur_de_fond_bloc;
            endif;
            if ($marge_en_haut_du_bloc) :
                echo " padding_section_top";
            endif;
            if ($marge_en_bas_du_bloc) :
                echo " padding_section_bottom";
            endif; ?>
">
    <?php if ($vague_au_dessus_du_bloc) : ?>
        <?= showSvg(get_stylesheet_directory_uri() . '/svg/marge_haute.svg') ?>
    <?php endif; ?>
    <div <?php echo " ";
            if ($ajouter_un_id_pour_le_css) :
                echo " id='" . $ajouter_un_id_pour_le_css . "'";
            endif;
            echo " class='";
            if ($cb_ajouter_une_classe_css) :
                echo " " . $cb_ajouter_une_classe_css . "";
            endif;

            if ($padding_en_haut_du_bloc) :
                echo " padding_section_top";
            endif;
            if ($padding_en_bas_du_bloc) :
                echo " padding_section_bottom";
            endif;
            if ($faire_passer_le_bloc_au_dessus_des_autres) : echo " z-index-1";
            endif;
            if ($liseret_vert_autour_du_bloc) : echo " has-edge ";
        endif;
            echo " block block-nos-recettes-gourmandes'"; ?>>
        <?php get_template_part('inc/dessin-en-fond'); ?>
        <?php if ($liseret_vert_autour_du_bloc) : ?>
			<?= showSvg(get_stylesheet_directory_uri() . '/svg/green-edge-desktop-tall') ?>
			<?= showSvg(get_stylesheet_directory_uri() . '/svg/green-edge') ?>
		<?php endif; ?>
        <div class="bg-block-nos-recettes-gourmandes"></div>
        <!-- titre avant les colonnes-->
        <?php $titre_avant_les_colonnes = get_sub_field('titre_avant_les_colonnes');
        $largeur_de_la_colonne_titre = get_sub_field('largeur_de_la_colonne_titre');
        $separateur_de_la_colonne_titre = get_sub_field('separateur_de_la_colonne_titre');
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
        <div class="content_width col_flexible col_flexible_2">
            <!-- Les 2 colonnes -->
            <?php $proportions_des_colonnes = get_sub_field('proportions_des_colonnes'); ?>
            <div class="col_flexible_wrapper <?php echo $proportions_des_colonnes; ?>">
                <!-- Colonne 1 -->
                <div class="nos-recettes-col-1">
                    <?php
                    $args = array(
                        'post_type'      => 'recettes',
                        'posts_per_page' => 3,
                        'orderby'        => 'date',
                        'order'          => 'DESC'
                    );

                    $query = new WP_Query($args);

                    if ($query->have_posts()) :
                        while ($query->have_posts()) : $query->the_post();
                            $thumbnail_url = get_the_post_thumbnail_url(get_the_ID(), 'thumbnail');
                            $title = get_the_title();
                            $permalink = get_permalink();
                    ?>

                            <div class="recette-item">
                                <figure class="recette-img-container">
                                    <img src="<?php echo esc_url($thumbnail_url); ?>" alt="<?php echo esc_attr($title); ?>">
                                </figure>
                                <h3><?php echo esc_html($title); ?></h3>
                                <a href="<?php echo esc_url($permalink); ?>"><?= $texte_bouton_lire_la_la_suite ?></a>
                            </div>

                    <?php
                        endwhile;
                        wp_reset_postdata();
                    else :
                    // Aucune recette trouvée
                    endif;
                    ?>
                </div>
                <!-- Colonne 2 -->
                <div class="nos-recettes-col-2">
                    <h2><?= $colonne_droite_titre ?></h2>
                    <p><?= $colonne_droite_texte ?></p>
                    <?php get_template_part('inc/content-builder-inc/cta-col') ?>
                </div>
            </div>


        </div>
    </div>

    <?php if ($vague_au_dessous_du_bloc) : ?>
        <?= showSvg(get_stylesheet_directory_uri() . '/svg/marge_basse.svg') ?>
    <?php endif; ?>
</div>