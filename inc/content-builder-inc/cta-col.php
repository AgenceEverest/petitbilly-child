<?php
$cb_calltoaction_interne_externe_col = get_sub_field('lien_interne_ou_externe_col');
$cb_calltoaction_lien_col = get_sub_field('cb_call-to-action_lien_col');
$alignement_du_bouton = get_sub_field('alignement_du_bouton');
$style_du_bouton = get_sub_field('style_du_bouton');
$cb_calltoaction_url_col = get_sub_field('cb_call-to-action_url_col');
$cb_calltoaction_fichier_col = get_sub_field('cb_call-to-action_fichier_col');
$cb_calltoaction_col = get_sub_field('cb_call-to-action_col');
$ouvrir_dans_un_nouvel_onglet_col = get_sub_field('ouvrir_dans_un_nouvel_onglet_col');
$url_de_la_page_contact_col = get_field('url_de_la_page_contact', 'option');
$url_de_la_page_contact_col = get_permalink($url_de_la_page_contact_col->ID);
$url = '';
switch ($cb_calltoaction_interne_externe_col) {
    case 'page_contact':
        $url = $url_de_la_page_contact_col;
        break;
    case 'lien_interne':
        $url = $cb_calltoaction_lien_col;
        break;
    case 'lien_externe':
        $url = $cb_calltoaction_url_col;
        break;
    case 'fichier_telechargement':
        $url = $cb_calltoaction_fichier_col;
    default:
        break;
}
?>
<?php if (isset($url) && strlen($cb_calltoaction_col) > 0) : ?>
    <div class="cta-container  <?php echo $alignement_du_bouton; ?>">
        <p class="cta-bloc-flex <?php echo $style_du_bouton; ?>">
            <?php if ($cb_calltoaction_interne_externe_col !== 'fichier_telechargement') : ?>
                <?= showSvg(get_stylesheet_directory_uri() . '/svg/fond-cta.svg') ?>
                <a href="<?php echo $url; ?>" <?php if ($ouvrir_dans_un_nouvel_onglet_col) : ?> target="_blank" <?php endif; ?>><?php echo $cb_calltoaction_col; ?></a>
            <?php else : ?>
                <?= showSvg(get_stylesheet_directory_uri() . '/svg/fond-cta.svg') ?>
                <a href="<?= $url['url']; ?>" <?php if ($ouvrir_dans_un_nouvel_onglet_col) : ?> target="_blank" <?php endif; ?>>
                    <?= showSvg(get_stylesheet_directory_uri() . '/svg/arrow-download.svg') ?>
                    <?php echo $cb_calltoaction_col; ?>
                    <span class="download_doc_size">- <?php echo size_format($url['filesize'], $decimals = 0); ?></span>
                </a>
            <?php endif; ?>
        </p>
    </div>
<?php endif; ?>