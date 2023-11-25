<?php
/**
 * @package ReadSonic
 * @version 1.0
 */
/*
Plugin Name: ReadSonic
Description: Adds a button to the website that reads the text on the page.
Version: 1.0
Author: Richard Kovacs
*/

require_once plugin_dir_path(__FILE__) . 'readsonic-settings.php';

class ReadSonic_Widget extends WP_Widget {
    public function __construct() {
        parent::__construct(
            'readsonic_widget',
            __('ReadSonic Widget', 'readsonic_widget_domain'),
            array('description' => __('Adds a button to the website that reads the text on the page.', 'readsonic_widget_domain'))
        );
    }

    public function widget($args, $instance) {
        wp_enqueue_script('readsonic-button', plugin_dir_url(__FILE__) . 'public/readsonic-button.js', array(), '1.0', true);
        wp_enqueue_style('readsonic-button', plugin_dir_url(__FILE__) . 'public/readsonic-button.css');

        echo $args['before_widget'];

        ?>
            <div>
                <button id="play-button" class="menu-button">
                    <img id="play-icon" class="menu-icon" src="/wp-content/plugins/readsonic/assets/player-play.svg" alt="Play" width=24 height=24 />
                </button>
            </div>
            <audio id="audio" controls>
                Your browser does not support the audio element.
            </audio>
        <?php

        echo $args['after_widget'];
    }

    public function form($instance) {
    }

    public function update($new_instance, $old_instance) {
        $instance = array();
        return $instance;
    }
}

function register_readsonic_widget() {
    register_widget('ReadSonic_Widget');
}

add_action('widgets_init', 'register_readsonic_widget');
