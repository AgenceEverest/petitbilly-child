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
	$marge_en_haut_du_bloc = get_sub_field('marge_en_haut_du_bloc');
	$marge_en_bas_du_bloc = get_sub_field('marge_en_bas_du_bloc');
	$vague_au_dessus_du_bloc = get_sub_field('vague_au_dessus_du_bloc');
	$vague_au_dessous_du_bloc = get_sub_field('vague_au_dessous_du_bloc');
	$padding_en_haut_du_bloc = get_sub_field('padding_en_haut_du_bloc');
	$padding_en_bas_du_bloc = get_sub_field('padding_en_bas_du_bloc');
	$liseret_vert_autour_du_bloc = get_sub_field('liseret_vert_autour_du_bloc');

endif;
?>
<div class="<?php
			if ($marge_en_haut_du_bloc) : echo " margin_section_top";
			endif;
			if ($marge_en_bas_du_bloc) : echo " margin_section_bottom";
			endif;
			if ($couleur_de_fond_bloc) :
				echo ' ' . $couleur_de_fond_bloc . '_vague';
			endif;
			?>">
	<?php if ($vague_au_dessus_du_bloc) : ?>
		<?= showSvg(get_stylesheet_directory_uri() . '/svg/marge_haute.svg') ?>
	<?php endif; ?>
	<!-- Visuel à gauche -->
	<?php if (get_sub_field('contentbuilder_visuel_a_gauche_ou_a_droite') == 'gauche') :
		echo "<div ";
		if ($ajouter_un_id_pour_le_css) :  echo " id='" . $ajouter_un_id_pour_le_css . "'";
		endif;
		echo " class='";
		if ($cb_ajouter_une_classe_css) :  echo " " . $cb_ajouter_une_classe_css . "";
		endif;
		if ($padding_en_haut_du_bloc) : echo " padding_section_top";
		endif;
		if ($padding_en_bas_du_bloc) : echo " padding_section_bottom";
		endif;
		if ($couleur_de_fond_bloc) : echo " " . $couleur_de_fond_bloc;
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
						$cadre_autour_image_v1 = get_sub_field('cadre_autour_image_v1');
						$position_du_cadre = get_sub_field('position_du_cadre');
					?>
						<div class="col_left_wide_imgleft_img">
							<figure class="<?php if ($cadre_autour_image_v1) : echo "cadre_autour_image";
											endif; ?>">
								<div class="poids-image"><span class="poids-image-icone"><?php get_template_part('svg/symbole-feuille-nanosite'); ?></span><span class="poids-image-data"><?= $image_weight ?></span></div>
								<?php $image_large = wp_get_attachment_image_src($image_de_fond, $size_image_de_fond);
								$alt_text = get_post_meta($image_de_fond, '_wp_attachment_image_alt', true); ?>
								<?php if ($phrase_sur_limage) : ?>
									<img src="<?php echo $image_large[0]; ?>" class="col_wide_img_transparent" width="<?php echo $image_large[1]; ?>" height="<?php echo $image_large[2]; ?>" alt="<?php echo $alt_text; ?>" loading="lazy">
								<?php else : ?>
									<img src="<?php echo $image_large[0]; ?>" class="col_wide_img_opacity" width="<?php echo $image_large[1]; ?>" height="<?php echo $image_large[2]; ?>" alt="<?php echo $alt_text; ?>" loading="lazy">
								<?php endif; ?>
								<?php if ($cadre_autour_image_v1) : ?>
									<svg preserveAspectRatio="none" class="edge-image <?= $position_du_cadre ? $position_du_cadre : ''; ?>" xmlns="http://www.w3.org/2000/svg" width="513.359" height="397.989" viewBox="0 0 513.359 397.989">
										<path id="GettyImages-812274250" d="M3931.006,1788.394c47.843,6.933,96.157.861,128.4,0s83.2,6.174,102.271,6.175c17.272-.76,102.784-7.591,116.039,0,13.681,7.589,18.383,47.057,18.383,74.38.855,20.493,4.712,254.267-4.359,293.653s-171.194,8.881-183.978,11.841-152.3,5.92-167.3,0-131.174,11.841-146.738-4.934,2.78-216.083-3.334-269.365-1.667-85.842,10.561-100.642S3931.006,1788.394,3931.006,1788.394Z" transform="translate(-3785.784 -1786.433)" fill="none" stroke="#00693e" stroke-width="3" />
									</svg>
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
					<?php get_template_part('inc/content-builder-inc/cta-flex') ?>
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
<?php if (get_sub_field('contentbuilder_visuel_a_gauche_ou_a_droite') == 'droite') :
	echo "<div ";
	if ($ajouter_un_id_pour_le_css) :  echo " id='" . $ajouter_un_id_pour_le_css . "'";
	endif;
	echo " class='";
	if ($couleur_de_fond_bloc) :  echo " " . $couleur_de_fond_bloc;
	endif;
	if ($cb_ajouter_une_classe_css) :  echo " " . $cb_ajouter_une_classe_css . "";
	endif;
?>
	<?php echo "'>"; ?>
	<div class="col_double_wide_imgright">
		<div class="col_left_wide_imgright padding_section padding_section_bottom">
			<div class="col_left_wide_imgright_wrapper entry-content">
				<?php the_sub_field('cb_contenu_texte'); ?>
				<!-- Lien page contact pré-remplie -->
				<?php get_template_part('inc/content-builder-inc/cta-flex') ?>


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
					$cadre_autour_image_v1 = get_sub_field('cadre_autour_image_v1');
					$couleur_ombre_image = get_sub_field('couleur_ombre_image');
					$position_du_cadre = get_sub_field('position_du_cadre'); ?>
					<div class="col_right_wide_imgright_img">
						<figure class="<?php if ($cadre_autour_image_v1) : echo "cadre_autour_image";
										endif; ?>">
							<div class="poids-image"><span class="poids-image-icone"><?php get_template_part('svg/symbole-feuille-nanosite'); ?></span><span class="poids-image-data"><?= $image_weight ?></span></div>
							<?php $image_large = wp_get_attachment_image_src($image_de_fond, $size_image_de_fond);
							$alt_text = get_post_meta($image_de_fond, '_wp_attachment_image_alt', true); ?>
							<?php if ($phrase_sur_limage) : ?>
								<img src="<?php echo $image_large[0]; ?>" class="col_wide_img_transparent" width="<?php echo $image_large[1]; ?>" height="<?php echo $image_large[2]; ?>" alt="<?php echo $alt_text; ?>" loading="lazy">
							<?php else : ?>
								<img src="<?php echo $image_large[0]; ?>" class="col_wide_img_opacity" width="<?php echo $image_large[1]; ?>" height="<?php echo $image_large[2]; ?>" alt="<?php echo $alt_text; ?>" loading="lazy">
							<?php endif; ?>
							<?php if ($cadre_autour_image_v1) : ?>
								<svg preserveAspectRatio="none" class="edge-image <?= $position_du_cadre ? $position_du_cadre : ''; ?>" xmlns="http://www.w3.org/2000/svg" width="513.359" height="397.989" viewBox="0 0 513.359 397.989">
									<path id="GettyImages-812274250" d="M3931.006,1788.394c47.843,6.933,96.157.861,128.4,0s83.2,6.174,102.271,6.175c17.272-.76,102.784-7.591,116.039,0,13.681,7.589,18.383,47.057,18.383,74.38.855,20.493,4.712,254.267-4.359,293.653s-171.194,8.881-183.978,11.841-152.3,5.92-167.3,0-131.174,11.841-146.738-4.934,2.78-216.083-3.334-269.365-1.667-85.842,10.561-100.642S3931.006,1788.394,3931.006,1788.394Z" transform="translate(-3785.784 -1786.433)" fill="none" stroke="#00693e" stroke-width="3" />
								</svg>
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
	<?= '</div>' ?>
<?php endif; ?>
<?php if ($vague_au_dessous_du_bloc) : ?>
	<div class="vague-basse">
		<?= showSvg(get_stylesheet_directory_uri() . '/svg/vague-bas.svg') ?>
	</div>
<?php endif; ?>

</div>