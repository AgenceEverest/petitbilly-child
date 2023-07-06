<?php

/**
 * Block Name: block-contact-form-jquery
 *
 * This is the template that displays the block-contact-form-jquery.
 */
if (have_rows('block_contact_form_jquery')) : the_row(); // il s'agit du nom du champ dans ACF qui contient les sous-champs


endif;
wp_enqueue_script('jquery', 'https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js', array(), null, true);

?>
<div class="block-contact-form-jquery">
	<div class="plectre-contact-form">
		<?= showSvg(get_stylesheet_directory_uri() . '/svg/grand-plectre-jaune.svg') ?>
	</div>
	<div class="ninja-form-container">
		<?= do_shortcode('[ninja_form id=3]') ?> 
	</div>
</div>