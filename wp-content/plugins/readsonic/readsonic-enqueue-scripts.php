<?php

function readsonic_enqueue_scripts() {
    if (is_active_widget(false, false, 'readsonic_widget', true)) {
        // Enqueue our script
        wp_enqueue_script('readsonic-button', plugin_dir_url(__FILE__) . 'public/readsonic-button.js', array(), '1.0', true);
        
        // Enqueue our style
        wp_enqueue_style('readsonic-button', plugin_dir_url(__FILE__) . 'public/readsonic-button.css');
    }
}

add_action('wp_enqueue_scripts', 'readsonic_enqueue_scripts');
