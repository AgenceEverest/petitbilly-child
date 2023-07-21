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
    $marge_en_haut_du_bloc = get_sub_field('marge_en_haut_du_bloc');
    $marge_en_bas_du_bloc = get_sub_field('marge_en_bas_du_bloc');
    $padding_en_haut_du_bloc = get_sub_field('padding_en_haut_du_bloc');
    $padding_en_bas_du_bloc = get_sub_field('padding_en_bas_du_bloc');
endif;
?>


<?php echo "<div "; ?>
<?php if ($ajouter_un_id_pour_le_css) : echo " id='" . $ajouter_un_id_pour_le_css . "'";
endif;
echo " class='";
if ($cb_ajouter_une_classe_css) : echo " " . $cb_ajouter_une_classe_css . "";
endif;
if ($bloc_flottant) : echo " bloc_flottant ";
endif;
if ($padding_en_haut_du_bloc) : echo " padding_section_top";
endif;
if ($padding_en_bas_du_bloc) : echo " padding_section_bottom";
endif;
if ($marge_en_haut_du_bloc) : echo " margin_section_top";
endif;
if ($marge_en_bas_du_bloc) : echo " margin_section_bottom";
endif;
if ($couleur_de_fond_bloc) : echo " " . $couleur_de_fond_bloc;
endif;
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