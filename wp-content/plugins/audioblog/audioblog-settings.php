<?php

function settings_menu() {
        add_options_page(
        'Audioblog Settings',
        'Audioblog',
        'manage_options',
        'audioblog-settings',
        'audioblog_settings_page'
    );
}

add_action('admin_menu', 'settings_menu');

function audioblog_settings_page() {
    ?>
    <div class="wrap">
        <h1>Audioblog Settings</h1>
        <form method="post" action="options.php">
            <?php settings_fields('audioblog-settings-group'); ?>
            <?php do_settings_sections('audioblog-settings-group'); ?>
            <table class="form-table">
            </table>
            <?php submit_button(); ?>
        </form>
    </div>
    <?php
}

function register_settings() {
}
add_action('admin_init', 'register_settings');


