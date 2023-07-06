<?php

/**
 * Block Name: block-iframe-async
 *
 * This is the template that displays the block-iframe-async block.
 */
if (have_rows('block_iframe_async')) : the_row(); // il s'agit du nom du champ dans ACF qui contient les sous-champs
	$cb_ajouter_une_classe_css = get_sub_field('cb_ajouter_une_classe_css');
	$ajouter_un_id_pour_le_css = get_sub_field('ajouter_un_id_pour_le_css');
	$ajouter_un_fond_clair = get_sub_field('ajouter_un_fond_clair');
	$marge_en_haut_du_bloc = get_sub_field('marge_en_haut_du_bloc');
	$marge_en_bas_du_bloc = get_sub_field('marge_en_bas_du_bloc');
	$cb_calltoaction = get_sub_field('cb_call-to-action');
	$dataLink = get_sub_field('data_link');
	$faire_passer_le_bloc_au_dessus_des_autres = get_sub_field('faire_passer_le_bloc_au_dessus_des_autres');
endif;
?>
<?php echo "<div "; ?>
<?php if ($ajouter_un_id_pour_le_css) : ?>
	<?php echo " id='" . $ajouter_un_id_pour_le_css . "'"; ?>
<?php endif; ?>
<?php echo " class='"; ?>
<?php if ($marge_en_haut_du_bloc) : ?>
	<?php echo " padding_section_top"; ?>
<?php endif; ?>
<?php if ($marge_en_bas_du_bloc) : ?>
	<?php echo " padding_section_bottom"; ?>
<?php endif; ?>
<?php if ($ajouter_un_fond_clair) : ?>
	<?php echo " fond_clair"; ?>
<?php endif; ?>
<?php if ($cb_ajouter_une_classe_css) : ?>
	<?php echo " " . $cb_ajouter_une_classe_css . ""; ?>
<?php endif; ?>
<?php if ($faire_passer_le_bloc_au_dessus_des_autres) : 
		echo " z-index-1";
	endif; ?>
<?php echo "'>"; ?>
	<div class="content_width">
		<div class="bloc_iframe_video_texte entry-content anim_top_bottom">
			<?php the_sub_field('accroche_texte_avant_la_video'); ?>
		</div>
		<div id="cta-iframe" class="bloc_iframe_video_cta">
			<?php if ($cb_calltoaction) : ?>
				<div class="button-container">
					<p><?= $cb_calltoaction ?></p>
					<label id="show_iframe" for="iframe_switch" class="switch">
						<input data-link="<?= $dataLink ?>" name="iframe_switch" id="iframe_switch" type="checkbox">
						<span class="slider round"><span class="off-slider"></span></span>
					</label>
				</div>
			
			<?php endif; ?>
		</div>
		<div id="iframe-wrapper" class="anim_bottom_top">
  			<iframe id="iframe-container"  width="640" height="480"></iframe>
		</div>
	</div>
</div>
