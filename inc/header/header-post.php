<header class="entry_title">
	<div class="post_thumbnail_bg"></div>
	<?php $thumbnail = get_post_thumbnail_id($post->ID);
	$size_thumbnail = "medium";
	$url_thumbnail = $thumbnail ? wp_get_attachment_image_url($thumbnail, $size_thumbnail) : null;
	$image_weight = $url_thumbnail ? apply_filters('get_weight_of_img', $url_thumbnail) : '0kb' ?>
	<div class="content_width post_thumbnail">
		<div class="post_thumbnail_image">
			<figure>
				<div class="poids-image"><span class="poids-image-icone"><?php get_template_part('svg/symbole-feuille-nanosite'); ?></span><span class="poids-image-data"><?= $image_weight ?></span></div>
				<?php $post_thumbnail_header = wp_get_attachment_image_src($thumbnail, $size_thumbnail);
				$alt_text = get_post_meta($thumbnail, '_wp_attachment_image_alt', true); ?>
				<?php if ($post_thumbnail_header) : ?>
					<img src="<?php echo $post_thumbnail_header[0]; ?>" width="<?php echo $post_thumbnail_header[1]; ?>" height="<?php echo $post_thumbnail_header[2]; ?>" alt="<?php echo $alt_text; ?>" loading="lazy">
				<?php endif; ?>
			</figure>
		</div>

		<div class="post_thumbnail_texte">
			<div class="post_thumbnail_texte_inner">
				<?php if (is_singular('offres')) : ?>
					<?php $page_qui_liste_les_offres = get_field('page_qui_liste_les_offres', 'option');
					$page_qui_liste_les_offres_permalink = get_permalink($page_qui_liste_les_offres->ID);
					$page_qui_liste_les_offres_title = get_the_title($page_qui_liste_les_offres->ID);
					?>
					<p class='retour_offres'><a href="<?php echo $page_qui_liste_les_offres_permalink; ?>"><?= apply_filters('add_svg', 'arrow-circle-left'); ?><?php echo $page_qui_liste_les_offres_title; ?></a></p>
				<?php endif; ?>
				<?php if (is_singular('post')) : ?>
					<div>
						<p class="legende single_term">
							<?php $domaine_terms = get_the_terms(get_the_ID(), 'category');
							if (
								$domaine_terms
								&& !is_wp_error($domaine_terms)
							) {
								@usort($domaine_terms, function ($a, $b) {
									return strcasecmp(
										$a->slug,
										$b->slug
									);
								});
								$term_list = [];
								foreach ($domaine_terms as $term)
									$term_list[] = '<a href="' . get_term_link($term) . '" class="term_link">' . esc_html($term->name) . '</a>';
								echo implode(', ', $term_list);
							}
							?>
						</p>
					</div>
					<div class="publie-le"><?= get_field('publie_le', 'option') . ' ' . get_the_date() ?></div>

				<?php endif; ?>
				<h1><?php the_title(); ?></h1>
			</div>
		</div>
	</div>
</header>