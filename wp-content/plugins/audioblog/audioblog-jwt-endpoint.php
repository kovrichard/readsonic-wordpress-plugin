<?php

require 'vendor/autoload.php';

use \Firebase\JWT\JWT;

// Add a REST API endpoint
function audioblog_jwt_endpoint_register() {
    register_rest_route('audioblog-jwt/v1', '/generate', array(
        'methods' => 'GET',
        'callback' => 'audioblog_jwt_generate_token',
        //'permission_callback' => '__return_true'  // Anyone can access this endpoint, but you can adjust this as needed
    ));
}
//add_action('rest_api_init', 'audioblog_jwt_endpoint_register');
add_action( 'rest_api_init', function () {
        register_rest_route( 'audioblog-jwt/v1', '/generate', array(
                'methods' => 'GET',
                'callback' => 'audioblog_jwt_generate_token',
                //'permission_callback' => '__return_true'  // Anyone can access this endpoint, but you can adjust this as needed
        ) );
} );

// Function to generate JWT
function audioblog_jwt_generate_token() {
    $key = get_option('audioblog_jwt_secret_key');  // Retrieve the secret key from the settings
    $api_token = get_option('audioblog_api_token');  // Retrieve the API token from the settings

    // Sample payload. You can adjust this as per your needs
    $payload = array(
        "iss" => get_site_url(),
        "iat" => time(),
        "exp" => time() + (60 * 5),  // Token valid for 5 minutes
        "api_token" => $api_token  // Placeholder data
    );

    // Encode the payload into JWT
    $jwt = JWT::encode($payload, $key, 'HS256');

    return array('token' => $jwt);
}
