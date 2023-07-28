<?php get_header(); ?>
<?php get_template_part('inc/header/header-main'); ?>
<?php get_template_part('inc/breadcrumb'); ?>
<?php the_post(); ?>
<div id="global_content">
	<section class="page_defaut article_blog">
		<article id="post-container-<?php the_ID(); ?>" <?php post_class(); ?>>
			
			<?php get_template_part('inc/header/header-post'); ?>
			<div class="publie-le"><?php get_field('publie_le', 'option') . ' ' . get_the_date() ?></div>
			<?php if (the_content()) :
				the_content();
			endif; ?>

			<?php get_template_part('inc/share-post'); ?>

		</article>
		<?php get_template_part('inc/nav-blog'); ?>
		<?php get_template_part('inc/aside-actualites'); ?>
	</section>
	<?php get_footer(); ?>
</div> <!-- #global_content -->