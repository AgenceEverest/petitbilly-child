<p class="rs_link">
    <?php $page_facebook = get_field('page_facebook', 'option'); ?>
    <?php $page_twitter = get_field('page_twitter', 'option'); ?>
    <?php $page_linkedin = get_field('page_linkedin', 'option'); ?>
    <?php $page_instagram = get_field('page_instagram', 'option'); ?>
    <?php $page_youtube = get_field('page_youtube', 'option'); ?>
    <?php $page_tiktok = get_field('page_tiktok', 'option'); ?>
    <?php $reseaux_sociaux_suivez_nous_sur = get_field('reseaux_sociaux_suivez-nous_sur', 'option'); ?>

    <?php if ($page_facebook) : ?><a href="<?php echo $page_facebook; ?>" class="rs_link_item" title="<?php if ($reseaux_sociaux_suivez_nous_sur) : ?><?php echo $reseaux_sociaux_suivez_nous_sur; ?><?php endif; ?> Facebook">
            <?= apply_filters('add_svg', 'facebook'); ?>
            <?= showSvg(get_stylesheet_directory_uri() . '/svg/fonds-rs.svg'); ?>
        </a>
    <?php endif; ?>
    <?php if ($page_twitter) : ?><a href="<?php echo $page_twitter; ?>" class="rs_link_item" title="<?php if ($reseaux_sociaux_suivez_nous_sur) : ?><?php echo $reseaux_sociaux_suivez_nous_sur; ?><?php endif; ?> Twitter">
            <?= apply_filters('add_svg', 'twitter'); ?>
            <?= showSvg(get_stylesheet_directory_uri() . '/svg/fonds-rs.svg'); ?>
        </a>
    <?php endif; ?>
    <?php if ($page_linkedin) : ?><a href="<?php echo $page_linkedin; ?>" class="rs_link_item" title="<?php if ($reseaux_sociaux_suivez_nous_sur) : ?><?php echo $reseaux_sociaux_suivez_nous_sur; ?><?php endif; ?> Linkedin">
            <?= apply_filters('add_svg', 'linkedin'); ?>
            <?= showSvg(get_stylesheet_directory_uri() . '/svg/fonds-rs.svg'); ?>
        </a>
    <?php endif; ?>
    <?php if ($page_instagram) : ?><a href="<?php echo $page_instagram; ?>" class="rs_link_item" title="<?php if ($reseaux_sociaux_suivez_nous_sur) : ?><?php echo $reseaux_sociaux_suivez_nous_sur; ?><?php endif; ?> Instagram">
            <?= apply_filters('add_svg', 'instagram'); ?>
            <?= showSvg(get_stylesheet_directory_uri() . '/svg/fonds-rs.svg'); ?>
        </a>
    <?php endif; ?>
    <?php if ($page_youtube) : ?><a href="<?php echo $page_youtube; ?>" class="rs_link_item" title="<?php if ($reseaux_sociaux_suivez_nous_sur) : ?><?php echo $reseaux_sociaux_suivez_nous_sur; ?><?php endif; ?> YouTube">
            <?= apply_filters('add_svg', 'youtube'); ?>
            <?= showSvg(get_stylesheet_directory_uri() . '/svg/fonds-rs.svg'); ?>
        </a>
    <?php endif; ?>
    <?php if ($page_tiktok) : ?><a href="<?php echo $page_tiktok; ?>" class="rs_link_item" title="<?php if ($reseaux_sociaux_suivez_nous_sur) : ?><?php echo $reseaux_sociaux_suivez_nous_sur; ?><?php endif; ?> TikTok">
            <?= apply_filters('add_svg', 'tiktok'); ?>
            <?= showSvg(get_stylesheet_directory_uri() . '/svg/fonds-rs.svg'); ?>
        </a>
    <?php endif; ?>
</p>