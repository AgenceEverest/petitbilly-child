<?php

/**
 * Block Name: block-2-colonnes-textevisuel-large-custom
 *
 * This is the template that displays the 2-colonnes-texte-visuel (large) block.
 */
if (have_rows('block_2_colonnes_textevisuel_large_custom')) : the_row(); // il s'agit du nom du champ dans ACF qui contient les sous-champs
	$cb_ajouter_une_classe_css = get_sub_field('cb_ajouter_une_classe_css');
	$ajouter_un_id_pour_le_css = get_sub_field('ajouter_un_id_pour_le_css');
	$couleur_de_fond_bloc = get_sub_field('couleur_de_fond_bloc');
	$cb_calltoaction = get_sub_field('cb_call-to-action');
	$cb_calltoaction_lien = get_sub_field('cb_call-to-action_lien');
	$cb_calltoaction_url = get_sub_field('cb_call-to-action_url');
	$cb_calltoaction_fichier = get_sub_field('cb_call-to-action_fichier');
	$cb_calltoaction_fichier_size = filesize(get_attached_file($cb_calltoaction_fichier));
	$cb_calltoaction_interne_externe = get_sub_field('lien_interne_ou_externe_');
	$ouvrir_dans_un_nouvel_onglet = get_sub_field('ouvrir_dans_un_nouvel_onglet');
	$alignement_du_bouton = get_sub_field('alignement_du_bouton');
	$style_du_bouton = get_sub_field('style_du_bouton');
	$marge_en_haut_du_bloc = get_sub_field('marge_en_haut_du_bloc');
	$marge_en_bas_du_bloc = get_sub_field('marge_en_bas_du_bloc');
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
		?>
		<?php echo "visuel-large block'>"; ?>
		<?php if ($liseret_vert_autour_du_bloc) : ?>
			<?= showSvg(get_stylesheet_directory_uri() . '/svg/green-edge-desktop-tall') ?>
			<?= showSvg(get_stylesheet_directory_uri() . '/svg/green-edge') ?>
		<?php endif; ?>

		<?php get_template_part('inc/dessin-en-fond'); ?>

		<div class="col_double_wide_imgleft">
			<div class="col_left_wide_imgleft">
				<?php if (have_rows('image_de_fond')) : ?>
					<?php while (have_rows('image_de_fond')) : the_row();
						$image_de_fond = get_sub_field('cb_contenu_image_fond');
						$size_image_de_fond = 'large';
						$url_image_de_fond = $image_de_fond ? wp_get_attachment_image_url($image_de_fond, $size_image_de_fond) : null;
						$image_weight =  $url_image_de_fond ? apply_filters('get_weight_of_img', $url_image_de_fond) : '0kb';
						$copyright_image_de_fond = get_sub_field('copyright_image_de_fond');
						$phrase_sur_limage = get_sub_field('phrase_sur_limage');
						$cadre_autour_de_limage_v1 = get_sub_field('cadre_autour_image_v1');
						$cadre_autour_de_limage_v2 = get_sub_field('cadre_autour_image_v2');
						$couleur_ombre_image = get_sub_field('couleur_ombre_image');
					?>
						<div class="col_left_wide_imgleft_img">
							<figure class="<?= $couleur_ombre_image ?>">
								<div class="poids-image"><span class="poids-image-icone"><?php get_template_part('svg/symbole-feuille-nanosite'); ?></span><span class="poids-image-data"><?= $image_weight ?></span></div>
								<?php $image_large = wp_get_attachment_image_src($image_de_fond, $size_image_de_fond);
								$alt_text = get_post_meta($image_de_fond, '_wp_attachment_image_alt', true); ?>
								<?php if ($phrase_sur_limage) : ?>
									<img src="<?php echo $image_large[0]; ?>" class="col_wide_img_transparent" width="<?php echo $image_large[1]; ?>" height="<?php echo $image_large[2]; ?>" alt="<?php echo $alt_text; ?>" loading="lazy">
								<?php else : ?>
									<img src="<?php echo $image_large[0]; ?>" class="col_wide_img_opacity" width="<?php echo $image_large[1]; ?>" height="<?php echo $image_large[2]; ?>" alt="<?php echo $alt_text; ?>" loading="lazy">
								<?php endif; ?>
								<?php if ($cadre_autour_de_limage_v1) : ?>
									<?= showSvg(get_stylesheet_directory_uri() . '/svg/image_frame_1.svg') ?>
								<?php endif; ?>
								<?php if ($cadre_autour_de_limage_v2) : ?>
									<?= showSvg(get_stylesheet_directory_uri() . '/svg/image_frame_2.svg') ?>
								<?php endif; ?>
							</figure>

							<?php if ($copyright_image_de_fond) : ?>
								<p class="copyright_image"><span class="copyright_image_txt"><?php echo $copyright_image_de_fond; ?></span><span class="copyright_image_bg"></span></p>
							<?php endif; ?>
							<?php if ($phrase_sur_limage) : ?>
								<div class="col_left_wide_imgleft_img_texte">
									<p><?php echo $phrase_sur_limage; ?></p>
								</div>
							<?php endif; ?>
						</div>
					<?php endwhile; ?>
				<?php endif; ?>
			</div>
			<div class="col_right_wide_imgleft padding_section padding_section_bottom">
				<div class="col_right_wide_imgleft_wrapper entry-content">
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

					<div class="col_flexible_wrapper">
						<!-- Colonne 1 -->
						<?php if (have_rows('colonne_1_colonne_flexible_clonable')) : ?>
							<?php while (have_rows('colonne_1_colonne_flexible_clonable')) : the_row(); ?>
								<?php get_template_part('inc/content-builder-inc/col-flexible-block'); ?>
							<?php endwhile; ?>
						<?php endif; ?>
					</div>
				</div>
			</div>
		</div>
</div>
<?php endif; ?>

<!-- Visuel à droite -->
<?php if (get_sub_field('contentbuilder_visuel_a_gauche_ou_a_droite') == 'droite') : ?>

	<?php echo "<div "; ?>
	<?php if ($ajouter_un_id_pour_le_css) : ?>
		<?php echo " id='" . $ajouter_un_id_pour_le_css . "'"; ?>
	<?php endif; ?>
	<?php echo " class='"; ?>
	<?php if ($couleur_de_fond_bloc) : ?>
		<?php echo " " . $couleur_de_fond_bloc; ?>
	<?php endif; ?>
	<?php if ($cb_ajouter_une_classe_css) : ?>
		<?php echo " " . $cb_ajouter_une_classe_css . ""; ?>
	<?php endif; ?>
	<?php
	if ($faire_passer_le_bloc_au_dessus_des_autres) :
		echo " z-index-1";
	endif;
	?>
	<?php echo "'>"; ?>
	<div class="col_double_wide_imgright">
		<div class="col_left_wide_imgright padding_section padding_section_bottom">
			<div class="col_left_wide_imgright_wrapper entry-content">
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
				<?php if (have_rows('colonne_1_colonne_flexible_clonable')) : ?>
					<div class="col_flexible_wrapper">
						<!-- Colonne 1 -->
						<?php while (have_rows('colonne_1_colonne_flexible_clonable')) : the_row(); ?>
							<?php get_template_part('inc/content-builder-inc/col-flexible-block'); ?>
						<?php endwhile; ?>
					</div>
				<?php endif; ?>

			</div>
		</div>
		<div class="col_right_wide_imgright">
			<?php if (have_rows('image_de_fond')) : ?>
				<?php while (have_rows('image_de_fond')) : the_row();
					$image_de_fond = get_sub_field('cb_contenu_image_fond');
					$size_image_de_fond = 'large';
					$url_image_de_fond = wp_get_attachment_image_url($image_de_fond, $size_image_de_fond);
					$image_weight = apply_filters('get_weight_of_img', $url_image_de_fond);
					$copyright_image_de_fond = get_sub_field('copyright_image_de_fond');
					$phrase_sur_limage = get_sub_field('phrase_sur_limage');
					$cadre_autour_de_limage_v1 = get_sub_field('cadre_autour_image_v1');
					$couleur_ombre_image = get_sub_field('couleur_ombre_image');
				?>
					<div class="col_right_wide_imgright_img">
						<figure class="<?= $couleur_ombre_image ?>">
							<div class="poids-image"><span class="poids-image-icone"><?php get_template_part('svg/symbole-feuille-nanosite'); ?></span><span class="poids-image-data"><?= $image_weight ?></span></div>
							<?php $image_large = wp_get_attachment_image_src($image_de_fond, $size_image_de_fond);
							$alt_text = get_post_meta($image_de_fond, '_wp_attachment_image_alt', true); ?>
							<?php if ($phrase_sur_limage) : ?>
								<img src="<?php echo $image_large[0]; ?>" class="col_wide_img_transparent" width="<?php echo $image_large[1]; ?>" height="<?php echo $image_large[2]; ?>" alt="<?php echo $alt_text; ?>" loading="lazy">
							<?php else : ?>
								<img src="<?php echo $image_large[0]; ?>" class="col_wide_img_opacity" width="<?php echo $image_large[1]; ?>" height="<?php echo $image_large[2]; ?>" alt="<?php echo $alt_text; ?>" loading="lazy">
							<?php endif; ?>
							<?php if ($cadre_autour_de_limage_v1) : ?>
								<?= showSvg(get_stylesheet_directory_uri() . '/svg/image_frame_1.svg') ?>
							<?php endif; ?>
							<?php if ($cadre_autour_de_limage_v2) : ?>
								<?= showSvg(get_stylesheet_directory_uri() . '/svg/image_frame_2.svg') ?>
							<?php endif; ?>
						</figure>
						<?php if ($copyright_image_de_fond) : ?>
							<p class="copyright_image"><span class="copyright_image_txt"><?php echo $copyright_image_de_fond; ?></span><span class="copyright_image_bg"></span></p>
						<?php endif; ?>
						<?php if ($phrase_sur_limage) : ?>
							<div class="col_right_wide_imgright_img_texte">
								<p><?php echo $phrase_sur_limage; ?></p>
							</div>
						<?php endif; ?>
					</div>
				<?php endwhile; ?>
			<?php endif; ?>
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