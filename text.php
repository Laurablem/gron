<?php
    $text = get_sub_field('tekst');

?>
<section class="component textmodule">
    <div class="container">
        <div class="row">
            <div class="col-lg-10 offset-lg-1 col-xl-8 offset-xl-2">
                <div class="text__wrap">
                    <?php if($text): ?>
                        <div class="text"><?php echo $text; ?></div>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </div>
</section>