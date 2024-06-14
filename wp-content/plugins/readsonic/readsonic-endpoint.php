<?php

function synthesize($req) {
    $post = get_post($req['post_id']);
    $params = $req->get_json_params();

    if (empty($post)) {
        return new WP_Error('no_post', 'Invalid post ID', array('status' => 404));
    }

    $content = $post->post_content;
    $codeless_content = remove_pre_tags($content);
    $clean_content = clean_content($codeless_content);

    $payload = array(
        'origin' => $params['origin'],
        'slug' => $params['slug'],
        'content' => $clean_content
    );

    $response = wp_remote_post('https://api.readsonic.io/synthesize/wordpress/v2', array(
        'body' => json_encode($payload),
        'headers' => array('Content-Type' => 'application/json'),
        'timeout' => 60
    ));

    if (is_wp_error($response)) {
        return new WP_Error('synthesis_error', 'Error synthesizing text', array('status' => 500));
    }

    $body = json_decode($response['body'], true);

    return rest_ensure_response($body);
}

function remove_pre_tags($content) {
    return preg_replace('/<pre\b[^>]*>.*?<\/pre>/is', '', $content);
}

function clean_content($content) {
    $content = preg_replace('/<!-- \/?.*? -->/', '', $content);
    $content = strip_tags($content);

    return $content;
}

add_action('rest_api_init', function () {
    register_rest_route('readsonic/v1', '/synthesize/(?P<post_id>\d+)', array(
        'methods' => 'POST',
        'callback' => 'synthesize',
    ));
});

?>
