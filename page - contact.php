<?php

/**
 * Template Name: Contact
 */
get_header(); ?>
<?php get_template_part('inc/header/header-main'); ?>
<?php get_template_part('inc/breadcrumb'); ?>
<?php the_post(); ?>

<?php $nom = get_field('nom', 'option'); ?>
<?php $adresseligne1 = get_field('adresse_ligne_1', 'option'); ?>
<?php $adresseligne2 = get_field('adresse_ligne_2', 'option'); ?>
<?php $adresseligne3 = get_field('adresse_ligne_3', 'option'); ?>
<?php $numerodetelephone = get_field('numero_de_telephone', 'option'); ?>
<?php $email = get_field('email', 'option'); ?>
<?php $horaires = get_field('horaires', 'option'); ?>
<?php $accroche_au_dessus_du_formulaire = get_field('accroche_au_dessus_du_formulaire', 'option'); ?>
<div id="global_content">
	<section class="page_defaut">
		<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
			<?php get_template_part('inc/header/header-page'); ?>
			<?php
			if (the_content()) :
				the_content();
			endif; ?>
			<?php $utiliser_un_formulaire_sur_la_page_contact = get_field('utiliser_un_formulaire_sur_la_page_contact', 'option'); ?>
			<?php if ($utiliser_un_formulaire_sur_la_page_contact) : ?>
				<div class="padding_section fond_clair">
					<div class="coldouble_contact">
						<div class="coldouble_contact_left">
							<?php
							$image_sous_les_coordonnees = get_field('image_sous_les_coordonnees', 'option');
							$size_image_sous_les_coordonnees = "medium";
							$url_image_sous_les_coordonnees = $image_sous_les_coordonnees ? wp_get_attachment_image_url($image_sous_les_coordonnees, $size_image_sous_les_coordonnees) : null;
							$image_weight = $url_image_sous_les_coordonnees ? apply_filters('get_weight_of_img', $url_image_sous_les_coordonnees) : '0kb'; ?>

							<?php if ($image_sous_les_coordonnees) : ?>
								<div id="coordonnees_image">
									<figure id="coordonnees_image_wrapper">
										<div class="poids-image"><span class="poids-image-icone"><?php get_template_part('svg/symbole-feuille-nanosite'); ?></span><span class="poids-image-data"><?= $image_weight ?></span></div>

										<?php $image_contact = wp_get_attachment_image_src($image_sous_les_coordonnees, $size_image_sous_les_coordonnees);
										$alt_text = get_post_meta($image_sous_les_coordonnees, '_wp_attachment_image_alt', true); ?>
										<img src="<?php echo $image_contact[0]; ?>" width="<?php echo $image_contact[1]; ?>" height="<?php echo $image_contact[2]; ?>" alt="<?php echo $alt_text; ?>" loading="lazy">

									</figure>
								</div>
							<?php endif; ?>
							<div id="coordonnees">
								<div id="coordonnees_wrapper">

									<?php if ($nom) : ?>
										<p class="coordonnees_p_i">
											<?= apply_filters('add_svg', 'user') ?>
											<strong><?php echo $nom ?></strong>
										</p>
									<?php endif; ?>

									<?php if ($adresseligne1 || $adresseligne2 || $adresseligne3) : ?>
										<p class="coordonnees_p_i">
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
										<p class="coordonnees_p_i">
											<?= apply_filters('add_svg', 'phone') ?>
											<?php echo $numerodetelephone ?>
										</p>
									<?php endif; ?>

									<?php if ($email) : ?>
										<p class="coordonnees_p_i">
											<?= apply_filters('add_svg', 'mail') ?>
											<a href="mailto:<?php echo antispambot($email); ?>"><?php echo antispambot($email); ?></a>
										</p>
									<?php endif; ?>

									<?php if ($horaires) : ?>
										<p class="coordonnees_p_i">
											<?= apply_filters('add_svg', 'clock') ?>
											<?php echo $horaires ?>
										</p>
									<?php endif; ?>

								</div>
							</div>
						</div>
						<div class="coldouble_contact_right anim_right_left entry-content">
							<h2 id="nf-form-title-2"><?php echo "$accroche_au_dessus_du_formulaire" ?></h2>
							<script id="easiwebform-8" charset="utf-8" type="text/javascript" src=https://olga.easiwebforms.net/static/shell.js></script>							<script>
                                function hideFields(hiddenDLC,hiddenNumber){
                                    hiddenDLC.style.display = "none";
                                    hiddenNumber.style.display = "none";
                                }

								// Select options for "Petit Billy"
								let categoriesProduitAConserver = ['Fromage']
								let marquesAConserver = ['Petit Billy']
								let conditionnementsAConserver = ['','200g','130g']
								function conserverOptionsSelect(selectId, optionsAConserver) {
									const select = document.getElementById(selectId)
									const options = Array.from(select.options)
									for (var option of options) {
										if (!optionsAConserver.includes(option.value)) {
											select.removeChild(option)
										}
									}
								}

                                function manageDisplay(){
                                    //Get the fields with dynamic display
                                    const hiddenDLC = document.getElementById("easi_fielddiv_CS_ExpirationDate");
                                    const hiddenNumber = document.getElementById("easi_fielddiv_CS_ProductNumber");
                                    //Initialization fields to hide
                                    hideFields(hiddenDLC,hiddenNumber);
                                    //Change in the select field "Motif" will trigger the change of display
                                    const selectField = document.getElementById("fld_Category");
                                    selectField.addEventListener("change",function(){
                                        if(selectField.value==="5"){
                                            hiddenDLC.style.display ="block";
                                            hiddenNumber.style.display ="block";
                                        } else {
                                            hiddenDLC.style.display ="none";
                                            hiddenNumber.style.display ="none";
                                        }
                                    })
									conserverOptionsSelect("fld_CS_ProductCategory", categoriesProduitAConserver)
									conserverOptionsSelect("fld_CS_Brand", marquesAConserver)
									conserverOptionsSelect("fld_CS_Packaging", conditionnementsAConserver)

                                }
								esw.forms.create({
									"solutionId": "0c10a84f8057835ce70207a572052ed66cd1a043",
									"formId": "8",
									"language": "fr",
									"buildinelement": null,
									"callback": manageDisplay
								});
							</script>
                        </div>
					</div>
				</div>
			<?php else : ?>
				<div class="padding_section">
					<div class="colsimple_contact content_width">
						<div class="colsimple_contact_left">
							<div id="coordonnees">
								<div id="coordonnees_wrapper">
									<p class="coordonnees_p_i">
										<?= apply_filters('add_svg', 'user') ?>
										<strong><?php echo "$nom" ?></strong>
									</p>
									<p class="coordonnees_p_i">
										<?= apply_filters('add_svg', 'map-marker') ?>
										<?php echo "$adresseligne1" ?><br>
										<?php echo "$adresseligne2" ?><br>
										<?php echo "$adresseligne3" ?></p>
									<p class="coordonnees_p_i">
										<?= apply_filters('add_svg', 'phone') ?>
										<?php echo "$numerodetelephone" ?></p>
									<p class="coordonnees_p_i">
										<?= apply_filters('add_svg', 'mail') ?>
										<a href="mailto:<?php echo antispambot($email); ?>"><?php echo antispambot($email); ?></a>
									</p>
								</div>
							</div>
						</div>
						<?php
						$image_sous_les_coordonnees = get_field('image_sous_les_coordonnees', 'option');
						// vars
						$url = $image_sous_les_coordonnees['url'];
						$image_sous_les_coordonnees_alt = $image_sous_les_coordonnees['alt'];
						// thumbnail
						$size_image_sous_les_coordonnees = 'medium';
						$thumb_image_sous_les_coordonnees = $image_sous_les_coordonnees['sizes'][$size_image_sous_les_coordonnees]; ?>
						<?php if ($image_sous_les_coordonnees) : ?>
							<div class="colsimple_contact_right">
								<div id="coordonnees_image">
									<?php $image_weight = apply_filters('get_weight_of_img', $thumb_image_sous_les_coordonnees); ?>
									<figure id="coordonnees_image_wrapper">
										<div class="poids-image"><?= $image_weight ?></div>
										<img src="<?php echo $thumb_image_sous_les_coordonnees; ?>" alt="<?php echo $image_sous_les_coordonnees_alt; ?>">
									</figure>
								</div>
							</div>
						<?php endif; ?>
					</div>
				</div>
			<?php endif; ?>
		</article>
		<?php get_template_part('inc/aside-actualites'); ?>
	</section>
	<?php get_footer(); ?>
</div> <!-- #global_content -->