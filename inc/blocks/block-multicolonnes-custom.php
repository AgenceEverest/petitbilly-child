<?php

/**
 * Block Name: block-multicolonnes-custom
 *
 * This is the template that displays the block-multicolonnes block.
 */
if (have_rows('block_multicolonnes_custom')) : the_row(); // il s'agit du nom du champ dans ACF qui contient les sous-champs
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
	$border_icone = get_sub_field('bordure_autour_des_icones');
	$vague_au_dessus_du_bloc = get_sub_field('vague_au_dessus_du_bloc');
	$vague_au_dessous_du_bloc = get_sub_field('vague_au_dessous_du_bloc');
	$padding_en_haut_du_bloc = get_sub_field('padding_en_haut_du_bloc');
	$padding_en_bas_du_bloc = get_sub_field('padding_en_bas_du_bloc');
	$faire_passer_le_bloc_au_dessus_des_autres = get_sub_field('faire_passer_le_bloc_au_dessus_des_autres');
	$liseret_vert_autour_du_bloc = get_sub_field('liseret_vert_autour_du_bloc');

endif;
?>

<div class="<?php if ($couleur_de_fond_bloc) :
				echo " " . $couleur_de_fond_bloc;
			endif;
			if ($marge_en_haut_du_bloc) : echo " margin_section_top";
		endif;
		if ($marge_en_bas_du_bloc) : echo " margin_section_bottom";
		endif;
			?>
">
	<?php if ($vague_au_dessus_du_bloc) : ?>
		<?= showSvg(get_stylesheet_directory_uri() . '/svg/marge_haute.svg') ?>
	<?php endif; ?>
	<div <?php echo " ";
			if ($ajouter_un_id_pour_le_css) :
				echo " id='" . $ajouter_un_id_pour_le_css . "'";
			endif;
			echo " class='";
			if ($cb_ajouter_une_classe_css) :
				echo " " . $cb_ajouter_une_classe_css . "";
			endif;
			if ($padding_en_haut_du_bloc) : echo " padding_section_top";
			endif;
			if ($padding_en_bas_du_bloc) : echo " padding_section_bottom";
			endif;
	
			if ($faire_passer_le_bloc_au_dessus_des_autres) :
				echo " z-index-1";
			endif;
			if ($liseret_vert_autour_du_bloc) : echo " has-edge ";
			endif;
			echo " block'"; ?>>
		<?php get_template_part('inc/dessin-en-fond'); ?>

		<?php if ($liseret_vert_autour_du_bloc) : ?>
			<?= showSvg(get_stylesheet_directory_uri() . '/svg/green-edge-desktop-tall') ?>
			<?= showSvg(get_stylesheet_directory_uri() . '/svg/green-edge') ?>
		<?php endif; ?>
		<!-- titre avant les colonnes-->
		<?php $titre_avant_les_colonnes = get_sub_field('ajouter_un_titre_multicolonnes');
		$largeur_de_la_colonne_titre = get_sub_field('largeur_de_la_colonne_titre');
		$separateur_de_la_colonne_titre = get_sub_field('separateur_de_la_colonne_titre');
		$multicolonnes = get_sub_field('multicolonnes');
		if ($titre_avant_les_colonnes) : ?>
			<div class="content_width zone_texte_avant_colonnes<?php if (!$multicolonnes and $separateur_de_la_colonne_titre == 'pas_de_separateur_titre') : ?> zone_texte_avant_colonnes_nopadding<?php endif; ?>">
				<div class="<?php echo $largeur_de_la_colonne_titre; ?> entry-content">
					<?php echo $titre_avant_les_colonnes; ?>
				</div>
			</div>
			<?php if ($separateur_de_la_colonne_titre != 'pas_de_separateur_titre') : ?>
				<div class="content_width separateur_de_la_colonne_titre_wrapper_wrapper separateur_de_la_colonne_titre_space">
					<div class="separateur_de_la_colonne_titre_wrapper">
						<div class="separateur_de_la_colonne_titre <?php echo $separateur_de_la_colonne_titre; ?>"></div>
					</div>
				</div>
			<?php endif; ?>
		<?php endif; ?>

		<div class="bloc_multicolonnes">
			<?php $rythme_de_la_grille = get_sub_field('rythme_de_la_grille'); ?>
			<?php $colonnes_avec_sans_bordures = get_sub_field('colonnes_avec_sans_bordures'); ?>
			<?php $taille_des_icones_logos = get_sub_field('taille_des_icones_logos'); ?>

			<?php if (have_rows('multicolonnes')) : ?>
				<div class="multicolonnes_wrapper">
					<?php while (have_rows('multicolonnes')) : the_row(); ?>
						<?php $multicolonnes_choix_visuel = get_sub_field('multicolonnes_choix_visuel'); ?>
						<?php $image_multicolonnes = get_sub_field('image_multicolonnes'); ?>
						<div class="multicolonnes_item <?php echo $rythme_de_la_grille; ?> <?php echo $colonnes_avec_sans_bordures; ?> <?= $image_multicolonnes ? 'round_border' : ''; ?>">
							<!-- Image -->
							<?php if ($multicolonnes_choix_visuel == 'multicolonne_visuel_image') : ?>
								<?php
								$url_image_multicolonnes = $image_multicolonnes ? $image_multicolonnes['url'] : null; ?>
								<?php if ($rythme_de_la_grille == 'rangee_de_4' || $rythme_de_la_grille == 'rangee_de_3') : ?>
									<?php $size_image_multicolonnes = 'thumbnail'; ?>
								<?php else : ?>
									<?php $size_image_multicolonnes = 'medium'; ?>
								<?php endif; ?>
								<?php $thumb_image_multicolonnes = $image_multicolonnes ? $image_multicolonnes['sizes'][$size_image_multicolonnes] : null;
								$image_weight = $thumb_image_multicolonnes ? apply_filters('get_weight_of_img', $thumb_image_multicolonnes) : '0kb';
								?>
								<?php if ($image_multicolonnes) : ?>

									<?php if (have_rows('options_de_limage')) : ?>
										<?php while (have_rows('options_de_limage')) : the_row(); ?>
											<?php $proportions_de_limage = get_sub_field('proportions_de_limage');
											$cadre_autour_de_limage_v1 = get_sub_field('cadre_autour_image_v1');
											$cadre_autour_de_limage_v2 = get_sub_field('cadre_autour_image_v2');
											$couleur_ombre_image = get_sub_field('couleur_ombre_image'); ?>
											<div class="<?php echo $proportions_de_limage; ?>">
											<?php endwhile; ?>
										<?php endif; ?>

										<figure class="<?= $couleur_ombre_image ?>">
											<div class="poids-image"><span class="poids-image-icone"><?php get_template_part('svg/symbole-feuille-nanosite'); ?></span><span class="poids-image-data"><?= $image_weight ?></span></div>
											<img src="<?php echo $thumb_image_multicolonnes; ?>" alt="<?php echo $image_multicolonnes['alt']; ?>" title="<?php echo $image_multicolonnes['title']; ?>">
											<?php if ($cadre_autour_de_limage_v1) : ?>
												<?= showSvg(get_stylesheet_directory_uri() . '/svg/image_frame_1.svg') ?>
											<?php endif; ?>
											<?php if ($cadre_autour_de_limage_v2) : ?>
												<?= showSvg(get_stylesheet_directory_uri() . '/svg/image_frame_2.svg') ?>
											<?php endif; ?>
										</figure>

										<?php if (have_rows('options_de_limage')) : ?>
											<?php while (have_rows('options_de_limage')) : the_row(); ?>
												<?php $ajouter_un_copyright = get_sub_field('ajouter_un_copyright'); ?>
												<?php if ($ajouter_un_copyright) : ?>
													<p class="copyright_image"><span class="copyright_image_txt">© <?php echo $ajouter_un_copyright; ?></span><span class="copyright_image_bg"></span></p>
												<?php endif; ?>
											<?php endwhile; ?>
										<?php endif; ?>

											</div>
										<?php endif; ?>
									<?php endif; ?>

									<?php $contenu_txt_multicolonnes = get_sub_field('contenu_txt_multicolonnes'); ?>
									<?php $ajouter_un_bouton_multi_cta = get_sub_field('ajouter_un_bouton_multi') == 'call-to-action'; ?>
									<?php $ajouter_un_bouton_multi_linkedin = get_sub_field('ajouter_un_bouton_multi') == 'linkedin'; ?>

									<?php if ($contenu_txt_multicolonnes || $ajouter_un_bouton_multi_cta || $ajouter_un_bouton_multi_linkedin) : ?>
										<div class="<?php echo $colonnes_avec_sans_bordures; ?>_content <?php if (get_sub_field('ajouter_un_bouton_multi') == 'call-to-action') { ?>multicolonnes_item_bouton<?php } ?><?php if (get_sub_field('ajouter_un_bouton_multi') == 'linkedin') { ?>multicolonnes_item_bouton<?php } ?>">
											<!-- Icone -->
											<?php if ($multicolonnes_choix_visuel == 'multicolonne_visuel_icone') : ?>
												<?php
												$picto_colonne = get_sub_field('icone_multicolonnes');
												$url_picto_colonne = $picto_colonne ? $picto_colonne['url'] : null;
												$size_picto = 'icones-colonnes';
												$picto = $picto_colonne ? $picto_colonne['sizes'][$size_picto] : null;
												$image_weight = apply_filters('get_weight_of_img', $picto);
												?>
												<?php if ($picto) : ?>
													<figure class="<?php echo $taille_des_icones_logos . ' '; ?>picto">
														<div class="poids-image-picto-container">
															<div class="poids-image-picto"><?= $image_weight ?></div>
														</div>
														<img src="<?php echo $picto; ?>" class="icon_multicolonnes <?= $border_icone ? null : 'border-icone-none' ?>" alt="<?php echo $picto_colonne['alt']; ?>">
													</figure>
												<?php endif; ?>
											<?php endif; ?>
											<!-- Contenu -->
											<?php $contenu_txt_multicolonnes = get_sub_field('contenu_txt_multicolonnes'); ?>
											<?php if ($contenu_txt_multicolonnes) : ?>
												<div class="entry-content">
													<?php echo $contenu_txt_multicolonnes; ?>
												</div>
											<?php endif; ?>



											<!-- Call-to-action -->
											<?php if (get_sub_field('ajouter_un_bouton_multi') == 'non') { ?>
											<?php } ?>
											<?php if (get_sub_field('ajouter_un_bouton_multi') == 'call-to-action') { ?>
												<?php $cb_calltoaction_multi = get_sub_field('cb_call-to-action_multi');
												$cb_calltoaction_lien_multi = get_sub_field('cb_call-to-action_lien_multi');
												$cb_calltoaction_url_multi = get_sub_field('cb_call-to-action_url_multi');
												$cb_calltoaction_fichier_multi = get_sub_field('cb_call-to-action_fichier_multi');
												$cb_calltoaction_fichier_multi_size = filesize(get_attached_file($cb_calltoaction_fichier_multi));
												$cb_calltoaction_interne_externe_multi = get_sub_field('lien_interne_ou_externe_multi');
												$ouvrir_dans_un_nouvel_onglet_multi = get_sub_field('ouvrir_dans_un_nouvel_onglet_multi');
												$alignement_du_bouton_multi = get_sub_field('alignement_du_bouton_multi');
												$style_du_bouton_multi = get_sub_field('style_du_bouton_multi');
												$page_contact_multi = get_sub_field('page_contact_multi'); ?>


												<!-- Lien page contact pré-remplie -->

												<?php if ($cb_calltoaction_interne_externe_multi == 'page_contact') :
													get_template_part('inc/content-builder-inc/cb-form-to-prefilled-form-multi');
												endif; ?>

												<!-- Lien interne  -->
												<?php if ($cb_calltoaction_interne_externe_multi == 'lien_interne') : ?>
													<?php if ($cb_calltoaction_lien_multi) : ?>
														<p class="cta_btn_lead <?php echo $alignement_du_bouton_multi; ?> <?php echo $style_du_bouton_multi; ?>"><a href="<?php echo $cb_calltoaction_lien_multi; ?>" <?php if ($ouvrir_dans_un_nouvel_onglet_multi) : ?> target="_blank" <?php endif; ?>><?php echo $cb_calltoaction_multi; ?></a></p>
													<?php endif; ?>
												<?php endif; ?>

												<!-- Lien externe  -->
												<?php if ($cb_calltoaction_interne_externe_multi == 'lien_externe') : ?>
													<?php if ($cb_calltoaction_url_multi) : ?>
														<p class="cta_btn_lead <?php echo $alignement_du_bouton_multi; ?> <?php echo $style_du_bouton_multi; ?>"><a href="<?php echo $cb_calltoaction_url_multi; ?>" <?php if ($ouvrir_dans_un_nouvel_onglet_multi) : ?> target="_blank" <?php endif; ?>><?php echo $cb_calltoaction_multi; ?></a></p>
													<?php endif; ?>
												<?php endif; ?>

												<!-- Fichier à télécharger  -->
												<?php if ($cb_calltoaction_interne_externe_multi == 'fichier_telechargement') : ?>
													<?php if ($cb_calltoaction_fichier_multi) : ?>
														<p class="cta_btn_lead <?php echo $alignement_du_bouton_multi; ?> <?php echo $style_du_bouton_multi; ?>"><a href="<?php echo wp_get_attachment_url($cb_calltoaction_fichier_multi); ?>" <?php if ($ouvrir_dans_un_nouvel_onglet_multi) : ?> target="_blank" <?php endif; ?>><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
																	<path fill="currentColor" d="M413.1 222.5l22.2 22.2c9.4 9.4 9.4 24.6 0 33.9L241 473c-9.4 9.4-24.6 9.4-33.9 0L12.7 278.6c-9.4-9.4-9.4-24.6 0-33.9l22.2-22.2c9.5-9.5 25-9.3 34.3.4L184 343.4V56c0-13.3 10.7-24 24-24h32c13.3 0 24 10.7 24 24v287.4l114.8-120.5c9.3-9.8 24.8-10 34.3-.4z"></path>
																</svg><?php echo $cb_calltoaction_multi; ?> <span class="download_doc_size">- <?php echo size_format($cb_calltoaction_fichier_multi_size, $decimals = 0); ?></span></a></p>
													<?php endif; ?>
												<?php endif; ?>

											<?php } ?>

											<?php if (get_sub_field('ajouter_un_bouton_multi') == 'linkedin') { ?>
												<?php $adresse_du_profil_linkedin = get_sub_field('adresse_du_profil_linkedin'); ?>
												<?php if ($adresse_du_profil_linkedin) : ?>
													<p class="multicolonnes_btn"><a href="<?php echo $adresse_du_profil_linkedin; ?>" class="btn_linkedin" target="_blank"><?= apply_filters('add_svg', 'linkedin'); ?></a></p>
												<?php endif; ?>
											<?php } ?>
										</div><?php endif; ?>
						</div>
					<?php endwhile; ?>
				</div>
			<?php else : endif; ?>

			<div class="content_width">
				<!-- Lien page contact pré-remplie -->
				<?php if ($cb_calltoaction_interne_externe == 'page_contact') :
					if ($cb_calltoaction) :
						get_template_part('inc/content-builder-inc/cb-form-to-prefilled-form');
					endif;
				endif; ?>

				<!-- Lien interne  -->
				<?php if ($cb_calltoaction_interne_externe == 'lien_interne') : ?>
					<?php if ($cb_calltoaction_lien) : ?>
						<p class="cta_btn_lead <?php echo $alignement_du_bouton; ?> <?php echo $style_du_bouton; ?><?php if (!$multicolonnes) : ?> cta_btn_lead_nomargintop<?php endif; ?>"><a href="<?php echo $cb_calltoaction_lien; ?>" <?php if ($ouvrir_dans_un_nouvel_onglet) : ?> target="_blank" <?php endif; ?>><?php echo $cb_calltoaction; ?></a></p>
					<?php endif; ?>
				<?php endif; ?>

				<!-- Lien externe  -->
				<?php if ($cb_calltoaction_interne_externe == 'lien_externe') : ?>
					<?php if ($cb_calltoaction_url) : ?>
						<p class="cta_btn_lead <?php echo $alignement_du_bouton; ?> <?php echo $style_du_bouton; ?><?php if (!$multicolonnes) : ?> cta_btn_lead_nomargintop<?php endif; ?>"><a href="<?php echo $cb_calltoaction_url; ?>" <?php if ($ouvrir_dans_un_nouvel_onglet) : ?> target="_blank" <?php endif; ?>><?php echo $cb_calltoaction; ?></a></p>
					<?php endif; ?>
				<?php endif; ?>

				<!-- Fichier à télécharger  -->
				<?php if ($cb_calltoaction_interne_externe == 'fichier_telechargement') : ?>
					<?php if ($cb_calltoaction_fichier) : ?>
						<p class="cta_btn_lead <?php echo $alignement_du_bouton; ?> <?php echo $style_du_bouton; ?><?php if ((!$colonne1) && ($separateur_de_la_colonne_titre = 'pas_de_separateur_titre')) : ?> cta_btn_lead_nomargintop<?php endif; ?>"><a href="<?php echo wp_get_attachment_url($cb_calltoaction_fichier); ?>" <?php if ($ouvrir_dans_un_nouvel_onglet) : ?> target="_blank" <?php endif; ?>><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
									<path fill="currentColor" d="M413.1 222.5l22.2 22.2c9.4 9.4 9.4 24.6 0 33.9L241 473c-9.4 9.4-24.6 9.4-33.9 0L12.7 278.6c-9.4-9.4-9.4-24.6 0-33.9l22.2-22.2c9.5-9.5 25-9.3 34.3.4L184 343.4V56c0-13.3 10.7-24 24-24h32c13.3 0 24 10.7 24 24v287.4l114.8-120.5c9.3-9.8 24.8-10 34.3-.4z"></path>
								</svg><?php echo $cb_calltoaction; ?> <span class="download_doc_size">- <?php echo size_format($cb_calltoaction_fichier_size, $decimals = 0); ?></span></a></p>
					<?php endif; ?>
				<?php endif; ?>
			</div>

		</div>
	</div>

	<?php if ($vague_au_dessous_du_bloc) : ?>
		<div class="vague-basse">
			<?= showSvg(get_stylesheet_directory_uri() . '/svg/vague-bas.svg') ?>
		</div>
	<?php endif; ?>

</div>