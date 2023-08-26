<?php

require 'vendor/autoload.php';

use \Firebase\JWT\JWT;

add_action( 'rest_api_init', function () {
        register_rest_route( 'audioblog/v1', '/generate-audio', array(
                'methods' => 'POST',
                'callback' => 'generate_audio',
                'permission_callback' => 'verify_csrf_token'
        ) );
} );

function generate_audio(WP_REST_Request $request) {
    $key = get_option('audioblog_jwt_secret_key');  // Retrieve the secret key from the settings
    $api_token = get_option('audioblog_api_token');  // Retrieve the API token from the settings
    $voice = get_option('audioblog_voice');  // Retrieve the voice selection from the settings

    $tokenPayload = array(
        "iss" => get_site_url(),
        "iat" => time(),
        "exp" => time() + (60 * 5),  // Token valid for 5 minutes
        "api_token" => $api_token
    );

    // Encode the payload into JWT
    $jwt = JWT::encode($tokenPayload, $key, 'HS256');

    // Get the post content from the request body
    $body = json_decode($request->get_body(), true, 2);
    $content = $body['content'];

    $payload = array(
        "content" => $content,
        "voice" => $voice
    );

    $url = 'https://tz26q7b28i.execute-api.eu-central-1.amazonaws.com/stage/tts';
    $args = array(
        'headers' => array(
            'Content-Type' => 'application/json',
            'Authorization' => 'Bearer ' . $jwt
        ),
        'body' => json_encode($payload),
        'method' => 'POST',
        'data_format' => 'body'
    );

    // Make the request
    $response = wp_remote_post($url, $args);

    // Handle the response
    if (is_wp_error($response)) {
        $error_message = $response->get_error_message();
        echo "Something went wrong: $error_message";
    } else {
        $aws_body = json_decode(wp_remote_retrieve_body($response), true);
        // Do something with $aws_body if needed
    }

    return $aws_body;
}

function verify_csrf_token() {
    $headers = getallheaders();
    $stored_token = get_transient('audioblog_csrf_token');
    
    if (isset($headers['X-CSRF-Token']) && $headers['X-CSRF-Token'] === $stored_token) {
        return true;
    }
    return false;
}
