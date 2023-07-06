<?php

/**
 * Block Name: block-beneficiez-du-reseau
 *
 * This is the template that displays the block-beneficiez-du-reseau.php
 */
if (have_rows('beneficiez_du_reseau')) : the_row(); // il s'agit du nom du champ dans ACF qui contient les sous-champs
    $cb_ajouter_une_classe_css = get_sub_field('cb_ajouter_une_classe_css');
    $ajouter_un_id_pour_le_css = get_sub_field('ajouter_un_id_pour_le_css');
    $couleur_de_fond_bloc = get_sub_field('couleur_de_fond_bloc');
    $marge_en_haut_du_bloc = get_sub_field('marge_en_haut_du_bloc');
    $marge_en_bas_du_bloc = get_sub_field('marge_en_bas_du_bloc');
    $vague_au_dessus_du_bloc = get_sub_field('vague_au_dessus_du_bloc');
    $vague_au_dessous_du_bloc = get_sub_field('vague_au_dessous_du_bloc');
    $padding_en_haut_du_bloc = get_sub_field('padding_en_haut_du_bloc');
    $padding_en_bas_du_bloc = get_sub_field('padding_en_bas_du_bloc');
    $chiffre_adherents = get_sub_field('chiffre_adherents');
    $texte_adherents = get_sub_field('texte_adherents');
    $region_grand_est = get_sub_field('region_grand_est');
    $texte_region_grand_est = get_sub_field('texte_region_grand_est');
    $titre_du_bloc = get_sub_field('titre_du_bloc');
    $faire_passer_le_bloc_au_dessus_des_autres = get_sub_field('faire_passer_le_bloc_au_dessus_des_autres');
endif;

?>
<div class="<?php if ($couleur_de_fond_bloc) : ?>
    <?php echo " " . $couleur_de_fond_bloc; ?>
<?php endif; ?>
<?php if ($marge_en_haut_du_bloc) : ?>
    <?php echo " padding_section_top"; ?>
<?php endif; ?>
<?php if ($marge_en_bas_du_bloc) : ?>
    <?php echo " padding_section_bottom"; ?>
<?php endif; ?>
">
    <?php if ($vague_au_dessus_du_bloc) : ?>
        <?= showSvg(get_stylesheet_directory_uri() . '/svg/marge_haute.svg') ?>
    <?php endif; ?>
    <?php echo "<div "; ?>
    <?php if ($ajouter_un_id_pour_le_css) : ?>
        <?php echo " id='" . $ajouter_un_id_pour_le_css . "'"; ?>
    <?php endif; ?>
    <?php echo " class='"; ?>
    <?php if ($cb_ajouter_une_classe_css) : ?>
        <?php echo " " . $cb_ajouter_une_classe_css . ""; ?>
    <?php endif; ?>

    <?php if ($padding_en_haut_du_bloc) : ?>
        <?php echo " padding_section_top"; ?>
    <?php endif; ?>
    <?php if ($padding_en_bas_du_bloc) : ?>
        <?php echo " padding_section_bottom"; ?>
    <?php endif; ?>
    <?php if ($faire_passer_le_bloc_au_dessus_des_autres) : 
            echo " z-index-1";
        endif; ?>

    <?php echo " content_width block col_flexible_wrapper beneficiez-reseau'>"; ?>
    <div class="col-1">
        <!-- Colonne 1 -->
        <?php if (have_rows('colonne_1_colonne_flexible_clonable')) : ?>
            <?php while (have_rows('colonne_1_colonne_flexible_clonable')) : the_row(); ?>
                <?php get_template_part('inc/content-builder-inc/col-flexible-block'); ?>
            <?php endwhile; ?>
        <?php endif; ?>
    </div>
    <div class="mediators">
        <div class="col-2">
            <div class="mediator-chiffre">
                <p><?= $chiffre_adherents ?></p>
                <?= showSvg(get_stylesheet_directory_uri() . '/svg/mediator-jaune.svg') ?>
            </div>

            <p><?= $texte_adherents ?></p>

        </div>
        <div class="col-3">
            <div class="mediator-chiffre">
                <p><?= $region_grand_est  ?></p>
                <?= showSvg(get_stylesheet_directory_uri() . '/svg/mediator-rouge.svg') ?>
            </div>

            <p><?= $texte_region_grand_est ?></p>
        </div>
    </div>

    <?php if ($vague_au_dessous_du_bloc) : ?>
        <?= showSvg(get_stylesheet_directory_uri() . '/svg/marge_basse.svg') ?>
    <?php endif; ?>
</div>
</div>