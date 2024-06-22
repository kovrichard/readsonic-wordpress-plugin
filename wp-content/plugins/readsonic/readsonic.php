<?php
/**
 * @package ReadSonic
 * @version 1.0.0
 *
 * Plugin Name:       ReadSonic
 * Description:       Adds a button to the website that reads the text on the page.
 * Version:           1.0.0
 * Requires at least: 6.2
 * Requires PHP:      7.0
 * Author:            Richard Kovacs
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       readsonic
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

require_once plugin_dir_path(__FILE__) . 'readsonic-endpoint.php';
require_once plugin_dir_path(__FILE__) . 'readsonic-settings.php';
require_once plugin_dir_path(__FILE__) . 'widget.php';


// New Gutenberg block
function readsonic_block_init() {
	// Register block on the server side
	register_block_type(
		__DIR__ . '/build',
	);
}
add_action( 'init', 'readsonic_block_init' );

// Legacy widget
function register_readsonic_widget() {
    register_widget('ReadSonic_Widget');
}
add_action('widgets_init', 'register_readsonic_widget');

?>
