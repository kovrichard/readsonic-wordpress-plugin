<?php

add_option('audioblog_jwt_secret_key', '');
add_option('audioblog_api_token', '');
add_option('audioblog_voice', 'Matthew');

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
                <tr valign="top">
                    <th scope="row">JWT Secret Key</th>
                    <td><input type="text" name="audioblog_jwt_secret_key" value="<?php echo esc_attr(get_option('audioblog_jwt_secret_key')); ?>" /></td>
                </tr>
                <tr valign="top">
                    <th scope="row">API Token</th>
                    <td><input type="text" name="audioblog_api_token" value="<?php echo esc_attr(get_option('audioblog_api_token')); ?>" /></td>
                </tr>
                <tr valign="top">
                    <th scope="row">Voice Selection</th>
                    <td>
                        <select name="audioblog_voice">
                            <option value="Matthew" <?php selected(get_option('audioblog_voice'), 'Matthew'); ?>>Matthew</option>
                            <option value="Joanna" <?php selected(get_option('audioblog_voice'), 'Joanna'); ?>>Joanna</option>
                            <!-- Add more voices as options here if needed -->
                        </select>
                    </td>
                </tr>
            </table>
            <?php submit_button(); ?>
        </form>
    </div>
    <?php
}

function register_settings() {
    register_setting('audioblog-settings-group', 'audioblog_jwt_secret_key');
    register_setting('audioblog-settings-group', 'audioblog_api_token');
    register_setting('audioblog-settings-group', 'audioblog_voice');
}
add_action('admin_init', 'register_settings');


