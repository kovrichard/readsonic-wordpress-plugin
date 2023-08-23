<?php

function generate_csrf_token() {
    // Check if we already have a token stored
    $token = get_transient('my_csrf_token');
    if (!$token) {
        // If not, create one
        $token = bin2hex(random_bytes(16)); // 32-character random string
        set_transient('my_csrf_token', $token, HOUR_IN_SECONDS); // store for an hour
    }
}
add_action('init', 'generate_csrf_token');


function audioblog_enqueue_scripts() {
    // Enqueue our script
    wp_enqueue_script('audioblog-button', plugin_dir_url(__FILE__) . 'audioblog-button.js', array(), '1.0', true);

    // Add data to your script
    wp_localize_script('audioblog-button', 'audioblog_ajax_object', array(
        'ajax_url' => admin_url('admin-ajax.php'),
    ));
}
function print_csrf_token_script() {
    $token = get_transient('my_csrf_token');
    echo "<script>window.csrfToken = '{$token}';</script>";
}

add_action('wp_enqueue_scripts', 'audioblog_enqueue_scripts');
add_action('wp_enqueue_scripts', 'print_csrf_token_script');
