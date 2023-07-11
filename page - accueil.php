<?php

/**
 * Template Name: Accueil
 */
get_header(); ?>
<?php get_template_part('inc/header/header-main'); ?>
<?php the_post(); ?>
<div id="global_content">
	<section class="page_defaut">
		<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
			<header class="entry_title_home">
				<div id="entry_title_home_image"></div>
				<div class="entry_title_home_wrapper content_width">
					<div id="entry_title_image_home_wrapper">
						<?php if (get_field('image_dentete_onepage')) : ?>
							<?php
							$image = get_field('image_dentete_onepage');
							$alt_image_accueil = get_field('alt_description');
							$size = 'medium';
							$image_url = $image ? wp_get_attachment_image_url($image, $size) : null;
							$image_weight = $image_url ? apply_filters('get_weight_of_img', $image_url) : '0kb';
							?>
							<div id="entry_title_image_home">
								<figure>
									<div class="poids-image"><span class="poids-image-icone"><?php get_template_part('svg/symbole-feuille-nanosite'); ?></span><span class="poids-image-data"><?= $image_weight ?></span></div>
									<?php $image_a_afficher = wp_get_attachment_image_src($image, $size);
									$alt_text = get_post_meta($image, '_wp_attachment_image_alt', true); ?>
									<img src="<?php echo $image_a_afficher[0]; ?>" width="<?php echo $image_a_afficher[1]; ?>" height="<?php echo $image_a_afficher[2]; ?>" alt="<?php echo $alt_text; ?>" loading="lazy">
								</figure>
							</div>
						<?php endif; ?>
					</div>
					<div id="entry_title_title_home_wrapper">
						<div id="entry_title_title_home">
							<?php if (get_field('accroche_dentete')) : ?>
								<h1 id="entry_title_home_accroche" class="anim_top_bottom"><?php the_field('accroche_dentete') ?></h1>
							<?php endif; ?>
							<?php if (get_field('phrase_dintroduction_entete')) : ?>
								<div id="entry_title_home_description" class="entry-content anim_top_bottom">
									<p><?php the_field('phrase_dintroduction_entete') ?></p>
								</div>
							<?php endif; ?>
							<?php if (get_field('call-to-action_dentete_texte')) : ?>
								<div class="cta-header-container">
									<p class="cta-header">
										<?= showSvg(get_stylesheet_directory_uri() . '/svg/fond-cta.svg') ?>
										<a href="<?php the_field('call-to-action_dentete_hyperlien') ?>">
											<?php the_field('call-to-action_dentete_texte') ?>
										</a>
									</p>
								</div>

							<?php endif; ?>
						</div>
					</div>
				</div>
			</header>
			<?php
			if (the_content()) :
				the_content();
			endif; ?>
		</article>
		<?php get_template_part('inc/aside-actualites'); ?>
	</section>
	<?php get_footer(); ?>
</div> <!-- #global_content -->