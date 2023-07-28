<div class="valeurs-nutritionnelles">
    <?php
    $titre_valeurs_nutritionnelles = get_sub_field('titre_valeurs_nutritionnelles');
    $sousTitreValeurs = get_sub_field('sous_titre_valeurs_nutritionnelles'); 
    $first_element_green = get_sub_field('first_element_green'); ?>
    <h2><?= $titre_valeurs_nutritionnelles ?></h2>
    <p><?= $sousTitreValeurs ?></p>
    <?php if (have_rows('tableau_valeurs_nutritionnelles')) : ?>
        <ul class="<?= $first_element_green ? "first-element-green" : "" ?>">
            <?php while (have_rows('tableau_valeurs_nutritionnelles')) : the_row(); ?>
                <li><span class="valeur-nutritionnelle-nom">
                        <?= get_sub_field('valeur_nutritionnelle_nom'); ?>
                    </span><span class="valeur-nutritionnelle">
                        <?= get_sub_field('valeur_nutritionnelle') ?> <?= get_sub_field('unite_grammage') ?>
                    </span>
                </li>
            <?php endwhile; ?>
        </ul>
    <?php endif; ?>
</div>