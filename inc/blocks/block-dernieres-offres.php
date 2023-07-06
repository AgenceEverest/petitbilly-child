<?php

/**
 * Block Name: block-dernieres-offres
 *
 * This is the template that displays the block-dernieres-offres.php
 */
if (have_rows('block_dernieres_offres')) : the_row(); // il s'agit du nom du champ dans ACF qui contient les sous-champs
    $cb_ajouter_une_classe_css = get_sub_field('cb_ajouter_une_classe_css');
    $ajouter_un_id_pour_le_css = get_sub_field('ajouter_un_id_pour_le_css');
    $couleur_de_fond_bloc = get_sub_field('couleur_de_fond_bloc');
    $marge_en_haut_du_bloc = get_sub_field('marge_en_haut_du_bloc');
    $marge_en_bas_du_bloc = get_sub_field('marge_en_bas_du_bloc');
	$titre = get_sub_field('titre');
	$vague_au_dessus_du_bloc = get_sub_field('vague_au_dessus_du_bloc');
    $vague_au_dessous_du_bloc = get_sub_field('vague_au_dessous_du_bloc');
	$padding_en_haut_du_bloc = get_sub_field('padding_en_haut_du_bloc');
    $padding_en_bas_du_bloc = get_sub_field('padding_en_bas_du_bloc');
    $lien_bouton_voir_toutes_les_offres= get_sub_field('lien_bouton_voir_toutes_les_offres');
    $texte_bouton_voir_toutes_les_offres = get_sub_field('texte_bouton_voir_toutes_les_offres');
    $faire_passer_le_bloc_au_dessus_des_autres = get_sub_field('faire_passer_le_bloc_au_dessus_des_autres');
endif;

?>
<div class="<?php if ($couleur_de_fond_bloc) : ?>
    <?php echo " " . $couleur_de_fond_bloc; ?>
<?php endif; ?>
<?php if ($marge_en_haut_du_bloc) : ?>
    <?php echo " padding_section_top"; ?>
<?php endif; ?>
<?php if ($marge_en_bas_du_bloc) : ?>
    <?php echo " padding_section_bottom"; ?>
<?php endif; ?>
">
<?php if ($vague_au_dessus_du_bloc): ?>
  <?= showSvg(get_stylesheet_directory_uri() . '/svg/marge_haute.svg') ?>
<?php endif; ?>
<?php echo "<div "; ?>
<?php if ($ajouter_un_id_pour_le_css) : ?>
    <?php echo " id='" . $ajouter_un_id_pour_le_css . "'"; ?>
<?php endif; ?>
<?php echo " class='"; ?>
<?php if ($cb_ajouter_une_classe_css) : ?>
    <?php echo " " . $cb_ajouter_une_classe_css . ""; ?>
<?php endif; ?>

<?php if ($padding_en_haut_du_bloc) : ?>
    <?php echo " padding_section_top"; ?>
<?php endif; ?>
<?php if ($padding_en_bas_du_bloc) : ?>
    <?php echo " padding_section_bottom"; ?>
<?php endif; ?>
<?php 
    if ($faire_passer_le_bloc_au_dessus_des_autres) : 
        echo " z-index-1";
    endif;
?>
<?php echo " block'>"; ?>
<div id="dernieres_offres" class="content_width">
	<h2><?= $titre ?></h2>
    <div class="offres">
        <?php
        $the_query = new WP_Query(array(
            'post_type'         => 'offre-emploi',
            'posts_per_page'    => 3,
            'orderby'           => 'date',
            'order'             => 'DESC',
        ));
        ?>
        <?php while ($the_query->have_posts()) : $the_query->the_post();
            get_template_part('inc/extrait-offre');   ?>
        <?php endwhile; ?>
        <?php wp_reset_query(); ?>
	</div>
    <p class="cta_btn_lead cta_primaire"><a href="<?= $lien_bouton_voir_toutes_les_offres ?>"><?= $texte_bouton_voir_toutes_les_offres ?></a></p>
</div>

<?php if ($vague_au_dessous_du_bloc): ?>
  <?= showSvg(get_stylesheet_directory_uri() . '/svg/marge_basse.svg') ?>
<?php endif; ?>

</div>