<article id="post-<?php the_ID(); ?>" <?php post_class('article_extrait'); ?>>
	<div class="article_extrait_thumbnail">
		<?php $image_url = get_the_post_thumbnail_url(get_the_ID(), 'image-principale-blog');
		$image_weight = $image_url ? apply_filters('get_weight_of_img', $image_url) : '0kb';
		$thumbnail_id = get_post_thumbnail_id(get_the_ID());
		$thumbnail_alt = $thumbnail_id ? get_post_meta($thumbnail_id, '_wp_attachment_image_alt', true) : '';
		?>
		<a href="<?php the_permalink(); ?>" class="image_article_wrapper">
			<figure>
				<?php if ($image_url) : ?>
					<div class="poids-image"><span class="poids-image-icone"><?php get_template_part('svg/symbole-feuille-nanosite'); ?></span><span class="poids-image-data"><?= $image_weight ?></span></div>
				<?php endif; ?>
				<img src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" data-src="<?php echo $image_url; ?>" alt="<?php echo $thumbnail_alt; ?>">
			</figure>
		</a>
	</div>
	<div class="article_extrait_wrapper_text">
		<div class="entry_title_date legende">
			<div class="date-extrait">
				<span class="date_jour"><?php the_time('d') ?></span>
				<span class="date_mois"><?php the_time('M') ?></span>
				<span class="date_annee"><?php the_time('Y') ?></span>
			</div>
			<?= showSvg(get_stylesheet_directory_uri() . '/svg/fond-dates-extraits-articles.svg') ?>
		</div>
		<h2 class="article_extrait_post_title">
			<a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>">
				<?php the_title(); ?>
			</a>
		</h2>
		<?php $description_extrait_de_la_page = get_field('description_extrait_de_la_page', get_the_ID()); ?>
		<p class="desc"><?= $description_extrait_de_la_page; ?></p>
	</div>
	<?php $calltoactiondesextraitsdarticles = get_field('call-to-action_des_extraits_darticles', 'option'); ?>
	<a class="read-more" aria-hidden="true" href="<?php the_permalink(); ?>" title="<?php the_title(); ?>" class="btn btn_article_extrait"><?= $calltoactiondesextraitsdarticles; ?></a>
</article>