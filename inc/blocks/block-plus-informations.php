<?php

/**
 * Block Name: block-plus-informations   
 *
 * This is the template that displays the block-plus-informations   
 */
if (have_rows('block_plus_informations')) : the_row(); // il s'agit du nom du champ dans ACF qui contient les sous-champs
    $cb_ajouter_une_classe_css = get_sub_field('cb_ajouter_une_classe_css');
    $ajouter_un_id_pour_le_css = get_sub_field('ajouter_un_id_pour_le_css');
    $contenu_texte = get_sub_field('contenu_texte');
    $texte_call_to_action = get_sub_field('texte_call_to_action');
    $url_de_la_page_value = get_sub_field('lien_vers_la_page');
    $url_de_la_page = $url_de_la_page_value ? get_permalink($url_de_la_page_value->ID) : '';
endif;
?>
<div class="margin_section_top  margin_section_bottom">
    <div class="vague-haut">
        <?= showSvg(get_stylesheet_directory_uri() . '/svg/vague-haut.svg') ?>
    </div>
    <div class="fond_vert_fonce block-plus-informations block">
        <div class="content_width col_flexible col_flexible_1">
            <div class="wysiwyg-content">
                <?php if (isset($contenu_texte)):
                    echo $contenu_texte;
                    endif; ?>
            </div>
            <?php if (isset($url_de_la_page)) : ?>
                <div class="cta-container cta-plus-informations">
                    <p class="cta-bloc-flex">
                        <?= showSvg(get_stylesheet_directory_uri() . '/svg/fond-cta.svg') ?>
                        <a href="<?php echo $url_de_la_page; ?>"><?php echo $texte_call_to_action; ?></a>
                    </p>
                </div>
            <?php endif; ?>
        </div>
    </div>
    <div class="vague-basse">
        <?= showSvg(get_stylesheet_directory_uri() . '/svg/vague-bas.svg') ?>
    </div>
</div>