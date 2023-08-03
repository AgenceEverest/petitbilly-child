<?php
$cb_image_simple = get_sub_field('cb_image_simple_image');
$size_cb_image_simple = 'medium';
$url_cb_image_simple = $cb_image_simple ? wp_get_attachment_image_url($cb_image_simple, $size_cb_image_simple) : null;
$image_weight = $url_cb_image_simple ? apply_filters('get_weight_of_img', $url_cb_image_simple) : '0kb';
$image_simple_copyright = get_sub_field('cb_image_simple_image_copyright');
$ajouter_une_legende = get_sub_field('cb_image_simple_image_legende');
$cadre_autour_image_v1 = get_sub_field('cadre_autour_image_v1');
$position_du_cadre = get_sub_field('position_du_cadre');
?>
<div class="image_simple_wrapper">
	<?php if ($image_simple_copyright) : ?>
		<p class="copyright_image"><span class="copyright_image_txt"><?php echo $image_simple_copyright; ?></span><span class="copyright_image_bg"></span></p>
	<?php endif; ?>
	<figure class="image_simple <?php if ($cadre_autour_image_v1) : echo "cadre_autour_image";
                            endif; ?>">
	<?php if ($cadre_autour_image_v1) : ?>
                    <svg preserveAspectRatio="none" class="edge-image <?= $position_du_cadre ? $position_du_cadre : ''; ?>" xmlns="http://www.w3.org/2000/svg" width="513.359" height="397.989" viewBox="0 0 513.359 397.989">
                        <path id="GettyImages-812274250" d="M3931.006,1788.394c47.843,6.933,96.157.861,128.4,0s83.2,6.174,102.271,6.175c17.272-.76,102.784-7.591,116.039,0,13.681,7.589,18.383,47.057,18.383,74.38.855,20.493,4.712,254.267-4.359,293.653s-171.194,8.881-183.978,11.841-152.3,5.92-167.3,0-131.174,11.841-146.738-4.934,2.78-216.083-3.334-269.365-1.667-85.842,10.561-100.642S3931.006,1788.394,3931.006,1788.394Z" transform="translate(-3785.784 -1786.433)" fill="none" stroke="#00693e" stroke-width="3" />
                    </svg>
                <?php endif; ?>
		<div class="poids-image"><span class="poids-image-icone"><?php get_template_part('svg/symbole-feuille-nanosite'); ?></span><span class="poids-image-data"><?= $image_weight ?></span></div>
		<?php $image_simple = wp_get_attachment_image_src($cb_image_simple, $size_cb_image_simple);

		$alt_text = get_post_meta($cb_image_simple, '_wp_attachment_image_alt', true); ?>
		<img src="<?php echo $image_simple[0]; ?>" class="image_simple_recadree" width="<?php echo $image_simple[1]; ?>" height="<?php echo $image_simple[2]; ?>" alt="<?php echo $alt_text; ?>" loading="lazy">
	</figure>
	<?php if ($ajouter_une_legende) : ?><p class="ajouter_une_legende legende"><?php echo $ajouter_une_legende; ?></p><?php endif; ?>
</div>