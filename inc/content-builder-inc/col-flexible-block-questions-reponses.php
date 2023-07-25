<div class="col_flexible_item">
    <div class="entry-content bloc_questions_reponses">
        <?php 
        if (have_rows('questions_reponses')) :
            while (have_rows('questions_reponses')) : the_row(); ?>
                <?php $question_faq = get_sub_field('question_faq'); ?>
                <?php $reponse_faq = get_sub_field('reponse_faq'); ?>
                <div class="question_reponse_item">
                    <?= showSvg(get_stylesheet_directory_uri() . '/svg/fond-reponse.svg') ?>
                    <div class="question_reponse_title">
                        <div class="question_reponse_title_icone">
                            <span class="question_reponse_title_icone_plus">
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" class="svg-inline--fa fa-plus fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg>
                            </span>
                            <span class="question_reponse_title_icone_moins">
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="minus" class="svg-inline--fa fa-minus fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg>
                            </span>
                        </div>
                        <h3><?php echo $question_faq; ?></h3>
                    </div>
                    <div class="question_reponse_wysiwyg entry-content"><?php echo $reponse_faq; ?></div>
                </div>
        <?php endwhile;
        else :
        endif;
        ?>
    </div>
</div>