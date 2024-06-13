<?php

function synthesize($data) {
    $id = $data['id'];
    $post = get_post($id);

    if (empty($post)) {
        return new WP_Error('no_post', 'Invalid post ID', array('status' => 404));
    }

    $content = $post->post_content;

    $clean_content = clean_content($content);

    return rest_ensure_response($clean_content);
}

function clean_content($content) {
    $content = preg_replace('/<!-- \/?.*? -->/', '', $content);
    $content = strip_tags($content);

    return $content;
}

add_action('rest_api_init', function () {
    register_rest_route('readsonic/v1', '/synthesize/(?P<id>\d+)', array(
        'methods' => 'POST',
        'callback' => 'synthesize',
    ));
});

?>
