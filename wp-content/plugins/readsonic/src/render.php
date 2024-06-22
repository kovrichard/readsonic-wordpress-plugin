<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

$icon = $attributes['icon'] ?? '';
$text = $attributes['text'] ?? '';
$badge = $attributes['badge'] ?? false;
$color = $attributes['color'] ?? '';
$post_id = get_the_ID();

?>
<div <?php echo get_block_wrapper_attributes(); ?>>
	<span id="post-id" style="display: none;"><?php echo $post_id; ?></span>
	<?php if ( $badge ) { ?>
		<div style="display: inline-flex; justify-content: center; align-items: center; background-color: <?php echo $color; ?>; border-radius: 2rem; padding-left: 1rem; padding-right: 0.5rem;">
			<span><?php echo $text; ?></span>
			<button id="menu-button" aria-label="Listen to this article">
				<img id="menu-icon" src="data:image/svg+xml;base64,<?php echo $icon; ?>" style="border-radius: 50%;" />
			</button>
		</div>
	<?php } else { ?>
		<button id="menu-button" aria-label="Listen to this article">
			<img id="menu-icon" src="data:image/svg+xml;base64,<?php echo $icon; ?>" style="border-radius: 50%;" />
		</button>
	<?php } ?>
</div>
<audio id="audio-player" controls autoPlay style="display: none; position: fixed; left: 0; right: 0; bottom: 1rem; width: 30rem; margin: auto;" />
