<?php $masquer_la_sidebar_blog = get_field('masquer_la_sidebar_blog', 'option'); ?>
<?php $texte_du_bouton_pour_voir_tous_les_articles = get_field('texte_du_bouton_pour_voir_tous_les_articles', 'option'); ?>
<?php $page_for_posts = get_option('page_for_posts'); ?>

<?php if (!$masquer_la_sidebar_blog) : ?>
	<aside id="aside_actualites" class="padding_section">
		<?php $titre_de_la_sidebar_actualites = get_field('titre_de_la_sidebar_actualites', 'option'); ?>

		<div id="aside_actualites_header" class="content_width">
			<h2 id="aside_actualites_title"><?php echo $titre_de_la_sidebar_actualites; ?></h2>
			<div id="charger_les_images_wrapper" class="content_width">
				<div class="legende">
					<div id="charger_les_images_switch">
						<?php $charger_les_images = get_field('charger_les_images', 'option'); ?>
						<label tabindex="0" for="f" id="charger_les_images"><?php if($charger_les_images): ?><?php echo $charger_les_images; ?><?php endif; ?></label>
						<label tabindex="-1" id="charger_les_images_switch_label" class="switch">
							<input tabindex="-1" name="charger_les_images_switch" id="f" type="checkbox">
							<span tabindex="-1" class="slider round"></span>
						</label>
					</div>
				</div>
			</div>
		</div>

		<div id="aside_actualites_wrapper">
			<?php
			$the_query = new WP_Query(array(
				'post_type'         => 'post',
				'posts_per_page'    => 3,
				'order'             => 'DESC',
			));
			?>
			<?php while ($the_query->have_posts()) : $the_query->the_post();
				get_template_part('inc/extrait-article');   ?>
			<?php endwhile; ?>
			<?php wp_reset_query(); ?>
		</div>

		<div class="remove_margin"></div>

		<?php $texte_du_bouton_pour_voir_tous_les_articles = get_field('texte_du_bouton_pour_voir_tous_les_articles', 'option'); ?>
		<p class="lire-les-publications">
		<?= showSvg(get_stylesheet_directory_uri() . '/svg/fond-cta.svg') ?>	
		<a href="<?php the_permalink($page_for_posts); ?>"><?php echo $texte_du_bouton_pour_voir_tous_les_articles; ?></a></p>

	</aside>
<?php endif; ?>