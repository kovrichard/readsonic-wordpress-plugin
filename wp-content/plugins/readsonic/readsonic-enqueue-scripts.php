<?php

function readsonic_enqueue_scripts() {
    // Enqueue our script
    wp_enqueue_script('readsonic-button', plugin_dir_url(__FILE__) . 'public/readsonic-button.js', array(), '1.0', true);

    // Enqueue our style
    wp_enqueue_style('readsonic-button', plugin_dir_url(__FILE__) . 'public/readsonic-button.css');


    // Add data to your script
    wp_localize_script('readsonic-button', 'readsonic_ajax_object', array(
        'ajax_url' => admin_url('admin-ajax.php'),
    ));
}

add_action('wp_enqueue_scripts', 'readsonic_enqueue_scripts');
