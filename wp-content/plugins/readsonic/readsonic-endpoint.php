<?php

function synthesize($req) {
    $post = get_post($req['post_id']);
    $params = $req->get_json_params();

    if (empty($post)) {
        return new WP_Error('no_post', 'Invalid post ID', array('status' => 404));
    }

    $content = $post->post_content;
    $clean_content = clean_content($content);

    $response = wp_remote_post('https://api.readsonic.io/synthesize/wordpress', array(
        'body' => json_encode($params),
        'headers' => array('Content-Type' => 'application/json'),
    ));

    $body = json_decode($response['body'], true);

    return rest_ensure_response($body);
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
