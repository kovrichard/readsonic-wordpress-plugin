<?php
/**
 * @package ReadSonic
 * @version 1.0
 */
/*
Plugin Name: ReadSonic
Description: Adds a button to the website that reads the text on the page.
Version: 1.0
Author: Richard Kovacs
*/

require_once plugin_dir_path(__FILE__) . 'readsonic-endpoint.php';
require_once plugin_dir_path(__FILE__) . 'readsonic-settings.php';
require_once plugin_dir_path(__FILE__) . 'readsonic-block.php';
require_once plugin_dir_path(__FILE__) . 'widget.php';

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

// New Gutenberg block
function readsonic_block_init() {
	// Register block on the server side
	register_block_type(
		__DIR__ . '/build',
		array(
			'render_callback' => 'readsonic_render_block',
		)
	);
}
add_action( 'init', 'readsonic_block_init' );

// Legacy widget
function register_readsonic_widget() {
    register_widget('ReadSonic_Widget');
}
add_action('widgets_init', 'register_readsonic_widget');
