<?php
$cb_calltoaction_interne_externe = get_sub_field('lien_interne_ou_externe_');
$cb_calltoaction_lien = get_sub_field('cb_call-to-action_lien');
$alignement_du_bouton = get_sub_field('alignement_du_bouton');
$style_du_bouton = get_sub_field('style_du_bouton');
$cb_calltoaction_url = get_sub_field('cb_call-to-action_url');
$cb_calltoaction_fichier = get_sub_field('cb_call-to-action_fichier');
$cb_calltoaction_fichier_size = filesize(get_attached_file($cb_calltoaction_fichier));
$cb_calltoaction = get_sub_field('cb_call-to-action');
$ouvrir_dans_un_nouvel_onglet = get_sub_field('ouvrir_dans_un_nouvel_onglet');
$url_de_la_page_contact = get_field('url_de_la_page_contact', 'option');
$url_de_la_page_contact = get_permalink($url_de_la_page_contact->ID);
$url = '';
switch ($cb_calltoaction_interne_externe) {
    case 'page_contact':
        $url = $url_de_la_page_contact;
        break;
    case 'lien_interne':
        $url = $cb_calltoaction_lien;
        break;
    case 'lien_externe':
        $url = $cb_calltoaction_url;
        break;
    case 'fichier_telechargement':
        $url = $cb_calltoaction_fichier;
    default:
        break;
}
?>
<?php if (isset($url) && strlen($cb_calltoaction) > 0) : ?>
    <div class="cta-container <?php echo $alignement_du_bouton; ?>">
        <p class="cta-bloc-flex <?php echo $style_du_bouton; ?>">
            <?php if ($cb_calltoaction_interne_externe !== 'fichier_telechargement') : ?>
                <?= showSvg(get_stylesheet_directory_uri() . '/svg/fond-cta.svg') ?>
                <a href="<?php echo $url; ?>" <?php if ($ouvrir_dans_un_nouvel_onglet) : ?> target="_blank" <?php endif; ?>><?php echo $cb_calltoaction; ?></a>
            <?php else : ?>
                <?= showSvg(get_stylesheet_directory_uri() . '/svg/fond-cta.svg') ?>
                <a href="<?= wp_get_attachment_url($cb_calltoaction_fichier); ?>" <?php if ($ouvrir_dans_un_nouvel_onglet) : ?> target="_blank" <?php endif; ?>>
                    <?= showSvg(get_stylesheet_directory_uri() . '/svg/arrow-download.svg') ?>
                    <?php echo $cb_calltoaction; ?>
                    <span class="download_doc_size">- <?php echo size_format($cb_calltoaction_fichier_size, $decimals = 0); ?></span>
                </a>
            <?php endif; ?>
        </p>
    </div>

<?php endif; ?>