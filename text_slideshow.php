<?php
    // Layout styrer om billede står til venstre eller højre på desktop.
    $layout = get_sub_field('layout');
    
    // Henter tekstindhold og knapdata fra ACF.
    $title = get_sub_field('overskrift');
    $text = get_sub_field('tekst');
    $btn = get_sub_field('knap_button');

    // Sikrer at slider-biblioteket er indlæst til galleriet.
    wp_enqueue_script( 'flickity' );

?>
<section class="component textimg textslideshow">
    <div class="container">
        <div class="row d-flex align-items-center">
            <div class="col-lg-6 <?php if($layout=="left"): echo 'order-lg-1';endif; ?>">
                <div class="textimg__slideshow">
                    <!-- Billedslider: vises kun hvis der er slideshow-rækker -->
                    <?php if(have_rows('slideshow')): ?>
                        <div class="image-gallery">
                            <!-- Looper billeder til slideshowet -->
                            <?php while(have_rows('slideshow')): the_row(); ?>
                                <div class="textimg__slideshow-item">
                                    <img src="<?php echo get_sub_field('billede')['url']; ?>" alt="<?php echo get_sub_field('billede')['alt']; ?>">
                                </div>
                            <?php endwhile; ?>
                        </div>
                    <?php endif; ?>
                </div>
            </div>
            <div class="col-lg-6 <?php if($layout=="left"): echo 'order-lg-0';endif; ?>">
                <div class="textimg-wrap">
                    <!-- Tekstindhold i højre/venstre kolonne afhængigt af layout -->
                    <?php if($title): ?>
                        <h2 class="textimg__title"><?php echo $title; ?></h2>
                    <?php endif; ?>
                    <?php if($text): ?>
                        <div class="textimg__text"><?php echo $text; ?></div>
                    <?php endif; ?>
                    <?php if( $btn['link']):?>
                        <!-- CTA-knap med dynamisk link, target, farve og størrelse -->
                        <a href="<?php echo $btn['link']['url']; ?>" <?php echo !empty($btn['link']['target']) ? 'target="' . $btn['link']['target']. '"' : ''; ?>  class="btn btn-<?php echo $btn['farve']?> btn-<?php echo $btn['storrelse']; ?>"><span><?php echo $btn['link_label']; ?></span></a>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </div>
</section>