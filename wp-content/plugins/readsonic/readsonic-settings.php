<?php

function settings_menu() {
        add_options_page(
        'ReadSonic Settings',
        'ReadSonic',
        'manage_options',
        'readsonic-settings',
        'readsonic_settings_page'
    );
}

add_action('admin_menu', 'settings_menu');

function readsonic_settings_page() {
    ?>
    <div class="wrap">
        <h1>ReadSonic Settings</h1>
        <form method="post" action="options.php">
            <?php settings_fields('readsonic-settings-group'); ?>
            <?php do_settings_sections('readsonic-settings-group'); ?>
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


