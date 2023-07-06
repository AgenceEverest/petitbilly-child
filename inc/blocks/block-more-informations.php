<?php

/**
 * Block Name: block-more-informations 
 *
 * This is the template that displays block-more-informations.
 */
if (have_rows('block_more_informations')) : the_row(); // il s'agit du nom du champ dans ACF qui contient les sous-champs
    $cb_ajouter_une_classe_css = get_sub_field('cb_ajouter_une_classe_css');
    $ajouter_un_id_pour_le_css = get_sub_field('ajouter_un_id_pour_le_css');
    $texte_du_bloc = get_sub_field('texte_du_bloc');
    $bloc_flottant = get_sub_field('bloc_flottant');
    $text_call_to_action = get_sub_field('cb_call-to-action');
    $couleur_de_fond_bloc = get_sub_field('couleur_de_fond_bloc');
    $url_bouton_contact = get_field('url_du_bouton_contact', 'option');
    $texte_bouton_contact = get_field('texte_du_bouton_contact', 'option');
    $faire_passer_le_bloc_au_dessus_des_autres = get_sub_field('faire_passer_le_bloc_au_dessus_des_autres');
endif;
?>


<?php echo "<div "; ?>
<?php if ($ajouter_un_id_pour_le_css) : ?>
    <?php echo " id='" . $ajouter_un_id_pour_le_css . "'"; ?>
<?php endif; ?>
<?php echo " class='"; ?>
<?php if ($cb_ajouter_une_classe_css) : ?>
    <?php echo " " . $cb_ajouter_une_classe_css . ""; ?>
<?php endif; ?>
<?php if ($bloc_flottant) : ?>
    <?php echo " bloc_flottant "; ?>
<?php endif; ?>
<?php if ($couleur_de_fond_bloc) : ?>
    <?php echo " " . $couleur_de_fond_bloc; ?>
<?php endif; ?>
<?php
if ($faire_passer_le_bloc_au_dessus_des_autres) :
    echo " z-index-1";
endif;
?>
<?php echo " more_informations'>"; ?>
<?php get_template_part('inc/dessin-en-fond'); ?>
<div class="block">
    <div class="content_width padding_section">
        <?php $largeur_de_la_colonne_contenu = get_sub_field('largeur_de_la_colonne_contenu'); ?>
        <!-- Les 2 colonnes -->
        <div class="text_block">
            <?= $texte_du_bloc ?>
        </div>

        <!-- Lien page contact pré-remplie -->
        <p class="cta_btn_lead cta_primaire anim_bottom_top"><a href="<?php echo $url_bouton_contact ? $url_bouton_contact : '' ?>"><?php echo $texte_bouton_contact ? $texte_bouton_contact : '' ?></a></p>
    </div>
</div><!-- colonnes -->
</div>