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
    <p class="liste_posts__card_cta legende"><a href="<?php echo $permalink; ?>">En savoir plus</a></p>
</div>