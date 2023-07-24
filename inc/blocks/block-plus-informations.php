<?php

/**
 * Block Name: block-plus-informations   
 *
 * This is the template that displays the 1-colonnes-texte block.
 */
if (have_rows('block_plus_informations')) : the_row(); // il s'agit du nom du champ dans ACF qui contient les sous-champs
    $cb_ajouter_une_classe_css = get_sub_field('cb_ajouter_une_classe_css');
    $ajouter_un_id_pour_le_css = get_sub_field('ajouter_un_id_pour_le_css');
    $contenu_texte = get_sub_field('contenu_texte');
    $texte_call_to_action = get_sub_field('texte_call_to_action');
    $url_page_contact = get_field('url_de_la_page_contact', 'option');
    $url_page_contact = $url_page_contact ? get_permalink($url_page_contact->ID) : '';
endif;
?>
<div class="margin_section_top  margin_section_bottom">
    <div class="vague-haut">
        <?= showSvg(get_stylesheet_directory_uri() . '/svg/vague-haut.svg') ?>
    </div>
    <div class="fond_vert_fonce block-plus-informations block">
        <div class="content_width col_flexible col_flexible_1">
            <div class="wysiwyg-content">
                <?= $contenu_texte ? $contenu_texte : ''; ?>
            </div>
            <?php if ($url_page_contact) : ?>
                <div class="cta-container cta-plus-informations">
                    <p class="cta-bloc-flex">
                        <?= showSvg(get_stylesheet_directory_uri() . '/svg/fond-cta.svg') ?>
                        <a href="<?php echo $url_page_contact; ?>"><?php echo $texte_call_to_action; ?></a>
                    </p>
                </div>
            <?php endif; ?>
        </div>
    </div>
    <div class="vague-basse">
        <?= showSvg(get_stylesheet_directory_uri() . '/svg/vague-bas.svg') ?>
    </div>
</div>