<?php
// Henter komponentens overskrift.
$title = get_sub_field('overskrift');
?>
<section class="component merchkort">
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <h2><?php echo esc_html($title); ?></h2>
                <div class="merchkort-wrapper">
                    <!-- Bygger et internt array af merch-data fra ACF-rækker -->
                    <?php if (have_rows('kort')): ?>
                        <?php
                        $merch_items = [];
                        while (have_rows('kort')):
                            the_row();
                            $merch_items[] = [
                                'city' => get_sub_field('bynavn'),
                                'image' => get_sub_field('kort'),
                                'alt' => get_sub_field('overskrift') ?: get_sub_field('bynavn'),
                            ];
                        endwhile;
                        ?>
                        <!-- Navigation med knapper til at skifte aktivt merchkort -->
                        <div class="merchkort-navbar">
                            <?php foreach ($merch_items as $index => $item): ?>
                                <button
                                    class="merchkort-navbar-button"
                                    type="button"
                                    data-merch-index="<?php echo esc_attr($index); ?>"
                                >
                                    <?php echo esc_html($item['city']); ?>
                                </button>
                            <?php endforeach; ?>
                        </div>
                   <!-- Alle billeder renderes én gang og styres via JS -->
                        <div class="merchkort-images">
                            <?php foreach ($merch_items as $index => $item): ?>
                                <?php if ($item['image']): ?>
                                    <img
                                        src="<?php echo esc_url($item['image']); ?>"
                                        alt="<?php echo esc_attr($item['alt']); ?>"
                                        data-merch-image="<?php echo esc_attr($index); ?>"
                                    >
                                <?php endif; ?>
                            <?php endforeach; ?>
                        </div>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </div>
    <script>
        (function () {
            // Finder alle merch-sektioner på siden (hvis komponenten bruges flere steder).
            const merchSections = document.querySelectorAll('.merchkort');
            merchSections.forEach((section) => {
                // Henter knapper (byer) og billeder inden for den aktuelle sektion.
                const buttons = section.querySelectorAll('[data-merch-index]');
                const images = section.querySelectorAll('[data-merch-image]');
                // Stopper tidligt hvis der mangler data at arbejde med.
                if (!buttons.length || !images.length) return;

                // Opdaterer aktivt billede og aktiv knap ud fra valgt indeks.
                function setActive(indexToShow) {
                    // Viser kun billedet, der matcher det valgte indeks.
                    images.forEach((img) => {
                        const isMatch = img.dataset.merchImage === String(indexToShow);
                        img.style.display = isMatch ? '' : 'none';
                    });
                    // Marker den aktive knap visuelt og for tilgængelighed (aria-pressed).
                    buttons.forEach((btn) => {
                        const isActive = btn.dataset.merchIndex === String(indexToShow);
                        btn.classList.toggle('is-active', isActive);
                        btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
                    });
                }
                // Vælg første knap/billede som standard ved load.
                const firstIndex = buttons[0].dataset.merchIndex;
                setActive(firstIndex);

                // Skifter aktivt billede når brugeren klikker på en knap.
                buttons.forEach((button) => {
                    button.addEventListener('click', function () {
                        setActive(this.dataset.merchIndex);
                    });
                });
            });
        })();
    </script>
</section>