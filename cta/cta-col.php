<?php $cb_calltoaction_col = get_sub_field('cb_call-to-action_col');
$cb_calltoaction_lien_col = get_sub_field('cb_call-to-action_lien_col');
$cb_calltoaction_url_col = get_sub_field('cb_call-to-action_url_col');
$cb_calltoaction_fichier_col = get_sub_field('cb_call-to-action_fichier_col');
$cb_calltoaction_fichier_col_size = filesize(get_attached_file($cb_calltoaction_fichier_col));
$cb_calltoaction_interne_externe_col = get_sub_field('lien_interne_ou_externe_col');
$ouvrir_dans_un_nouvel_onglet_col = get_sub_field('ouvrir_dans_un_nouvel_onglet_col');
$alignement_du_bouton = get_sub_field('alignement_du_bouton');
$style_du_bouton = get_sub_field('style_du_bouton'); ?>

<!-- Lien page contact pré-remplie -->
<?php if ($cb_calltoaction_interne_externe_col == 'page_contact') : ?>
    <?php get_template_part('inc/content-builder-inc/cb-form-to-prefilled-form-col'); ?>
<?php endif; ?>

<!-- Lien interne  -->
<?php if ($cb_calltoaction_interne_externe_col == 'lien_interne') : ?>
    <?php if ($cb_calltoaction_lien_col) : ?>
        <p class="cta_btn_lead <?php echo $alignement_du_bouton; ?> <?php echo $style_du_bouton; ?>"><a href="<?php echo $cb_calltoaction_lien_col; ?>" <?php if ($ouvrir_dans_un_nouvel_onglet_col) : ?> target="_blank" <?php endif; ?>><?php echo $cb_calltoaction_col; ?></a></p>
    <?php endif; ?>
<?php endif; ?>

<!-- Lien externe  -->
<?php if ($cb_calltoaction_interne_externe_col == 'lien_externe') : ?>
    <?php if ($cb_calltoaction_url_col) : ?>
        <p class="cta_btn_lead <?php echo $alignement_du_bouton; ?> <?php echo $style_du_bouton; ?>"><a href="<?php echo $cb_calltoaction_url_col; ?>" <?php if ($ouvrir_dans_un_nouvel_onglet_col) : ?> target="_blank" <?php endif; ?>><?php echo $cb_calltoaction_col; ?></a></p>
    <?php endif; ?>
<?php endif; ?>

<!-- Fichier à télécharger  -->
<?php if ($cb_calltoaction_interne_externe_col == 'fichier_telechargement') : ?>
    <?php if ($cb_calltoaction_fichier_col) : ?>
        <p class="cta_btn_lead <?php echo $alignement_du_bouton; ?> <?php echo $style_du_bouton; ?>"><a href="<?php echo $cb_calltoaction_fichier_col; ?>" <?php if ($ouvrir_dans_un_nouvel_onglet_col) : ?> target="_blank" <?php endif; ?>><?php get_template_part('inc/arrow-download'); ?><?php echo $cb_calltoaction_col; ?> <span class="download_doc_size">- <?php echo size_format($cb_calltoaction_fichier_col_size, $decimals = 0); ?></span></a></p>
    <?php endif; ?>
<?php endif; ?>