<?php $fil_ariane_accueil = get_field('fil_ariane_accueil', 'option'); ?>

<!-- Page simple -->
<?php
if (is_page() && !$post->post_parent) : ?>
	<nav class="breadcrumb_top content_large">
		<p class="legende"><a href="<?php bloginfo('url'); ?>"><?php echo $fil_ariane_accueil; ?></a><span class="breadcrumb_separator">›</span><span aria-current='location'><?php the_title(); ?></span></p>
	</nav>
<?php endif; ?>



<!-- Page simple avec page parente -->
<?php
if (is_page() && $post->post_parent) : ?>

	<nav class="breadcrumb_top content_large">
		<p class="legende"><a href="<?php bloginfo('url'); ?>"><?php echo $fil_ariane_accueil; ?></a><span class="breadcrumb_separator">›</span><a href="<?php echo get_permalink($post->post_parent); ?>"><?php echo get_the_title($post->post_parent); ?></a><span class="breadcrumb_separator">›</span><span aria-current='location'><?php the_title(); ?></span>
		</p>
	</nav>
<?php endif; ?>


<!-- Single offres -->
<?php
if (is_singular('offres')) : ?>
	<?php $page_qui_liste_les_offres = get_field('page_qui_liste_les_offres', 'option');
	$page_qui_liste_les_offres_id = $page_qui_liste_les_offres->ID;
	$page_qui_liste_les_offres_permalink = get_permalink($page_qui_liste_les_offres_id);
	$page_qui_liste_les_offres_title = get_the_title($page_qui_liste_les_offres_id);
	?>
	<nav class="breadcrumb_top content_large">
		<p class="legende"><a href="<?php bloginfo('url'); ?>"><?php echo $fil_ariane_accueil; ?></a><span class="breadcrumb_separator">›</span><a href="<?php echo $page_qui_liste_les_offres_permalink; ?>"><?php echo $page_qui_liste_les_offres_title; ?></a><span class="breadcrumb_separator">›</span><span aria-current='location'><?php the_title(); ?></span>
		</p>
	</nav>
<?php endif; ?>


<!-- Single post -->
<?php
if (is_singular('post')) : ?>
	<?php $page_for_posts = get_option('page_for_posts'); ?>
	<nav class="breadcrumb_top content_large">
		<p class="legende"><a href="<?php bloginfo('url'); ?>"><?php echo $fil_ariane_accueil; ?></a><span class="breadcrumb_separator">›</span><a href="<?php echo get_permalink($page_for_posts); ?>"><?php echo get_the_title($page_for_posts); ?></a><span class="breadcrumb_separator">›</span><span aria-current='location'><?php the_title(); ?></span>
		</p>
	</nav>
<?php endif; ?>


<!-- Archive blog -->
<?php
if (is_home()) : ?>
	<?php $page_for_posts = get_option('page_for_posts'); ?>
	<nav class="breadcrumb_top content_large">
		<p class="legende"><a href="<?php bloginfo('url'); ?>"><?php echo $fil_ariane_accueil; ?></a><span class="breadcrumb_separator">›</span><span aria-current='location'><?php echo get_the_title($page_for_posts); ?></span>
		</p>
	</nav>
<?php endif; ?>


<!-- Archive category -->
<?php
if (is_category()) : ?>
	<?php $titresdelapageactualites = get_field('titre_de_la_page_actualites', 'option'); ?>
	<?php $term = get_queried_object(); ?>
	<?php $page_for_posts = get_option('page_for_posts'); ?>
	<nav class="breadcrumb_top content_large">
		<p class="legende"><a href="<?php bloginfo('url'); ?>"><?php echo $fil_ariane_accueil; ?></a><span class="breadcrumb_separator">›</span><a href="<?php echo get_permalink($page_for_posts); ?>"><?php echo get_the_title($page_for_posts); ?></a><span class="breadcrumb_separator">›</span><span aria-current='location'><?php echo "$term->name" ?></span>
		</p>
	</nav>
<?php endif; ?>


<!-- Page recherche -->
<?php
if (is_search()) : ?>
	<?php $fil_ariane_resultats_recherche = get_field('fil_ariane_resultats_recherche', 'option'); ?>
	<nav class="breadcrumb_top content_large">
		<p class="legende"><a href="<?php bloginfo('url'); ?>"><?php echo $fil_ariane_accueil; ?></a><span class="breadcrumb_separator">›</span><span aria-current='location'><?php echo $fil_ariane_resultats_recherche; ?></span></p>
	</nav>
<?php endif; ?>


<!-- Page 404 -->
<?php
if (is_404()) : ?>
	<nav class="breadcrumb_top content_large">
		<p class="legende"><a href="<?php bloginfo('url'); ?>"><?php echo $fil_ariane_accueil; ?></a><span class="breadcrumb_separator">›</span><span aria-current='location'>404</span></p>
	</nav>
<?php endif; ?>