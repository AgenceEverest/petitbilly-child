<?php

/**
 * Block Name: block-dernieres-recettes
 * 
 * 
 * Lorsqu'on crée une recette, on a la possibilité de lier un produit à cette recette :
 *  en scrollant tout en bas de l'éditeur d'une recette, on peut voir la fenêtre "Produits liés à cette recette". 
 * On peut alors rechercher un produit, ou bien cliquer sur ceux apparaissant déjà. On peut aussi trier ce qui apparaît par 
 * type de publication ou par taxonomie. Sélectionner un produit dans cette liste va le lier à la recette en cours.
 * Cette liaison sert pour le block "Dernières Recettes (liées à un produit ou non)".
 * En rajoutant ce bloc, on a la possibilité d'afficher les dernières recettes présentes sur le site (de façon chronologique), 
 * mais si on clique sur "Contenu", on a la possibilité d'activer le bouton "Montrer les dernières recettes liées à ce produit ?". 
 * C'est là que la liaison produits/recettes fonctionne : en ajoutant de bloc sur la page d'un produit, et activant la case concernée, 
 * on ne va afficher que les recettes liées au produit.
 *
 * This is the template that displays the bloc test.
 */

if (have_rows('dernieres_recettes')) : the_row(); // il s'agit du nom du champ dans ACF qui contient les sous-champs
    $cb_ajouter_une_classe_css = get_sub_field('cb_ajouter_une_classe_css');
    $ajouter_un_id_pour_le_css = get_sub_field('ajouter_un_id_pour_le_css');
    $couleur_de_fond_bloc = get_sub_field('couleur_de_fond_bloc');
    $marge_en_haut_du_bloc = get_sub_field('marge_en_haut_du_bloc');
    $marge_en_bas_du_bloc = get_sub_field('marge_en_bas_du_bloc');
    $padding_en_haut_du_bloc = get_sub_field('padding_en_haut_du_bloc');
    $padding_en_bas_du_bloc = get_sub_field('padding_en_bas_du_bloc');
    $nombre_de_recettes_a_afficher = get_sub_field('nombre_de_recettes_a_afficher');
    $liees_a_ce_produit = get_sub_field('liees_a_ce_produit');
    $texte_des_boutons_pour_chaque_recette = get_sub_field('texte_des_boutons_pour_chaque_recette');
endif;
?>
<div class="dernieres-recettes-container
<?php 
if ($marge_en_haut_du_bloc) : echo " margin_section_top";
endif;
if ($marge_en_bas_du_bloc) : echo " margin_section_bottom";
endif;
?>
">
    <?php
    if ($liees_a_ce_produit) {
        $args = array(
            'post_type' => 'recettes',
            'posts_per_page' => $nombre_de_recettes_a_afficher,
            'meta_query' => array(
                array(
                    'key' => 'produits_lies_a_cette_recette', // name of custom field
                    'value' => '"' . get_the_ID() . '"', // matches exactly "123", not just 123. This prevents a match for "1234"
                    'compare' => 'LIKE'
                )
            )
        );
    } else {
        $args = array(
            'post_type' => 'recettes',
            'posts_per_page' => $nombre_de_recettes_a_afficher,
        );
    }
    $query = new WP_Query($args);
    $pas_de_posts = $query->post_count == 0 ? true : false;
    ?>

    <?php echo "<div ";
    if ($ajouter_un_id_pour_le_css) :
        echo " id='" . $ajouter_un_id_pour_le_css . "'";
    endif;
    echo " class='";
    if ($padding_en_haut_du_bloc) : echo " padding_section_top";
endif;
if ($padding_en_bas_du_bloc) : echo " padding_section_bottom";
endif;

    if ($couleur_de_fond_bloc) :
        echo " " . $couleur_de_fond_bloc;
    endif;
    if ($cb_ajouter_une_classe_css) :
        echo " " . $cb_ajouter_une_classe_css . "";
    endif;
    echo " block-dernieres-recettes block'>";
    get_template_part('inc/dessin-en-fond'); ?>

    <!-- titre avant les colonnes-->
    <?php $titre_avant_les_colonnes = get_sub_field('titre_avant_les_colonnes'); ?>
    <?php $largeur_de_la_colonne_titre = get_sub_field('largeur_de_la_colonne_titre'); ?>
    <?php $separateur_de_la_colonne_titre = get_sub_field('separateur_de_la_colonne_titre'); ?>

    <?php
    if ($pas_de_posts) : echo '';
    else :
        if ($titre_avant_les_colonnes) : ?>
            <div class="content_width zone_texte_avant_colonnes<?php if ($separateur_de_la_colonne_titre == 'pas_de_separateur_titre') : ?> zone_texte_avant_colonnes_nopadding<?php endif; ?>">
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
        <?php endif;
        endif; ?>

        <!-- colonnes -->
        <div class="content_width col_flexible col_flexible_2 dernieres-recettes">
            <?php
            if ($query->have_posts()) :
                while ($query->have_posts()) :
            ?>
                    <div class="recette">
                        <?php
                        $query->the_post();
                        $title = get_the_title();
                        $terms = get_the_terms(get_the_ID(), 'category'); // Récupérer les termes liés au post (dans cet exemple, les catégories)
                        $image = get_the_post_thumbnail_url(get_the_ID()); // Récupérer l'URL de l'image mise en avant du post
                        $permalink = get_permalink(); // Récupérer le permalien du post
                        // Afficher les termes dans un bandeau
                        if ($terms) :
                            foreach ($terms as $term) : ?>
                                <span class="term"><?= $term->name  ?> </span>
                            <?php endforeach;
                        endif;
                        if ($image) : ?>
                            <div class="img-recette-container"> 
                                <img src="<?= $image ?>" alt="<?= $title ?>">
                            </div>
                        <?php endif; ?>
                        <h3><?= $title ?></h3>
                        <a href="<?= $permalink ?>" class="button">
                            <?= $texte_des_boutons_pour_chaque_recette ?>
                        </a>
                    </div>
            <?php endwhile;
            endif; ?>
        </div> <?php endif; ?>
</div>
</div>