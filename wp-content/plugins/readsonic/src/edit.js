/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * Imports the InspectorControls component, which is used to wrap
 * the block's custom controls that will appear in in the Settings
 * Sidebar when the block is selected.
 *
 * Also imports the React hook that is used to mark the block wrapper
 * element. It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#inspectorcontrols
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';

/**
 * Imports the necessary components that will be used to create
 * the user interface for the block's settings.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/components/panel/#panelbody
 * @see https://developer.wordpress.org/block-editor/reference-guides/components/text-control/
 * @see https://developer.wordpress.org/block-editor/reference-guides/components/toggle-control/
 */
import {
	PanelBody,
	SelectControl,
	TextControl,
	CheckboxControl,
} from '@wordpress/components';

import icons from './icons';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function that updates individual attributes.
 *
 * @return {Element} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {
	const { badge, color, icon, text } = attributes;

	const updateBadge = ( newBadge ) => {
		setAttributes( { badge: newBadge } );
	};
	const updateColor = ( newColor ) => {
		setAttributes( { color: newColor } );
	};
	const updateIcon = ( newIcon ) => {
		setAttributes( { icon: newIcon } );
	};
	const updateText = ( newText ) => {
		setAttributes( { text: newText } );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Settings', 'readsonic-block' ) }>
					<CheckboxControl
						label="Badge"
						checked={ badge }
						onChange={ updateBadge }
						__nextHasNoMarginBottom
					/>
					<SelectControl
						label="Icon"
						value={ icon }
						options={ [
							{ label: 'Headphones', value: icons.headphones },
							{ label: 'Play', value: icons.play },
						] }
						onChange={ updateIcon }
						__nextHasNoMarginBottom
					/>
					<TextControl
						label="Text"
						value={ text }
						onChange={ updateText }
						disabled={ ! badge }
						__nextHasNoMarginBottom
					/>
					<TextControl
						label="Color"
						value={ color }
						onChange={ updateColor }
						disabled={ ! badge }
						__nextHasNoMarginBottom
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...useBlockProps() }>
				{ badge ? (
					<div
						style={ {
							display: 'inline-flex',
							justifyContent: 'center',
							alignItems: 'center',
							backgroundColor: color,
							borderRadius: '2rem',
							paddingLeft: text === '' ? '0.5rem' : '1rem',
							paddingRight: '0.5rem',
						} }
					>
						<span>{ text }</span>
						<button
							id="menu-button"
							aria-label="Listen to this article"
						>
							<img
								id="menu-icon"
								alt="Listen icon"
								src={ `data:image/svg+xml;base64,${ icon }` }
								style={ { borderRadius: '50%' } }
							/>
						</button>
					</div>
				) : (
					<button id="menu-button" aria-label="Listen to this article">
						<img
							id="menu-icon"
							alt="Listen icon"
							src={ `data:image/svg+xml;base64,${ icon }` }
							style={ { borderRadius: '50%' } }
						/>
					</button>
				) }
			</div>
		</>
	);
}
