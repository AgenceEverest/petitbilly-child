<div class="col_flexible_item">
    <?php
    $image_col_flexible = get_sub_field('image_col_flexible');
    $size_image_col_flexible = 'medium';
    $image_col_flexible_url = wp_get_attachment_image_url($image_col_flexible, $size_image_col_flexible);
    $image_weight = apply_filters('get_weight_of_img', $image_col_flexible_url);

    $ajouter_un_copyright = get_sub_field('ajouter_un_copyright');
    $adapter_a_la_hauteur_des_colonnes = get_sub_field('adapter_a_la_hauteur_des_colonnes');
    $ajouter_une_legende = get_sub_field('ajouter_une_legende');
    $proportions_de_limage = get_sub_field('proportions_de_limage');
    $ajouter_un_lien_sur_limage = get_sub_field('ajouter_un_lien_sur_limage');
    $lien_interne_image = get_sub_field('lien_interne_image');
    $lien_externe_image = get_sub_field('lien_externe_image');
    $cadre_autour_image_v1 = get_sub_field('cadre_autour_image_v1');
    $position_du_cadre = get_sub_field('position_du_cadre');
    ?>
    <div class="col_flexible_image">
        <div class="col_flexible_image_wrapper <?php echo $proportions_de_limage; ?> <?php if ($adapter_a_la_hauteur_des_colonnes) : ?>adapter_a_la_hauteur_des_colonnes<?php endif; ?><?php if (!$adapter_a_la_hauteur_des_colonnes) : ?>pas_adapter_a_la_hauteur_des_colonnes<?php endif; ?>">
            <figure class="<?php if ($cadre_autour_image_v1) : echo "cadre_autour_image";
                            endif; ?>">
                <?php if ($cadre_autour_image_v1) : ?>
                    <svg preserveAspectRatio="none" class="edge-image <?= $position_du_cadre ?>" xmlns="http://www.w3.org/2000/svg" width="513.359" height="397.989" viewBox="0 0 513.359 397.989">
                        <path id="GettyImages-812274250" d="M3931.006,1788.394c47.843,6.933,96.157.861,128.4,0s83.2,6.174,102.271,6.175c17.272-.76,102.784-7.591,116.039,0,13.681,7.589,18.383,47.057,18.383,74.38.855,20.493,4.712,254.267-4.359,293.653s-171.194,8.881-183.978,11.841-152.3,5.92-167.3,0-131.174,11.841-146.738-4.934,2.78-216.083-3.334-269.365-1.667-85.842,10.561-100.642S3931.006,1788.394,3931.006,1788.394Z" transform="translate(-3785.784 -1786.433)" fill="none" stroke="#00693e" stroke-width="3" />
                    </svg>
                <?php endif; ?>
                <div class="poids-image"><span class="poids-image-icone"><?php get_template_part('svg/symbole-feuille-nanosite'); ?></span><span class="poids-image-data"><?= $image_weight ?></span></div>
                <?php if ($ajouter_un_lien_sur_limage == "lien_interne_sur_limage") : ?><a href="<?php echo $lien_interne_image; ?>"><?php endif; ?>
                    <?php if ($ajouter_un_lien_sur_limage == "lien_externe_sur_limage") : ?><a href="<?php echo $lien_externe_image; ?>" target="_blank"><?php endif; ?>

                        <?php if ($adapter_a_la_hauteur_des_colonnes) : ?>
                            <?php echo wp_get_attachment_image($image_col_flexible, $size_image_col_flexible, "", ["class" => "image_simple_recadree"]); ?>
                        <?php else : ?>
                            <?php echo wp_get_attachment_image($image_col_flexible, $size_image_col_flexible, ""); ?>
                        <?php endif; ?>

                        <?php if ($ajouter_un_lien_sur_limage == "lien_interne_sur_limage") : ?></a><?php endif; ?>
                    <?php if ($ajouter_un_lien_sur_limage == "lien_externe_sur_limage") : ?></a><?php endif; ?>

                <?php if ($ajouter_un_copyright) : ?>
                    <p class="copyright_image"><span class="copyright_image_txt">© <?php echo $ajouter_un_copyright; ?></span><span class="copyright_image_bg"></span></p>
                <?php endif; ?>
            </figure>
            <?php if ($ajouter_une_legende) : ?><p class="ajouter_une_legende legende"><?php echo $ajouter_une_legende; ?></p><?php endif; ?>
        </div>
    </div>
</div>