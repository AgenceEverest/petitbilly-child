<?php

/**
 * Block Name: block-grabuge-vous-accompagne
 */
if (have_rows('block_grabuge_vous_accompagne')) : the_row();

	$cb_ajouter_une_classe_css = get_sub_field('cb_ajouter_une_classe_css');
	$ajouter_un_id_pour_le_css = get_sub_field('ajouter_un_id_pour_le_css');
	$couleur_de_fond_bloc = get_sub_field('couleur_de_fond_bloc');
	$marge_en_haut_du_bloc = get_sub_field('marge_en_haut_du_bloc');
	$marge_en_bas_du_bloc = get_sub_field('marge_en_bas_du_bloc');
	$padding_en_haut_du_bloc = get_sub_field('padding_en_haut_du_bloc');
    $padding_en_bas_du_bloc = get_sub_field('padding_en_bas_du_bloc');
	$elements_grabuge_vous_accompagne = get_sub_field('elements_grabuge_vous_accompagne');
	$texte_du_bloc = get_sub_field('texte_du_bloc');
	$couleur_de_la_vague = get_sub_field('couleur_de_la_vague');
	$faire_passer_le_bloc_au_dessus_des_autres = get_sub_field('faire_passer_le_bloc_au_dessus_des_autres');
endif; ?>
<div <?php if ($ajouter_un_id_pour_le_css) : echo "id='" . $ajouter_un_id_pour_le_css . "' ";
endif;
echo 'class= "grabuge-accompagne-block ';
if ($cb_ajouter_une_classe_css) : echo $cb_ajouter_une_classe_css . ' ';
endif;
if ($marge_en_haut_du_bloc) : echo ' ' . 'padding_section_top';
endif;
if ($marge_en_bas_du_bloc) : echo ' ' . 'padding_section_bottom';
endif;
if ($couleur_de_fond_bloc) : echo ' ' . $couleur_de_fond_bloc;
endif;
if ($couleur_de_la_vague) : echo ' ' . $couleur_de_la_vague;
endif;
if ($faire_passer_le_bloc_au_dessus_des_autres) : echo " z-index-1";
endif;
echo '"'; ?>>
		<div class="	
		<?php if ($padding_en_haut_du_bloc) : ?>
			<?php echo " padding_section_top"; ?>
		<?php endif; ?>
		<?php if ($padding_en_bas_du_bloc) : ?>
			<?php echo " padding_section_bottom "; ?>
		<?php endif; ?>
		block">
			<div class="cards content_width">
				<p><?= $texte_du_bloc ?></p>
				<div class="cards-container">
					<?php if ($elements_grabuge_vous_accompagne): ?>
						<?php foreach ($elements_grabuge_vous_accompagne as $element):
							$fields = get_fields($element->ID);
							$lienSVG =  isset($fields['icone_grabuge_vous_accompagne']['url']) ? $fields['icone_grabuge_vous_accompagne']['url'] : '';
							$titreIconeGrabuge = $fields['titre_icone_grabuge_accompagne'] ? $fields['titre_icone_grabuge_accompagne'] : '';
							$descriptionIconeGrabuge = $fields['description_icone_grabuge_accompagne'] ? $fields['description_icone_grabuge_accompagne'] : '';
							$lienVersLaPage = $fields['lien_vers_la_page'] ? $fields['lien_vers_la_page'] : '';
							?>
							<div class="grabuge-accompagne-card">
								<div class="icone-grabuge-accompagne">
									<a href="<?= $lienVersLaPage ?>"><?= $lienSVG ? showSvg($lienSVG) : '' ?></a>
								</div>
								<h3><a href="<?= $lienVersLaPage ?>"><?= $titreIconeGrabuge ?></a></h3>
								<p><a href="<?= $lienVersLaPage ?>"><?= $descriptionIconeGrabuge ?></a></p>
							</div>
						<?php endforeach; ?>
					<?php endif; ?>
				</div>
			</div>
		</div>
		<?= showSvg(get_stylesheet_directory_uri() . '/svg/grande-vague-accueil.svg') ?>
</div>

