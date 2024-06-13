/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
export default function save({ attributes }) {
	const { badge, color, icon, text } = attributes;

	return (
		<>
		<div { ...useBlockProps.save() }>
			{badge ? (
				<div style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', backgroundColor: color, borderRadius: '2rem', paddingLeft: '1rem', paddingRight: '0.5rem' }}>
					<span>{text}</span>
					<button id="menu-button" aria-label="Listen to this article">
						<img id="menu-icon" src={`data:image/svg+xml;base64,${icon}`} style={{ borderRadius: '50%' }} />
					</button>
				</div>
			) : (
				<button id="menu-button" aria-label="Listen to this article">
					<img id="menu-icon" src={`data:image/svg+xml;base64,${icon}`} style={{ borderRadius: '50%' }} />
				</button>
			)
			}
		</div>
		<audio id="audio-player" controls autoPlay style={{ display: 'none', position: 'fixed', left: 0, right: 0, bottom: '1rem', width: '30rem', margin: 'auto' }} />
		</>
	);
}
