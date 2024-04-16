<?php

/**
 * Block Name: block-liste-posts    
 *
 * This is the template that displays the 2-colonnes-texte block.
 */
if (have_rows('block_liste_posts')) : the_row(); // il s'agit du nom du champ dans ACF qui contient les sous-champs
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
endif;
?>


<?php echo "<div "; ?>
<?php if ($ajouter_un_id_pour_le_css) : ?>
    <?php echo " id='" . $ajouter_un_id_pour_le_css . "'"; ?>
<?php endif; ?>
<?php echo " class='block_liste_posts"; ?>
<?php if ($marge_en_haut_du_bloc) : ?>
    <?php echo " padding_section_top"; ?>
<?php endif; ?>
<?php if ($marge_en_bas_du_bloc) : ?>
    <?php echo " padding_section_bottom"; ?>
<?php endif; ?>
<?php if ($couleur_de_fond_bloc) : ?>
    <?php echo " " . $couleur_de_fond_bloc; ?>
<?php endif; ?>
<?php if ($cb_ajouter_une_classe_css) : ?>
    <?php echo " " . $cb_ajouter_une_classe_css . ""; ?>
<?php endif; ?>
<?php echo "'>"; ?>

<!-- titre avant les colonnes-->
<?php $titre_avant_les_colonnes = get_sub_field('titre_avant_les_colonnes'); ?>
<?php $largeur_de_la_colonne_titre = get_sub_field('largeur_de_la_colonne_titre'); ?>
<?php $separateur_de_la_colonne_titre = get_sub_field('separateur_de_la_colonne_titre'); ?>
<?php $largeur_de_la_colonne_contenu = get_sub_field('largeur_de_la_colonne_contenu'); ?>
<?php if ($titre_avant_les_colonnes) : ?>
    <div class="content_width zone_texte_avant_colonnes
        <?php if ($separateur_de_la_colonne_titre == 'pas_de_separateur_titre') : ?> zone_texte_avant_colonnes_nopadding<?php endif; ?>">
        <div class="<?php echo $largeur_de_la_colonne_titre; ?> entry-content">
            <?php echo $titre_avant_les_colonnes; ?>
        </div>
    </div>
    <?php if ($separateur_de_la_colonne_titre != 'pas_de_separateur_titre') : ?>
        <div class="content_width separateur_de_la_colonne_titre_wrapper_wrapper">
            <div class="separateur_de_la_colonne_titre_wrapper">
                <div class="separateur_de_la_colonne_titre <?php echo $separateur_de_la_colonne_titre; ?>"></div>
            </div>
        </div>
    <?php endif; ?>
<?php endif; ?>



<!-- colonnes -->
<div class="content_width content_liste_posts">
    
    <?php   $nombre_de_colonnes = get_sub_field('nombre_de_colonnes');
            $nombre_de_posts = get_sub_field('nombre_de_posts'); 
            $alignement_des_posts = get_sub_field('alignement_des_posts'); 
    ?>

    <div class="liste_posts liste_posts_<?php echo $nombre_de_colonnes; ?> liste_posts_<?php echo $alignement_des_posts; ?><?php if ($titre_avant_les_colonnes) : ?> liste_posts_avec_titre<?php endif; ?>">
        <?php $post_type_slug = get_sub_field('type_de_post'); 
            if ($post_type_slug && $nombre_de_posts) {
                $args = array(
                    'post_type' => $post_type_slug,
                    'posts_per_page' => $nombre_de_posts,
                );
                $query = new WP_Query($args);
                // Boucle sur les posts
                while ($query->have_posts()) : $query->the_post();
                    $title = get_the_title();
                    $permalink = get_the_permalink();
                    $image_url = get_the_post_thumbnail_url(get_the_ID(), 'image-principale-blog');
                    $image_weight = $image_url ? apply_filters('get_weight_of_img', $image_url) : '0kb';
                    $thumbnail_id = get_post_thumbnail_id(get_the_ID());
                    $thumbnail_alt = get_post_meta($thumbnail_id, '_wp_attachment_image_alt', true);
                    // Card ?>
                    <div class="liste_posts__card">
                        <a href="<?php the_permalink(); ?>">
                            <figure>
                                <?php if ($image_url) : ?>
                                    <div class="poids-image"><span class="poids-image-icone"><?php get_template_part('svg/symbole-feuille-nanosite'); ?></span><span class="poids-image-data"><?= $image_weight ?></span></div>
                                <?php endif; ?>
                                <img src="<?php echo $image_url; ?>" alt="<?php echo $thumbnail_alt; ?>">
                            </figure>
                        </a>
                        <h3 class="liste_posts__card_title"><a href="<?php echo $permalink; ?>"><?php echo $title; ?></a></h3>
                        <p>dd</p>
                        <p class="liste_posts__card_cta legende"><a href="<?php echo $permalink; ?>">En savoir plus</a></p>
                    </div>
                <?php endwhile;
            } ?>
    </div>

    <!-- Lien page contact pré-remplie -->
    <?php if ($cb_calltoaction_interne_externe == 'page_contact') : ?>
        <?php get_template_part('inc/content-builder-inc/cb-form-to-prefilled-form'); ?>
    <?php endif; ?>

    <!-- Lien interne  -->
    <?php if ($cb_calltoaction_interne_externe == 'lien_interne') : ?>
        <?php if ($cb_calltoaction_lien) : ?>
            <p class="cta_sous_colonnes_flex cta_btn_lead <?php echo $alignement_du_bouton; ?> <?php echo $style_du_bouton; ?><?php if (!have_rows('colonne_1_colonne_flexible_clonable')) : ?> cta_btn_lead_margintop<?php endif; ?>"><a href="<?php echo $cb_calltoaction_lien; ?>" <?php if ($ouvrir_dans_un_nouvel_onglet) : ?> target="_blank" <?php endif; ?>><?php echo $cb_calltoaction; ?></a></p>
        <?php endif; ?>
    <?php endif; ?>

    <!-- Lien externe  -->
    <?php if ($cb_calltoaction_interne_externe == 'lien_externe') : ?>
        <?php if ($cb_calltoaction_url) : ?>
            <p class="cta_sous_colonnes_flex cta_btn_lead <?php echo $alignement_du_bouton; ?> <?php echo $style_du_bouton; ?><?php if (!have_rows('colonne_1_colonne_flexible_clonable')) : ?> cta_btn_lead_margintop<?php endif; ?>"><a href="<?php echo $cb_calltoaction_url; ?>" <?php if ($ouvrir_dans_un_nouvel_onglet) : ?> target="_blank" <?php endif; ?>><?php echo $cb_calltoaction; ?></a></p>
        <?php endif; ?>
    <?php endif; ?>

    <!-- Fichier à télécharger  -->
    <?php if ($cb_calltoaction_interne_externe == 'fichier_telechargement') : ?>
        <?php if ($cb_calltoaction_fichier) : ?>
            <p class="cta_sous_colonnes_flex cta_btn_lead <?php echo $alignement_du_bouton; ?> <?php echo $style_du_bouton; ?><?php if ((!have_rows('colonne_1_colonne_flexible_clonable')) && ($separateur_de_la_colonne_titre = 'pas_de_separateur_titre')) : ?> cta_btn_lead_margintop<?php endif; ?>"><a href="<?php echo wp_get_attachment_url($cb_calltoaction_fichier); ?>" <?php if ($ouvrir_dans_un_nouvel_onglet) : ?> target="_blank" <?php endif; ?>><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path fill="currentColor" d="M413.1 222.5l22.2 22.2c9.4 9.4 9.4 24.6 0 33.9L241 473c-9.4 9.4-24.6 9.4-33.9 0L12.7 278.6c-9.4-9.4-9.4-24.6 0-33.9l22.2-22.2c9.5-9.5 25-9.3 34.3.4L184 343.4V56c0-13.3 10.7-24 24-24h32c13.3 0 24 10.7 24 24v287.4l114.8-120.5c9.3-9.8 24.8-10 34.3-.4z"></path>
                    </svg><?php echo $cb_calltoaction; ?> <span class="download_doc_size">- <?php echo size_format($cb_calltoaction_fichier_size, $decimals = 0); ?></span></a></p>
        <?php endif; ?>
    <?php endif; ?>

</div>
</div>