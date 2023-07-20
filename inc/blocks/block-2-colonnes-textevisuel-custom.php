<?php

/**
 * Block Name: block-2-colonnes-textevisuel-custom
 *
 * This is the template that displays the 2-colonnes-texte-visuel block.
 */
if (have_rows('block_2_colonnes_textevisuel_custom')) : the_row(); // il s'agit du nom du champ dans ACF qui contient les sous-champs
	$cb_ajouter_une_classe_css = get_sub_field('cb_ajouter_une_classe_css');
	$ajouter_un_id_pour_le_css = get_sub_field('ajouter_un_id_pour_le_css');
	$couleur_de_fond_bloc = get_sub_field('couleur_de_fond_bloc');
	$marge_en_haut_du_bloc = get_sub_field('marge_en_haut_du_bloc');
	$marge_en_bas_du_bloc = get_sub_field('marge_en_bas_du_bloc');
	$cb_calltoaction = get_sub_field('cb_call-to-action');
	$cb_calltoaction_lien = get_sub_field('cb_call-to-action_lien');
	$cb_calltoaction_url = get_sub_field('cb_call-to-action_url');
	$cb_calltoaction_fichier = get_sub_field('cb_call-to-action_fichier');
	$cb_calltoaction_fichier_size = filesize(get_attached_file($cb_calltoaction_fichier));
	$cb_calltoaction_interne_externe = get_sub_field('lien_interne_ou_externe_');
	$ouvrir_dans_un_nouvel_onglet = get_sub_field('ouvrir_dans_un_nouvel_onglet');
	$alignement_du_bouton = get_sub_field('alignement_du_bouton');
	$style_du_bouton = get_sub_field('style_du_bouton');
	$vague_au_dessus_du_bloc = get_sub_field('vague_au_dessus_du_bloc');
	$vague_au_dessous_du_bloc = get_sub_field('vague_au_dessous_du_bloc');
	$padding_en_haut_du_bloc = get_sub_field('padding_en_haut_du_bloc');
	$padding_en_bas_du_bloc = get_sub_field('padding_en_bas_du_bloc');
	$faire_passer_le_bloc_au_dessus_des_autres = get_sub_field('faire_passer_le_bloc_au_dessus_des_autres');
	$liseret_vert_autour_du_bloc = get_sub_field('liseret_vert_autour_du_bloc');

endif;
?>
<div class="<?php if ($couleur_de_fond_bloc) : ?>
    <?php echo " " . $couleur_de_fond_bloc; ?>
<?php endif; ?>
<?php if ($marge_en_haut_du_bloc) : ?>
    <?php echo " padding_section_top"; ?>
<?php endif; ?>
<?php if ($marge_en_bas_du_bloc) : ?>
    <?php echo " padding_section_bottom"; ?>
<?php endif; ?>
">
	<?php if ($vague_au_dessus_du_bloc) : ?>
		<?= showSvg(get_stylesheet_directory_uri() . '/svg/marge_haute.svg') ?>
	<?php endif; ?>
	<!-- Visuel à gauche -->
	<?php if (get_sub_field('contentbuilder_visuel_a_gauche_ou_a_droite') == 'gauche') : ?>
		<?php echo "<div "; ?>
		<?php if ($ajouter_un_id_pour_le_css) : ?>
			<?php echo " id='" . $ajouter_un_id_pour_le_css . "'"; ?>
		<?php endif; ?>
		<?php echo " class='"; ?>
		<?php if ($cb_ajouter_une_classe_css) : ?>
			<?php echo " " . $cb_ajouter_une_classe_css . ""; ?>
		<?php endif; ?>
		<?php if ($padding_en_haut_du_bloc) : ?>
			<?php echo " padding_section_top"; ?>
		<?php endif; ?>
		<?php if ($padding_en_bas_du_bloc) : ?>
			<?php echo " padding_section_bottom"; ?>
		<?php endif; ?>
		<?php
		if ($faire_passer_le_bloc_au_dessus_des_autres) :
			echo " z-index-1";
		endif;
		if ($liseret_vert_autour_du_bloc) : echo " has-edge ";
		endif;
		echo " block'"; ?>>
		<?php if ($liseret_vert_autour_du_bloc) : ?>
			<?= showSvg(get_stylesheet_directory_uri() . '/svg/green-edge-desktop-tall') ?>
			<?= showSvg(get_stylesheet_directory_uri() . '/svg/green-edge') ?>
		<?php endif; ?>
		<?php get_template_part('inc/dessin-en-fond'); ?>

		<div class="content_width col_double">
			<!-- col left -->
			<div class="col_left">
				<div class="col_left_wrapper">
					<!-- visuel -->
					<?php
					if (have_rows('cb_type_de_visuel')) :
						while (have_rows('cb_type_de_visuel')) : the_row();
							switch (get_row_layout()) {
								case 'cb_image_simple':
									get_template_part('inc/content-builder-inc/cb-image-simple');
									break;
								case 'cb_video_iframe':
									get_template_part('inc/content-builder-inc/cb-video-iframe');
									break;
							}
						endwhile;
					else :
					endif; ?>
				</div>
			</div>
			<!-- col right -->
			<div class="col_right">
				<div class="col_right_wrapper entry-content col_right_wrapper_padding">
					<?php the_sub_field('cb_contenu_texte'); ?>

					<!-- Lien page contact pré-remplie -->
					<?php if ($cb_calltoaction_interne_externe == 'page_contact') : ?>
						<?php get_template_part('inc/content-builder-inc/cb-form-to-prefilled-form'); ?>
					<?php endif; ?>

					<!-- Lien interne  -->
					<?php if ($cb_calltoaction_interne_externe == 'lien_interne') : ?>
						<?php if ($cb_calltoaction_lien) : ?>
							<p class="cta_btn_lead <?php echo $alignement_du_bouton; ?> <?php echo $style_du_bouton; ?>"><a href="<?php echo $cb_calltoaction_lien; ?>" <?php if ($ouvrir_dans_un_nouvel_onglet) : ?> target="_blank" <?php endif; ?>><?php echo $cb_calltoaction; ?></a></p>
						<?php endif; ?>
					<?php endif; ?>

					<!-- Lien externe  -->
					<?php if ($cb_calltoaction_interne_externe == 'lien_externe') : ?>
						<?php if ($cb_calltoaction_url) : ?>
							<p class="cta_btn_lead <?php echo $alignement_du_bouton; ?> <?php echo $style_du_bouton; ?>"><a href="<?php echo $cb_calltoaction_url; ?>" <?php if ($ouvrir_dans_un_nouvel_onglet) : ?> target="_blank" <?php endif; ?>><?php echo $cb_calltoaction; ?></a></p>
						<?php endif; ?>
					<?php endif; ?>

					<!-- Fichier à télécharger  -->
					<?php if ($cb_calltoaction_interne_externe == 'fichier_telechargement') : ?>
						<?php if ($cb_calltoaction_fichier) : ?>
							<p class="cta_btn_lead <?php echo $alignement_du_bouton; ?> <?php echo $style_du_bouton; ?>"><a href="<?php echo wp_get_attachment_url($cb_calltoaction_fichier); ?>" <?php if ($ouvrir_dans_un_nouvel_onglet) : ?> target="_blank" <?php endif; ?>><?php get_template_part('inc/arrow-download'); ?><?php echo $cb_calltoaction; ?> <span class="download_doc_size">- <?php echo size_format($cb_calltoaction_fichier_size, $decimals = 0); ?></span></a></p>
						<?php endif; ?>
					<?php endif; ?>
				</div>
			</div>
		</div>
</div>

<?php endif; ?>
<!-- Visuel à droite -->
<?php if (get_sub_field('contentbuilder_visuel_a_gauche_ou_a_droite') == 'droite') :  echo "<div ";
	if ($ajouter_un_id_pour_le_css) :  echo " id='" . $ajouter_un_id_pour_le_css . "'";
	endif;
	echo " class='";
	if ($marge_en_haut_du_bloc) : echo " padding_section_top";
	endif;
	if ($marge_en_bas_du_bloc) :  echo " padding_section_bottom";
	endif;
	if ($couleur_de_fond_bloc) :  echo " " . $couleur_de_fond_bloc;
	endif;
	if ($cb_ajouter_une_classe_css) :  echo " " . $cb_ajouter_une_classe_css . "";
	endif;
	if ($faire_passer_le_bloc_au_dessus_des_autres) : echo " z-index-1";
	endif;
	if ($liseret_vert_autour_du_bloc) : echo " has-edge ";
	endif;
	echo " block'"; ?>>
<?php if ($liseret_vert_autour_du_bloc) : ?>
	<?= showSvg(get_stylesheet_directory_uri() . '/svg/green-edge-desktop-tall') ?>
	<?= showSvg(get_stylesheet_directory_uri() . '/svg/green-edge') ?>
<?php endif; ?>
<div class="content_width col_double">
	<!-- col left -->
	<div class="col_left">
		<div class="col_left_wrapper entry-content col_left_wrapper_padding">
			<?php the_sub_field('cb_contenu_texte'); ?>

			<!-- Lien page contact pré-remplie -->
			<?php if ($cb_calltoaction_interne_externe == 'page_contact') : ?>
				<?php get_template_part('inc/content-builder-inc/cb-form-to-prefilled-form'); ?>
			<?php endif; ?>

			<!-- Lien interne  -->
			<?php if ($cb_calltoaction_interne_externe == 'lien_interne') : ?>
				<?php if ($cb_calltoaction_lien) : ?>
					<p class="cta_btn_lead <?php echo $alignement_du_bouton; ?> <?php echo $style_du_bouton; ?>"><a href="<?php echo $cb_calltoaction_lien; ?>" <?php if ($ouvrir_dans_un_nouvel_onglet) : ?> target="_blank" <?php endif; ?>><?php echo $cb_calltoaction; ?></a></p>
				<?php endif; ?>
			<?php endif; ?>

			<!-- Lien externe  -->
			<?php if ($cb_calltoaction_interne_externe == 'lien_externe') : ?>
				<?php if ($cb_calltoaction_url) : ?>
					<p class="cta_btn_lead <?php echo $alignement_du_bouton; ?> <?php echo $style_du_bouton; ?>"><a href="<?php echo $cb_calltoaction_url; ?>" <?php if ($ouvrir_dans_un_nouvel_onglet) : ?> target="_blank" <?php endif; ?>><?php echo $cb_calltoaction; ?></a></p>
				<?php endif; ?>
			<?php endif; ?>

			<!-- Fichier à télécharger  -->
			<?php if ($cb_calltoaction_interne_externe == 'fichier_telechargement') : ?>
				<?php if ($cb_calltoaction_fichier) : ?>
					<p class="cta_btn_lead <?php echo $alignement_du_bouton; ?> <?php echo $style_du_bouton; ?>"><a href="<?php echo wp_get_attachment_url($cb_calltoaction_fichier); ?>" <?php if ($ouvrir_dans_un_nouvel_onglet) : ?> target="_blank" <?php endif; ?>><?php get_template_part('inc/arrow-download'); ?><?php echo $cb_calltoaction; ?> <span class="download_doc_size">- <?php echo size_format($cb_calltoaction_fichier_size, $decimals = 0); ?></span></a></p>
				<?php endif; ?>
			<?php endif; ?>
		</div>
	</div>
	<!-- col right -->
	<div class="col_right">
		<div class="col_right_wrapper">
			<!-- visuel -->
			<?php
			if (have_rows('cb_type_de_visuel')) :
				while (have_rows('cb_type_de_visuel')) : the_row();
					switch (get_row_layout()) {
						case 'cb_image_simple':
							get_template_part('inc/content-builder-inc/cb-image-simple');
							break;
						case 'cb_video_iframe':
							get_template_part('inc/content-builder-inc/cb-video-iframe');
							break;
					}
				endwhile;
			else :
			endif; ?>
		</div>
	</div>
</div>
</div>
<?php endif; ?>

<?php if ($vague_au_dessous_du_bloc) : ?>
	   <div class="vague-basse">
            <?= showSvg(get_stylesheet_directory_uri() . '/svg/vague.svg') ?>
        </div> 
<?php endif; ?>

</div>