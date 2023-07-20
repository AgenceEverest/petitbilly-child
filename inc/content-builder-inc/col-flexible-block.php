<!-- Bloc de texte -->
<?php if (get_row_layout() == 'bloc_de_texte') : ?>
    <?php get_template_part('inc/content-builder-inc/col-flexible-block-texte'); ?>
<?php endif; ?>

<!-- Bloc de texte icône -->
<?php if (get_row_layout() == 'bloc_de_texte_icone') : ?>
    <?php get_template_part('inc/content-builder-inc/col-flexible-block-texte-icone'); ?>
<?php endif; ?>

<!-- Bloc image -->
<?php if (get_row_layout() == 'bloc_image') : ?>
    <?php get_template_part('inc/content-builder-inc/col-flexible-block-image'); ?>
<?php endif; ?>


<!-- Bloc citation -->
<?php if (get_row_layout() == 'bloc_de_citation') : ?>
    <?php get_template_part('inc/content-builder-inc/col-flexible-block-citation'); ?>
<?php endif; ?>

<!-- Bloc vidéo -->
<?php if (get_row_layout() == 'bloc_de_video') : ?>
    <?php get_template_part('inc/content-builder-inc/col-flexible-block-video'); ?>
<?php endif; ?>

<!-- Bloc questions réponses -->
<?php if (get_row_layout() == 'bloc_de_questions_reponses') : ?>
    <?php get_template_part('inc/content-builder-inc/col-flexible-block-questions-reponses'); ?>
<?php endif; ?>

<!-- Bloc téléchargement de fichiers -->
<?php if (get_row_layout() == 'bloc_de_telechargement_de_fichiers') : ?>
    <?php get_template_part('inc/content-builder-inc/col-flexible-block-telechargement-de-fichiers'); ?>
<?php endif; ?>

<!-- Bloc liste d'icônes -->
<?php if (get_row_layout() == 'bloc_liste_icones') : ?>
    <?php get_template_part('inc/content-builder-inc/col-flexible-block-liste-icones'); ?>
<?php endif; ?>

<!-- Bloc liste garanties valeurs nutritonnelles -->
<?php if (get_row_layout() == 'bloc_valeurs_nutritionnelles') : ?>
    <?php get_template_part('inc/content-builder-inc/col-flexible-block-valeurs-nutritionnelles'); ?>
<?php endif; ?>