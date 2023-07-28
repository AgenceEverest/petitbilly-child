<?php get_header(); ?>
<?php get_template_part('inc/header/header-main'); ?>
<?php get_template_part('inc/breadcrumb'); ?>

<?php the_post(); ?>
<?php $term = get_queried_object(); ?>
<?php $page_for_posts = get_option('page_for_posts'); ?>
<div id="global_content">
    <section class="page_les_actualites">
        <article id="post-container-<?php the_ID(); ?>" <?php post_class(); ?>>
            <?php get_template_part('inc/header/header-page'); ?>
            <div id="aside_actualites" class="padding_section_bottom">
                <div id="charger_les_images_wrapper" class="content_width">
                    <div class="legende">
                        <div id="charger_les_images_switch">
                            <?php $charger_les_images = get_field('charger_les_images', 'option'); ?>
                            <label tabindex="0" for="f" id="charger_les_images"><?php if($charger_les_images): ?><?php echo $charger_les_images; ?><?php endif; ?></label>
                            <label tabindex="-1" id="charger_les_images_switch_label" class="switch">
                                <input tabindex="-1" name="charger_les_images_switch" id="f" type="checkbox">
                                <span tabindex="-1" aria-label="charger les images" class="slider round"></span>
                            </label>
                        </div>
                    </div>
                </div>
                <div id="aside_actualites_wrapper" class="articles_wrapper">
                    <?php
                    $paged = (get_query_var('paged')) ? get_query_var('paged') : 1;
                    $default_posts_per_page = get_option('posts_per_page');
                    $args = array(
                        'post_type'     => 'post',
                        'post_status'   => 'publish',
                        'posts_per_page' => $default_posts_per_page,
                        'paged' => $paged
                    );
                    $custom_query = new WP_Query($args);
                    ?>
                    <?php
                    while ($custom_query->have_posts()) :
                        $custom_query->the_post();
                    ?>
                        <?php get_template_part('inc/extrait-article'); ?>
                    <?php endwhile; ?>
                    <div class="blog-pagination-wrapper">
                        <nav class="blog-pagination">
                            <?= paginate_links() ?>
                        </nav>
                    </div>
                </div>
            </div>
        </article>
    </section>
    <?php get_footer(); ?>
</div> <!-- #global_content -->