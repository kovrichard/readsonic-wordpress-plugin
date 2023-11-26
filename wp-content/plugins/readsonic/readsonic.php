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

require_once plugin_dir_path(__FILE__) . 'readsonic-settings.php';
require_once plugin_dir_path(__FILE__) . 'widget.php';


function register_readsonic_widget() {
    register_widget('ReadSonic_Widget');
}

add_action('widgets_init', 'register_readsonic_widget');
