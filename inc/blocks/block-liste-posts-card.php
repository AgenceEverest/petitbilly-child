<?php 
$title = get_the_title();
$permalink = get_the_permalink();
$image_url = get_the_post_thumbnail_url(get_the_ID(), 'image-principale-blog');
$image_weight = $image_url ? apply_filters('get_weight_of_img', $image_url) : '0kb';
$thumbnail_id = get_post_thumbnail_id(get_the_ID());
$thumbnail_alt = get_post_meta($thumbnail_id, '_wp_attachment_image_alt', true); 
$produit_nouveau = get_field("ce_produit_est-il_nouveau", get_the_ID());
$poids_du_produit = get_field("poids_du_produit", get_the_ID());
?>

<div class="liste_posts__card">
    <a href="<?php the_permalink(); ?>">
        <figure>
            <?php if ($produit_nouveau) : ?>
                <p class="liste_posts__card_nouveau legende">Nouveau</p>
            <?php endif; ?>
            
            <?php if ($image_url) : ?>
                <div class="poids-image"><span class="poids-image-icone"><?php get_template_part('svg/symbole-feuille-nanosite'); ?></span><span class="poids-image-data"><?= $image_weight ?></span></div>
                <img src="<?php echo $image_url; ?>" alt="<?php echo $thumbnail_alt; ?>">
            <?php endif; ?>
        </figure>
    </a>
    <h3 class="liste_posts__card_title"><a href="<?php echo $permalink; ?>"><?php echo $title; ?></a></h3>
    <?php if($poids_du_produit): ?>
        <p class="liste_posts__card_weight"><?php echo $poids_du_produit; ?></p>
    <?php endif;?>
    <p class="liste_posts__card_cta legende"><a href="<?php echo $permalink; ?>">En savoir plus</a></p>
</div>