<?php

function audioblog_enqueue_scripts() {
    // Enqueue our script
    wp_enqueue_script('audioblog-button', plugin_dir_url(__FILE__) . 'audioblog-button.js', array(), '1.0', true);
}
add_action('wp_enqueue_scripts', 'audioblog_enqueue_scripts');
