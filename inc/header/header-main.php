<?php $laisser_le_menu_mobile_disponible_sur_la_version_desktop = get_field('laisser_le_menu_mobile_disponible_sur_la_version_desktop', 'option'); ?>

<div id="content_nav_header" <?php if (!$laisser_le_menu_mobile_disponible_sur_la_version_desktop) : ?> class="content_nav_header_noburger" <?php endif; ?>>
    <nav id='menu_header' class="content_hide_menu content_hide_menu_search">
        <div id="menu_header_wrapper">
            <?php
            $defaultsmenuprincipal = array(
                'theme_location'  => 'menu-principal',
                'menu'            => '',
                'container'       => false,
                'container_class' => '',
                'container_id'    => '',
                'menu_class'      => 'menu',
                'menu_id'         => '',
                'echo'            => true,
                'fallback_cb'     => '',
                'before'          => '',
                'after'           => '',
                'link_before'     => '',
                'link_after'      => '',
                'items_wrap'      => '<ul id="%1$s" class="%2$s">%3$s</ul>',
                'depth'           => 0,
                'walker'          => ''
            );
            wp_nav_menu($defaultsmenuprincipal);
            ?>
        </div>
    </nav>
    <?php $afficher_le_bouton_dappel_dans_le_header = get_field('afficher_le_bouton_dappel_dans_le_header', 'option'); ?>
    <?php $texte_du_bouton_dappel = get_field('texte_du_bouton_dappel', 'option'); ?>

    <?php if ($afficher_le_bouton_dappel_dans_le_header) : ?>
        <div id="header_phone" class="content_hide_menu content_hide_menu_search">
            <p class="cta_btn_lead cta_btn_phone">
                <?php $numerodetelephone = get_field('numero_de_telephone', 'option'); ?>
                <span class="cta_btn_phone_click cta_btn_phone_off"><span>
                        <?php echo "$texte_du_bouton_dappel" ?>
                    </span></span>
                <span class="cta_btn_phone_on"><a href="tel:<?php echo "$numerodetelephone" ?>">
                        <?php echo "$numerodetelephone" ?></a></span>
            </p>
        </div>
    <?php endif; ?>

    <div id="header_contact" class="content_hide_menu content_hide_menu_search">
        <?php $texte_du_bouton_contact = get_field('texte_du_bouton_contact', 'option'); ?>
        <?php $url_du_bouton_contact = get_field('url_du_bouton_contact', 'option'); ?>
        <div class="cta-container">
			<p class="cta-bloc-flex cta_primaire">
					<?= showSvg(get_stylesheet_directory_uri() . '/svg/fond-contact.svg') ?>
				<a href="<?php echo "$url_du_bouton_contact" ?>"><?php echo "$texte_du_bouton_contact" ?></a>
			</p>
		</div>
    </div>
    <div id="search_trigger" class="content_hide_menu">
        <?= showSvg(get_stylesheet_directory_uri() . '/svg/search.svg') ?>
 <!--        <svg id="search_icon" class="search_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
            <circle class="search_icon_cls" cx="33.97" cy="34.97" r="28.47" />
            <line class="search_icon_cls" x1="74" y1="75" x2="53.9" y2="54.9" />
        </svg> -->
        <svg id="search_icon_close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
            <line class="search_icon_cls" x1="74" y1="75" x2="5.5" y2="6.5" />
            <line class="search_icon_cls" x1="5.5" y1="75" x2="74" y2="6.5" />
        </svg>
    </div>
    <nav tabindex="0" id="menu_mobile_trigger" <?php if (!$laisser_le_menu_mobile_disponible_sur_la_version_desktop) : ?> class="menu_mobile_trigger_noburger" <?php endif; ?><?php if ($laisser_le_menu_mobile_disponible_sur_la_version_desktop) : ?> class="content_hide_menu_search" <?php endif; ?>>
        <?= showSvg(get_stylesheet_directory_uri() . '/svg/menu-burger.svg') ?>

        <!--         <div id="burger">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div> -->
    </nav>
</div>
</header>
<?php $multilingue_traductions = get_field('multilingue_traductions', 'option'); ?>
<div id="header_back" <?php if ($multilingue_traductions) : ?> class="multilingue_header" <?php endif; ?>></div>
<nav id='menu'>
    <div id="menu_content">
        <div class="content_width_wrapper_menu">
            <?php
            $defaultsmenumobile = array(
                'theme_location'  => 'menu-mobile',
                'menu'            => '',
                'container'       => false,
                'container_class' => '',
                'container_id'    => '',
                'menu_class'      => 'menu',
                'menu_id'         => '',
                'echo'            => true,
                'fallback_cb'     => '',
                'before'          => '',
                'after'           => '',
                'link_before'     => '',
                'link_after'      => '',
                'items_wrap'      => '<ul id="%1$s" class="%2$s">%3$s</ul>',
                'depth'           => 0,
                'walker'          => ''
            );
            wp_nav_menu($defaultsmenumobile); ?>
            <?php $page_facebook = get_field('page_facebook', 'option'); ?>
            <?php $page_twitter = get_field('page_twitter', 'option'); ?>
            <?php $page_linkedin = get_field('page_linkedin', 'option'); ?>
            <?php $page_instagram = get_field('page_instagram', 'option'); ?>
            <?php $accroche_menu_mobile_suiveznous = get_field('accroche_menu_mobile_suiveznous', 'option'); ?>
            <?php if ($page_facebook || $page_twitter || $page_linkedin || $page_instagram) : ?>
                <p id="burger_rs_accroche"><?php echo $accroche_menu_mobile_suiveznous; ?></p>
                <?php get_template_part('inc/reseaux-sociaux'); ?>
            <?php endif; ?>
        </div>
    </div>
</nav>
<?php $multilingue_traductions = get_field('multilingue_traductions', 'option'); ?>
<div id="search_box" <?php if ($multilingue_traductions) : ?> class="multilingue_header" <?php endif; ?>>
    <div id="search_box_wrapper" class="content_width">
        <?php $rechercher_sur_le_site = get_field('rechercher_sur_le_site', 'option'); ?>
        <label for="s" style="opacity: 0; height: 0"><?php if ($rechercher_sur_le_site) : ?><?php echo $rechercher_sur_le_site; ?><?php endif; ?></label>
        <?php get_search_form(); ?>
        <div id="search_input_trigger">
            <svg class="search_icon" id="search_icon_opened" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
                <circle class="search_icon_cls" cx="33.97" cy="34.97" r="28.47" />
                <line class="search_icon_cls" x1="74" y1="75" x2="53.9" y2="54.9" />
            </svg>
        </div>
    </div>
</div>
<div id='menu_mask'></div>