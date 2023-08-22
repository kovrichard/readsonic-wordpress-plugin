<?php
/**
 * @package Blog Audio Player
 * @version 1.0
 */
/*
Plugin Name: Blog Audio Player
Description: Adds a button to the website that reads the text on the page.
Version: 1.0
Author: Richard Kovacs
*/

add_option('audioblog_jwt_secret_key', '');

function audioblog_jwt_settings_menu() {
        add_options_page(
        'Audioblog JWT Settings',
        'Audioblog JWT',
        'manage_options',
        'audioblog-jwt-settings',
        'audioblog_jwt_settings_page'
    );
}

add_action('admin_menu', 'audioblog_jwt_settings_menu');

function audioblog_jwt_settings_page() {
    ?>
    <div class="wrap">
        <h1>Audioblog JWT Settings</h1>
        <form method="post" action="options.php">
            <?php settings_fields('audioblog-jwt-settings-group'); ?>
            <?php do_settings_sections('audioblog-jwt-settings-group'); ?>
            <table class="form-table">
                <tr valign="top">
                    <th scope="row">JWT Secret Key</th>
                    <td><input type="text" name="audioblog_jwt_secret_key" value="<?php echo esc_attr(get_option('audioblog_jwt_secret_key')); ?>" /></td>
                </tr>
            </table>
            <?php submit_button(); ?>
        </form>
    </div>
    <?php
}

function audioblog_jwt_register_settings() {
    register_setting('audioblog-jwt-settings-group', 'audioblog_jwt_secret_key');
}
add_action('admin_init', 'audioblog_jwt_register_settings');

require_once plugin_dir_path(__FILE__) . 'audioblog-jwt-endpoint.php';
require_once plugin_dir_path(__FILE__) . 'audioblog-enqueue-scripts.php';
