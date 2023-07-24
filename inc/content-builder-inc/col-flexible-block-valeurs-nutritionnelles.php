<div class="valeurs-nutritionnelles">
    <?php
    $titre_valeurs_nutritionnelles = get_sub_field('titre_valeurs_nutritionnelles');
    $sousTitreValeurs = get_sub_field('sous_titre_valeurs_nutritionnelles'); ?>
    <h2><?= $titre_valeurs_nutritionnelles ?></h2>
    <p><?= $sousTitreValeurs ?></p>
    <?php if (have_rows('tableau_valeurs_nutritionnelles')) : ?>
        <ul>
            <?php while (have_rows('tableau_valeurs_nutritionnelles')) : the_row(); ?>
                <li><span class="valeur-nutritionnelle-nom">
                        <?= get_sub_field('valeur_nutritionnelle_nom'); ?>
                    </span><span class="valeur-nutritionnelle">
                        <?= get_sub_field('valeur_nutritionnelle') ?>
                    </span>
                </li>
            <?php endwhile; ?>
        </ul>
    <?php endif; ?>
</div>