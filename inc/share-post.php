<div class="content_width share-date-container">
	<!-- Partage -->
	<div class="article_share">
		<p class="article_share_date legende">
			<?php $currentlang = get_bloginfo('language'); ?>
            <?php if($currentlang=="en-GB"): ?>
                <span class="date_jour"><?php the_time('M') ?></span><span class="date_mois"><?php the_time('d') ?></span><span class="date_annee"><?php the_time('Y') ?></span>
            <?php else: ?>
                <span class="date_jour"><?php the_time('d') ?></span><span class="date_mois"><?php the_time('M') ?></span><span class="date_annee"><?php the_time('Y') ?></span>
            <?php endif; ?>
		</p>
		<?php $reseaux_sociaux_partager_cet_article = get_field('reseaux_sociaux_partager_cet_article', 'option'); ?>
		<?php $reseaux_sociaux_partager_sur = get_field('reseaux_sociaux_partager_sur', 'option'); ?>

		<p class="article_share_icones legende"><span><?php if($reseaux_sociaux_partager_cet_article): ?><?php echo $reseaux_sociaux_partager_cet_article; ?><?php endif; ?></span><br>
			<a href="http://www.facebook.com/sharer.php?u=<?php the_permalink(); ?>" title="<?php if($reseaux_sociaux_partager_sur): ?><?php echo $reseaux_sociaux_partager_sur; ?><?php endif; ?> Facebook" target="_blank" class="share_button">
				<?= apply_filters('add_svg', 'facebook') ?>
			</a>
			<a href="https://twitter.com/share?ref_src=twsrc%5Etfw&url=<?php the_permalink(); ?>" title="<?php if($reseaux_sociaux_partager_sur): ?><?php echo $reseaux_sociaux_partager_sur; ?><?php endif; ?> Twitter" target="_blank" class="share_button" data-show-count="false">
				<?= apply_filters('add_svg', 'twitter'); ?></a>

			<a href="http://www.linkedin.com/shareArticle?mini=true&amp;url=<?php the_permalink(); ?>" title="<?php if($reseaux_sociaux_partager_sur): ?><?php echo $reseaux_sociaux_partager_sur; ?><?php endif; ?> Linkedin" target="_blank" class="share_button">
				<?= apply_filters('add_svg', 'linkedin'); ?>
			</a>
		</p>
	</div>
</div>