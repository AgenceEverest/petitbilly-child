<?php $masquer_le_prefooter = get_field('masquer_le_prefooter', 'option'); ?>
<?php $masquer_les_coordonnees = get_field('masquer_les_coordonnees', 'option'); ?>
<?php $masquer_les_prestations = get_field('masquer_les_prestations', 'option'); ?>
<?php $masquer_les_certifications = get_field('masquer_les_certifications', 'option'); ?>
<?php $masquer_le_logo = get_field('masquer_le_logo', 'option'); ?>
<?php $afficher_bouton_newsletter = get_field('afficher_bouton_newsletter', 'option'); ?>
<?php $texte_bouton_newsletter = get_field('texte_bouton_newsletter', 'option'); ?>
<?php $iframe_newsletter = get_field('iframe_newsletter', 'option'); ?>
<?php if (!$masquer_le_prefooter) : ?>
	<aside id="aside_prefooter" class="padding_section">
		<div id="newsletter-container">
			<div class="iframe-container">
				<div href="#" class="close" id="closeNewsletter"></div>
				<?= $iframe_newsletter ?>
			</div>
		</div>
		<div id="aside_prefooter_wrapper" class="">
			<div class="aside_prefooter_col aside_prefooter_col_1">
				<?php if (!$masquer_les_coordonnees) : ?>
					<?php $coordonnees_footer = get_field('coordonnees_footer', 'option'); ?>
					<h3><?php if ($coordonnees_footer) : ?><?php echo $coordonnees_footer; ?><?php endif; ?></h3>
					<?php $nom = get_field('nom', 'option'); ?>
					<?php $adresseligne1 = get_field('adresse_ligne_1', 'option'); ?>
					<?php $adresseligne2 = get_field('adresse_ligne_2', 'option'); ?>
					<?php $adresseligne3 = get_field('adresse_ligne_3', 'option'); ?>
					<?php $numerodetelephone = get_field('numero_de_telephone', 'option'); ?>
					<?php $email = get_field('email', 'option'); ?>
					<?php $horaires = get_field('horaires', 'option'); ?>
					<?php if ($nom) : ?>
						<p class="coordonnees_p_i legende">
							<?= apply_filters('add_svg', 'user') ?>
							<?php echo $nom ?>
						</p>
					<?php endif; ?>
					<?php if ($adresseligne1 || $adresseligne2 || $adresseligne3) : ?>
						<p class="coordonnees_p_i legende">
							<?= apply_filters('add_svg', 'map-marker') ?>
							<?php if ($adresseligne1) : ?>
								<?php echo $adresseligne1 ?><br>
							<?php endif; ?>
							<?php if ($adresseligne2) : ?>
								<?php echo $adresseligne2 ?><br>
							<?php endif; ?>
							<?php if ($adresseligne3) : ?>
								<?php echo $adresseligne3 ?>
							<?php endif; ?>
						</p>
					<?php endif; ?>
					<?php if ($numerodetelephone) : ?>
						<p class="coordonnees_p_i legende">
							<?= apply_filters('add_svg', 'phone') ?>
							<?php echo $numerodetelephone ?>
						</p>
					<?php endif; ?>
					<?php if ($email) : ?>
						<p class="coordonnees_p_i legende">
							<?= apply_filters('add_svg', 'mail') ?>
							<a href="mailto:<?php echo antispambot($email); ?>"><?php echo antispambot($email); ?></a>
						</p>
					<?php endif; ?>
					<?php if ($horaires) : ?>
						<p class="coordonnees_p_i legende">
							<?= apply_filters('add_svg', 'clock') ?>
							<?php echo $horaires ?>
						</p>
					<?php endif; ?>
				<?php endif; ?>
			</div>
			<div class="aside_prefooter_col aside_prefooter_col_2">
				<?php if ($afficher_bouton_newsletter) : ?>
					<div class="button-newsletter-container">
						<p id="bouton-newlsetter" class="cta-bloc-flex ">
							<?= showSvg(get_stylesheet_directory_uri() . '/svg/fond-cta.svg') ?>
							<a><?= $texte_bouton_newsletter ?></a>
						</p>
					</div>

				<?php endif; ?>
				<?php wp_nav_menu(array(
					'theme_location' => 'menu-footer-2',
					// Autres paramètres de configuration du menu si nécessaire.
				)); ?>
				<?php $lien_vers_la_page_site_web_eco = get_field('lien_vers_la_page_site_web_eco-concu', 'option'); ?>
				<?php if ($lien_vers_la_page_site_web_eco->post_status === 'publish') : ?>
					<a class="lien-site-eco-concu" href="<?= get_permalink($lien_vers_la_page_site_web_eco->ID); ?>"><?= $lien_vers_la_page_site_web_eco->post_title ?></a>
				<?php endif; ?>
			</div>
			<div class="aside_prefooter_col aside_prefooter_col_3">
				<?php if (!$masquer_les_certifications) : ?>
					<?php $certifications_footer = get_field('certifications_footer', 'option'); ?>
					<h3><?php if ($certifications_footer) : ?><?php echo $certifications_footer; ?><?php endif; ?></h3>
					<?php if (have_rows('logos_certifications', 'option')) : ?>
						<div id="footer_certification_wrapper">
							<?php while (have_rows('logos_certifications', 'option')) : the_row(); ?>
								<?php $logo_de_la_certification = get_sub_field('logo_de_la_certification', 'option');
								$size_logo_de_la_certification = 'medium'; ?>
								<?php if (have_rows('informations_certification', 'option')) : ?>
									<?php while (have_rows('informations_certification', 'option')) : the_row();
										$nom_de_la_certification = get_sub_field('nom_de_la_certification', 'option');
										$lien_vers_la_certification = get_sub_field('lien_vers_la_certification', 'option'); ?>
										<figure class="footer_certification">
											<?php if ($lien_vers_la_certification) : ?><a href="<?php echo $lien_vers_la_certification; ?>" target="_blank"><?php endif; ?>
												<?php if ($nom_de_la_certification) : ?>
													<?php $attr['alt'] = $nom_de_la_certification; ?>
													<?php echo wp_get_attachment_image($logo_de_la_certification, $size_logo_de_la_certification, "", $attr); ?>
												<?php endif; ?>
												<?php if (!$nom_de_la_certification) : ?>
													<?php echo wp_get_attachment_image($logo_de_la_certification, $size_logo_de_la_certification, ""); ?>
												<?php endif; ?>
												<?php if ($lien_vers_la_certification) : ?></a><?php endif; ?>
										</figure>
									<?php endwhile; ?>
								<?php else : ?>
									<figure class="footer_certification">
										<?php echo wp_get_attachment_image($logo_de_la_certification, $size_logo_de_la_certification, ""); ?>
									</figure>
								<?php endif; ?>
							<?php endwhile; ?>
						</div>
					<?php else : endif; ?>
				<?php endif; ?>
			</div>
			<div id="aside_prefooter_col_logo" class="aside_prefooter_col aside_prefooter_col_4">
				<?php if (!$masquer_le_logo) : ?>
					<div>
						<?php $importer_le_logo_footer = get_field('importer_le_logo_footer', 'option'); ?>
						<?php $dimensions_logo_prefooter = get_field('dimensions_logo_prefooter', 'option'); ?>
						<figure id="logo_footer" class="<?php echo $dimensions_logo_prefooter; ?>">
							<img src="<?php echo $importer_le_logo_footer; ?>" alt="Logo <?php bloginfo('name'); ?>" title="<?php bloginfo('name'); ?>">
						</figure>
						<?php $accroche_sous_le_logo_footer = get_field('accroche_sous_le_logo_footer', 'option'); ?>
					</div>
				<?php endif; ?>
			</div>
		</div>
		<div class="remove_margin"></div>
	</aside>
<?php endif; ?>