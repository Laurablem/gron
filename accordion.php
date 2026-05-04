
<?php
// Grunddata til accordion-komponenten.
$title = get_sub_field('overskrift');
// Bruges til at gøre id'er unikke, hvis flere accordions renderes på samme side.
$current_index = $args['current_index'] ?? 0;
$accordion_count = 0;
?>
<div class="component accordion">
    <div class="container">
        <div class="row">
            <div class="offset-lg-1 col-lg-10 offset-xl-2 col-xl-8">
                <?php if($title): ?>
                    <!-- Viser komponentens overskrift, hvis den er udfyldt -->
                    <h2><?php echo $title; ?></h2>
                <?php endif; ?>
                <div class="article-accordion-section">
                    <!-- Looper alle accordion-punkter fra ACF -->
                    <?php if( have_rows('accordion') ):
                        while( have_rows('accordion') ) : the_row();
                            $accordion_title = get_sub_field('overskrift');
                            $accordion_text = get_sub_field('tekst'); 
                            // Tæller op for at skabe unikt aria/id pr. item.
                            $accordion_count++;
                            ?>

                            <div class="article-accordion-item toggle-wrapper">

                                <button class="article-accordion-title toggle-button" aria-expanded="false" aria-controls="accordion-<?php echo $current_index; ?>-<?php echo $accordion_count; ?>">
                                    <?php echo $accordion_title; ?>
                                    <div class="article-accordion-button" title="Åbn/luk"></div>
                                </button>

                                <!-- Toggle-indhold kobles til knappen via aria-controls/id -->
                                <div class="article-accordion-text toggle-content" aria-hidden="true" id="accordion-<?php echo $current_index; ?>-<?php echo $accordion_count; ?>">
                                    <?php echo $accordion_text; ?>
                                </div>

                            </div>

                        <?php endwhile;
                    endif; ?>  
                </div>
            </div>
        </div>
    </div>
</div>