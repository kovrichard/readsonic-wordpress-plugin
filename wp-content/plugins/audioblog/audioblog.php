<?php
/**
 * @package AudioBlog
 * @version 1.0
 */
/*
Plugin Name: AudioBlog
Description: Adds a button to the website that reads the text on the page.
Version: 1.0
Author: Richard Kovacs
*/

require_once plugin_dir_path(__FILE__) . 'audioblog-generate-audio-endpoint.php';
require_once plugin_dir_path(__FILE__) . 'audioblog-enqueue-scripts.php';
require_once plugin_dir_path(__FILE__) . 'audioblog-settings.php';
