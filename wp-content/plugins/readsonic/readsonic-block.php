<?php

function readsonic_render_block( $attributes ) {
    $post_id = get_the_ID();

    $button = '<button id="menu-button" aria-label="Listen to this article">';
    $button .= '<img id="menu-icon" src="data:image/svg+xml;base64,' . $attributes['icon'] . '" style="border-radius: 50%;" />';
    $button .= '</button>';

    $content = '<div class="' . $attributes["className"] . '">';
    $content .= '<span id="post-id" style="display: none;">' . $post_id . '</span>';

    if ( $attributes['badge'] ) {
        $content .= '<div style="display: inline-flex; justify-content: center; align-items: center; background-color: ' . $attributes['color'] . '; border-radius: 2rem; padding-left: 1rem; padding-right: 0.5rem;">';
        $content .= '<span>' . $attributes['text'] . '</span>';
        $content .= $button;
        $content .= '</div>';
    } else {
        $content .= $button;
    }

    $content .= '</div>';
    $content .= '<audio id="audio-player" controls autoPlay style="display: none; position: fixed; left: 0; right: 0; bottom: 1rem; width: 30rem; margin: auto;" />';

    return $content;
}
