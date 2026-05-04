<div class="component triple_sider">
    <div class="container">
        <div class="row">
            <div class="col-12">
            <!-- Viser kun slideren hvis der findes slides i ACF -->
            <?php if(have_rows('slides')): ?>
                <!-- Wrapper til tre-billeders galleri -->
                <div class="image-gallery-triple">
                    <!-- Looper gennem hver slide og renderer billedet -->
                    <?php while(have_rows('slides')): the_row(); ?>
                        <div class="textimg__slideshow-item">
                            <img src="<?php echo get_sub_field('slide')['url']; ?>" alt="<?php echo get_sub_field('slide')['alt']; ?>">
                        </div>
                    <?php endwhile; ?>
                </div>
            <?php endif; ?>
            </div>
        </div>
    </div>

</div>