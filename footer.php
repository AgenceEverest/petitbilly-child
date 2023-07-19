<?php get_template_part('inc/pre-footer'); ?>
<?php $masquer_cookies = get_field("masquer_cookies", "option"); ?>
<?php if ($masquer_cookies) : ?>
    <div id="bandeau_cookies" tabindex="1">
        <a tabindex="0" href="#global_content" class="skip_to_global_content">Passer au contenu principal</a>
        <div id="bandeau_content">
            <?php $nomCookies = get_field('nom_du_cookie', 'option'); ?>
            <?php $texte_du_bandeau_cookies_ligne_1 = get_field('texte_du_bandeau_cookies_ligne_1', 'option'); ?>
            <?php $texte_du_bandeau_cookies_ligne_2 = get_field('texte_du_bandeau_cookies_ligne_2', 'option'); ?>
            <?php $duree_du_cookies = get_field('duree_du_cookies', 'option'); ?>
            <?php $duree_reapparition_bandeau = get_field('duree_reapparition_bandeau', 'option'); ?>
            <?php if ($texte_du_bandeau_cookies_ligne_1) : ?>
                <?php $url_mentions_legales = get_field('url_mentions_legales', 'option'); ?>
                <p tabindex="0" class="texte_bandeau_cookies" id="ligne_1_bandeau_cookies"><?php echo $texte_du_bandeau_cookies_ligne_1; ?></p>
                <a tabindex="0" id="lien_texte_bandeau_cookie_ligne_2" target="_blank" href="<?php echo $url_mentions_legales ?>">
                    <p class="texte_bandeau_cookies"><?php echo $texte_du_bandeau_cookies_ligne_2; ?></p>
                </a>
                <?php $accepter_cookies_selectionnes = get_field('accepter_cookies_selectionnes', 'option'); ?>
                <?php $accepter_tous_cookies = get_field('accepter_tous_cookies', 'option'); ?>
                <?php $refuser_cookies = get_field('refuser_cookies', 'option'); ?>
                <?php $en_savoir_plus_cookies = get_field('en_savoir_plus_cookies', 'option'); ?>
                <?php $choisir_lesquels_cookies = get_field('choisir_lesquels_cookies', 'option'); ?>
                <?php $retour_texte = get_field('retour_texte', 'option'); ?>
                <p id="boutons_bandeau" class="cta_btn_lead"><a tabindex="0" id="choisir_lesquels_cookies"><?php echo $choisir_lesquels_cookies; ?></a><a tabindex="0" id="refuser_cookies"><?php echo $refuser_cookies; ?></a><a tabindex="0" id="accepter_cookies"><?php echo $accepter_tous_cookies; ?></a>
                </p>
            <?php endif; ?>
        </div>
    </div>
    <div tabindex="0" id="choisir_les_cookies">
        <div id="choisir_les_cookies_content">
            <p tabindex="0" id="texte_choisir_les_cookies"><?= get_field('texte_choisir_les_cookies', 'option') ?></p>
            <?php
            if ((get_field('google_analytics', 'option')) || (get_field('google_analytics_noscript', 'option'))) {
            ?>
                <div class="switch_choisir_les_cookies">
                    <label tabindex="0" for="google_analytics_switch"><?= get_field('google_analytics_switch_label', 'option') ?></label>
                    <div tabindex="-1" id="google_analytics_switch_label" class="switch">
                        <input tabindex="-1" name="google_analytics_switch" id="google_analytics_switch" type="checkbox">
                        <label tabindex="-1" for="google_analytics_switch" class="slider round"></label>
                    </div>
                </div>
            <?php
            }
            ?>
            <?php
            if (get_field('google_ads', 'option')) {
            ?>
                <br aria-hidden="true" style="height: 0;position:absolute;"> <!-- nécessaire pour que les labels en dessous soient bien lus par les outils d'accessibilité -->
                <div class="switch_choisir_les_cookies">
                    <label tabindex="0" for="google_ads_switch"><?= get_field('google_ads_switch_label', 'option') ?></label>
                    <div tabindex="-1" id="google_ads_switch_label" class="switch">
                        <input tabindex="-1" name="google_ads_switch" id="google_ads_switch" type="checkbox">
                        <label tabindex="-1" for="google_ads_switch" class="slider round"></label>
                    </div>
                </div>
            <?php
            }
            ?>
            <?php
            if (get_field('pixel_facebook', 'option')) {
            ?>
                <br aria-hidden="true" style="height: 0;position:absolute;"> <!-- nécessaire pour que les labels en dessous soient bien lus par les outils d'accessibilité -->
                <div class="switch_choisir_les_cookies">
                    <label tabindex="0" for="pixel_facebook_switch"><?= get_field('facebook_switch_label', 'option') ?></label>
                    <div tabindex="-1" id="pixel_facebook_switch_label" class="switch">
                        <input tabindex="-1" name="pixel_facebook_switch" id="pixel_facebook_switch" type="checkbox">
                        <label tabindex="-1" for="pixel_facebook_switch" class="slider round"></label>
                    </div>
                </div>
            <?php
            }
            ?>
            <div class="choisir_les_cookies_boutons">
                <p class="cta_btn_lead">
                    <a tabindex="0" id="retour_texte"><?php echo $retour_texte ?></a><a tabindex="0" id="accepter_cookies_selectionnes"><?php echo $accepter_cookies_selectionnes; ?></a>
                </p>
            </div>
        </div>
    </div>
<?php endif; ?>


<footer id="footer">
    <div id="footer_wrapper">
        <p id="footer_content" class="legende">
            <span>
                <?php $signature_footer = get_field('signature_footer', 'option'); ?>
                © <?php echo date("Y") ?> <?php bloginfo('name'); ?>
            </span>
            <span id="menu-footer">
                <?php $menuParameters = array(
                    'theme_location'  => 'menu-footer-gauche',
                    'container'       => false,
                    'echo'            => false,
                    'items_wrap'      => '%3$s',
                    'depth'           => 0,
                );
                echo strip_tags(wp_nav_menu($menuParameters), '<a>'); ?>
            </span>
        </p>
    </div>
    <div id="retourenhaut">
        <svg id="retourenhaut_svg" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
            <rect class="cls-1" width="40" height="40" />
            <circle id="circle_base" class="cls-2" cx="20" cy="20" r="18" />
            <g>
                <line class="cls-3" x1="20" y1="30.67" x2="20" y2="10.67" />
                <polyline class="cls-3" points="12.46 18.21 20 10.67 27.54 18.21" />
            </g>
            <circle id="circle_progress" class="cls-3" cx="20" cy="20" r="18" transform="rotate(-90 20 20)" />
        </svg>
    </div>

    <?php get_template_part('inc/nanosite-label'); ?>

</footer>
<div class="wrapper_prefooter_footer_svg"></div>

<?php get_template_part('inc/css-compil-footer') ?>
<script>
    let cookieName = '<?= htmlspecialchars($nomCookies) ?>';
    let cookieDuration = '<?= htmlspecialchars($duree_du_cookies) ?>';
    let durationRefused = '<?= htmlspecialchars($duree_reapparition_bandeau) ?>';
</script>
<?php wp_footer(); ?>